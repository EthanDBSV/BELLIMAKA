/**
 * Bellimaka Pokemon Draft League - Cloudflare Worker Backend
 * 
 * Provides an ultra-fast, serverless API with UNLIMITED egress bandwidth via Cloudflare KV.
 * 
 * Storage Bindings required:
 *   - DB: Cloudflare KV Namespace (e.g. BELLIMAKA_KV)
 */

const MASTER_KEY = "bellimaka-master-2026";

// CORS Response Helper
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-master-key",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}

// Password hashing using WebCrypto (SHA-256 + salt)
async function hashPassword(password, salt = "bellimaka_salt_") {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const kv = env.DB;

    if (!kv) {
      return jsonResponse({ error: "KV binding 'DB' is missing. Please bind a KV namespace named DB in your Worker Settings -> Bindings." }, 500);
    }

    try {
      // -------------------------------------------------------------
      // 1. Health Check
      // -------------------------------------------------------------
      if (path === "/" || path === "/api/health") {
        return jsonResponse({
          status: "healthy",
          engine: "Cloudflare Worker + KV",
          time: new Date().toISOString()
        });
      }

      // -------------------------------------------------------------
      // 2. League State (Full Database JSON)
      // -------------------------------------------------------------
      if (path === "/api/state") {
        const stateId = url.searchParams.get("id") || "main";
        if (request.method === "GET") {
          const raw = await kv.get(`league_state:${stateId}`);
          if (!raw) {
            if (stateId === "media") return jsonResponse({});
            return jsonResponse({
              rev: 0,
              updatedAt: 0,
              tournaments: {},
              profiles: {},
              roster: {},
              teamHistory: {},
              cut: 4,
              draftPool: null,
              offseasonDraftBoard: [],
              accountLinks: {}
            });
          }
          const parsed = JSON.parse(raw);
          return jsonResponse(parsed);
        }

        if (request.method === "POST") {
          const body = await request.json();
          const statePayload = body.data || body;
          const updateTime = body.updated_at || body.updatedAt || Date.now();
          
          if (!statePayload || typeof statePayload !== "object") {
            return jsonResponse({ error: "Invalid state payload" }, 400);
          }

          // Save state for given id (main or media)
          await kv.put(`league_state:${stateId}`, JSON.stringify(statePayload));

          // Also keep active tournament draft states synced for fast lightweight querying
          if (stateId === "main" && statePayload.tournaments) {
            for (const [tId, tourney] of Object.entries(statePayload.tournaments)) {
              const draftObj = tourney.draftData || tourney.draft;
              if (tourney && draftObj) {
                await kv.put(`draft_state:${tId}`, JSON.stringify({
                  tournamentId: tId,
                  draft: draftObj,
                  roster: statePayload.roster || {},
                  updatedAt: updateTime
                }));
              }
            }
          }

          return jsonResponse({ success: true, rev: statePayload.rev, updatedAt: updateTime });
        }
      }

      // -------------------------------------------------------------
      // 3. Lightweight Draft State (Picks, Timer, Turn)
      // -------------------------------------------------------------
      if (path === "/api/draft") {
        const tId = url.searchParams.get("tournamentId") || url.searchParams.get("id");
        
        if (request.method === "GET") {
          if (!tId) {
            return jsonResponse({ error: "Missing tournamentId" }, 400);
          }
          const raw = await kv.get(`draft_state:${tId}`);
          if (!raw) {
            // Fallback: check main state
            const mainRaw = await kv.get("league_state:main");
            if (mainRaw) {
              const main = JSON.parse(mainRaw);
              const t = main.tournaments?.[tId];
              const draftObj = t?.draftData || t?.draft;
              if (t && draftObj) {
                return jsonResponse({
                  tournamentId: tId,
                  draft: draftObj,
                  roster: main.roster || {},
                  updatedAt: main.updatedAt || Date.now()
                });
              }
            }
            return jsonResponse({ error: "Draft not found" }, 404);
          }
          return jsonResponse(JSON.parse(raw));
        }

        if (request.method === "POST") {
          const body = await request.json();
          const targetTid = body.tournamentId || tId;
          if (!targetTid) {
            return jsonResponse({ error: "Missing tournamentId" }, 400);
          }

          const draftObj = body.draftData || body.draft;

          // 1. Update lightweight draft key
          const draftRecord = {
            tournamentId: targetTid,
            draft: draftObj,
            roster: body.roster || {},
            updatedAt: Date.now()
          };
          await kv.put(`draft_state:${targetTid}`, JSON.stringify(draftRecord));

          // 2. Also update main state draft property so next full refresh stays in sync
          const mainRaw = await kv.get("league_state:main");
          if (mainRaw) {
            try {
              const main = JSON.parse(mainRaw);
              if (main.tournaments && main.tournaments[targetTid]) {
                main.tournaments[targetTid].draftData = draftObj;
                if (body.roster) main.roster = body.roster;
                main.updatedAt = Date.now();
                main.rev = (main.rev || 0) + 1;
                await kv.put("league_state:main", JSON.stringify(main));
              }
            } catch (e) {}
          }

          return jsonResponse({ success: true, updatedAt: draftRecord.updatedAt });
        }
      }

      // -------------------------------------------------------------
      // 4. Authentication (Trainer Accounts & Sessions)
      // -------------------------------------------------------------
      if (path === "/api/auth/register") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const { username, password, email } = await request.json();

        if (!username || !password) {
          return jsonResponse({ error: "Username and password required" }, 400);
        }

        const cleanUsername = username.trim();
        const userKey = `user:${cleanUsername.toLowerCase()}`;
        const existing = await kv.get(userKey);

        if (existing) {
          return jsonResponse({ error: `An account for "${cleanUsername}" already exists.` }, 400);
        }

        const passwordHash = await hashPassword(password);
        const userId = crypto.randomUUID();
        const role = cleanUsername.toLowerCase() === "ethan" ? "moderator" : "player";

        const userData = {
          id: userId,
          username: cleanUsername,
          email: email || `${cleanUsername.toLowerCase()}@bellimaka.local`,
          role: role,
          passwordHash: passwordHash,
          prediction_points: 0,
          created_at: new Date().toISOString()
        };

        // Save user record
        await kv.put(userKey, JSON.stringify(userData));

        // Update public user profiles list
        let profilesList = [];
        const rawProfiles = await kv.get("user_profiles_list");
        if (rawProfiles) {
          try { profilesList = JSON.parse(rawProfiles); } catch(e){}
        }
        profilesList.push({
          id: userId,
          username: cleanUsername,
          role: role,
          prediction_points: 0
        });
        await kv.put("user_profiles_list", JSON.stringify(profilesList));

        // Return user session
        const sessionUser = {
          id: userId,
          username: cleanUsername,
          email: userData.email,
          role: role,
          user_metadata: { username: cleanUsername, display_name: cleanUsername }
        };

        return jsonResponse({ success: true, user: sessionUser });
      }

      if (path === "/api/auth/login") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const { username, password } = await request.json();

        if (!username || !password) {
          return jsonResponse({ error: "Username and password required" }, 400);
        }

        const cleanUsername = username.trim();
        const userKey = `user:${cleanUsername.toLowerCase()}`;
        const raw = await kv.get(userKey);

        if (!raw) {
          // Check if it's the moderator Ethan logging in with default setup
          if (cleanUsername.toLowerCase() === "ethan") {
            const passwordHash = await hashPassword(password);
            const userId = "bb8f7ff6-67bb-4fce-9dc1-8d52b4b6d1bf";
            const newMod = {
              id: userId,
              username: "Ethan",
              email: "ethan@bellimaka.local",
              role: "moderator",
              passwordHash: passwordHash,
              prediction_points: 0,
              created_at: new Date().toISOString()
            };
            await kv.put(userKey, JSON.stringify(newMod));
            return jsonResponse({
              success: true,
              user: {
                id: userId,
                username: "Ethan",
                email: newMod.email,
                role: "moderator",
                user_metadata: { username: "Ethan", display_name: "Ethan" }
              }
            });
          }
          return jsonResponse({ error: "Invalid username or password" }, 401);
        }

        const user = JSON.parse(raw);
        const inputHash = await hashPassword(password);

        if (user.passwordHash !== inputHash) {
          return jsonResponse({ error: "Invalid username or password" }, 401);
        }

        const sessionUser = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          user_metadata: { username: user.username, display_name: user.username }
        };

        return jsonResponse({ success: true, user: sessionUser });
      }

      if (path === "/api/accounts" || path === "/api/auth/users") {
        const raw = await kv.get("user_profiles_list");
        let profilesList = [];
        if (raw) {
          try { profilesList = JSON.parse(raw); } catch(e){}
        }
        return jsonResponse(profilesList);
      }

      // -------------------------------------------------------------
      // 5. Predictions
      // -------------------------------------------------------------
      if (path === "/api/predictions") {
        const tId = url.searchParams.get("tournament_id") || url.searchParams.get("tournamentId");
        if (!tId) return jsonResponse({ error: "Missing tournament_id" }, 400);

        const predKey = `predictions:${tId}`;

        if (request.method === "GET") {
          const raw = await kv.get(predKey);
          let list = [];
          if (raw) {
            try { list = JSON.parse(raw); } catch(e){}
          }
          return jsonResponse(list);
        }

        if (request.method === "POST") {
          const body = await request.json();
          let list = [];
          const raw = await kv.get(predKey);
          if (raw) {
            try { list = JSON.parse(raw); } catch(e){}
          }

          if (body.action === "delete") {
            list = list.filter(p => !(p.user_id === body.user_id && p.tournament_id === tId && (!body.prediction_key || p.prediction_key === body.prediction_key)));
          } else {
            // Upsert prediction
            const index = list.findIndex(p => p.user_id === body.user_id && p.tournament_id === tId && p.prediction_key === body.prediction_key);
            const record = {
              user_id: body.user_id,
              tournament_id: tId,
              prediction_key: body.prediction_key,
              selection: body.selection,
              updated_at: new Date().toISOString()
            };
            if (index >= 0) {
              list[index] = record;
            } else {
              list.push(record);
            }
          }

          await kv.put(predKey, JSON.stringify(list));
          return jsonResponse({ success: true, count: list.length });
        }
      }

      // -------------------------------------------------------------
      // 6. Database Migration & Seed Endpoint
      // -------------------------------------------------------------
      if (path === "/api/seed" && request.method === "POST") {
        const masterKeyHeader = request.headers.get("x-master-key");
        const body = await request.json();

        if (masterKeyHeader !== MASTER_KEY && body.masterKey !== MASTER_KEY) {
          return jsonResponse({ error: "Unauthorized: Invalid master key" }, 401);
        }

        let imported = { league_state: false, user_profiles: 0, predictions: 0 };

        // Seed League State (both main and media)
        if (body.league_state) {
          const records = Array.isArray(body.league_state) ? body.league_state : [body.league_state];
          for (const rec of records) {
            const recId = rec.id || "main";
            const recData = rec.data || rec;
            await kv.put(`league_state:${recId}`, JSON.stringify(recData));
            imported.league_state = true;

            // Also seed active draft states if it's the main record
            if (recId === "main" && recData.tournaments) {
              for (const [tId, tourney] of Object.entries(recData.tournaments)) {
                if (tourney && tourney.draft) {
                  await kv.put(`draft_state:${tId}`, JSON.stringify({
                    tournamentId: tId,
                    draft: tourney.draft,
                    roster: recData.roster || {},
                    updatedAt: Date.now()
                  }));
                }
              }
            }
          }
        }

        // Seed User Profiles & Accounts
        if (body.user_profiles && Array.isArray(body.user_profiles)) {
          let profilesList = [];
          for (const u of body.user_profiles) {
            const userKey = `user:${u.username.toLowerCase()}`;
            const userData = {
              id: u.id,
              username: u.username,
              email: `${u.username.toLowerCase()}@bellimaka.local`,
              role: u.role || (u.username.toLowerCase() === "ethan" ? "moderator" : "player"),
              passwordHash: await hashPassword("password123"), // Default seed password, can be changed
              prediction_points: u.prediction_points || 0,
              created_at: u.created_at || new Date().toISOString()
            };
            await kv.put(userKey, JSON.stringify(userData));
            profilesList.push({
              id: u.id,
              username: u.username,
              role: userData.role,
              prediction_points: userData.prediction_points
            });
            imported.user_profiles++;
          }
          await kv.put("user_profiles_list", JSON.stringify(profilesList));
        }

        // Seed Predictions
        if (body.predictions && Array.isArray(body.predictions)) {
          const byTournament = {};
          for (const p of body.predictions) {
            const tId = p.tournament_id;
            if (!byTournament[tId]) byTournament[tId] = [];
            byTournament[tId].push(p);
          }
          for (const [tId, list] of Object.entries(byTournament)) {
            await kv.put(`predictions:${tId}`, JSON.stringify(list));
            imported.predictions += list.length;
          }
        }

        return jsonResponse({ success: true, message: "Seed data successfully loaded into Cloudflare KV!", imported });
      }

      return jsonResponse({ error: "Endpoint not found" }, 404);

    } catch (err) {
      return jsonResponse({ error: err.message || "Internal Worker Error", stack: err.stack }, 500);
    }
  }
};
