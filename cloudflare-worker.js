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

// Pokemon Showdown sprite slug generator
function getPokemonSpriteUrl(pokemonName) {
  if (!pokemonName || typeof pokemonName !== "string") return null;
  let name = pokemonName.toLowerCase().trim();

  // Regional forms
  if (name.startsWith("hisuian ")) name = name.replace("hisuian ", "") + "-hisui";
  else if (name.startsWith("galarian ")) name = name.replace("galarian ", "") + "-galar";
  else if (name.startsWith("alolan ")) name = name.replace("alolan ", "") + "-alola";
  else if (name.startsWith("paldean ")) name = name.replace("paldean ", "") + "-paldea";

  // Mega Evolutions
  if (name.startsWith("mega ")) {
    let rest = name.replace("mega ", "").trim();
    if (rest.endsWith(" x")) name = rest.replace(" x", "") + "-megax";
    else if (rest.endsWith(" y")) name = rest.replace(" y", "") + "-megay";
    else name = rest + "-mega";
  }

  // Remove punctuation
  name = name.replace(/['’.:]/g, "");

  // Mr Mime & Mr Rime
  name = name.replace(/^mr\s+mime/, "mrmime").replace(/^mr\s+rime/, "mrrime");

  // Paradox Pokemon and Treasures of Ruin
  name = name
    .replace(/^tapu[\s-]/, "tapu")
    .replace(/^iron[\s-]/, "iron")
    .replace(/^scream[\s-]/, "scream")
    .replace(/^brute[\s-]/, "brute")
    .replace(/^flutter[\s-]/, "flutter")
    .replace(/^slither[\s-]/, "slither")
    .replace(/^sandy[\s-]/, "sandy")
    .replace(/^roaring[\s-]/, "roaring")
    .replace(/^great[\s-]/, "great")
    .replace(/^walking[\s-]/, "walking")
    .replace(/^gouging[\s-]/, "gouging")
    .replace(/^raging[\s-]/, "raging")
    .replace(/^ting[\s-]lu$/, "tinglu")
    .replace(/^chien[\s-]pao$/, "chienpao")
    .replace(/^wo[\s-]chien$/, "wochien")
    .replace(/^chi[\s-]yu$/, "chiyu");

  // Spaces to dashes
  name = name.replace(/\s+/g, "-");

  const ANIMATED_ONLY_SPRITES = new Set([
    'staraptor-mega', 'raichu-megax', 'raichu-megay', 'malamar-mega', 'dragalge-mega', 'scrafty-mega'
  ]);

  const GEN5_ONLY_MEGAS = new Set([
    'floette-mega', 'meganium-mega', 'feraligatr-mega', 'emboar-mega', 'chesnaught-mega',
    'delphox-mega', 'greninja-mega', 'clefable-mega', 'victreebel-mega', 'starmie-mega',
    'dragonite-mega', 'skarmory-mega', 'chimecho-mega', 'froslass-mega', 'excadrill-mega',
    'chandelure-mega', 'hawlucha-mega'
  ]);

  if (ANIMATED_ONLY_SPRITES.has(name)) {
    return `https://play.pokemonshowdown.com/sprites/ani/${encodeURIComponent(name)}.gif`;
  }
  if (GEN5_ONLY_MEGAS.has(name)) {
    return `https://play.pokemonshowdown.com/sprites/gen5/${encodeURIComponent(name)}.png`;
  }

  return `https://play.pokemonshowdown.com/sprites/home/${encodeURIComponent(name)}.png`;
}

// Discord Webhook Dispatcher (supports JSON and multipart/form-data with file attachments)
async function sendDiscordWebhook(webhookUrl, payload, fileAttachment = null) {
  if (!webhookUrl || typeof webhookUrl !== "string" || !webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
    return { success: false, error: "Invalid or missing Discord Webhook URL" };
  }
  try {
    let res;
    if (fileAttachment && fileAttachment.bytes) {
      const formData = new FormData();
      const blob = new Blob([fileAttachment.bytes], { type: fileAttachment.type || 'image/png' });
      formData.append('files[0]', blob, fileAttachment.filename || 'match_card.png');
      formData.append('payload_json', JSON.stringify(payload));
      res = await fetch(webhookUrl, {
        method: "POST",
        body: formData
      });
    } else {
      res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    if (!res.ok) {
      const text = await res.text();
      return { success: false, status: res.status, error: text || `HTTP ${res.status}` };
    }
    return { success: true };
  } catch(e) {
    return { success: false, error: e.message || "Network error posting to Discord" };
  }
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
          return new Response(raw, {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders(),
            },
          });
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

          // Also keep active tournament draft states synced for fast lightweight querying (only when draft is active)
          if (stateId === "main" && statePayload.tournaments) {
            for (const [tId, tourney] of Object.entries(statePayload.tournaments)) {
              const draftObj = tourney.draftData || tourney.draft;
              if (tourney && tourney.phase === 'draft' && draftObj) {
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

        let passwordValid = false;
        // Allows manual password change directly from Cloudflare KV Dashboard:
        // 1. If you typed "password": "yourNewPassword" into the user's KV JSON
        // 2. OR if you typed plaintext into "passwordHash": "yourNewPassword"
        if (user.password && (user.password === password || user.password.trim() === password.trim())) {
          passwordValid = true;
          user.passwordHash = inputHash;
          delete user.password;
          await kv.put(userKey, JSON.stringify(user));
        } else if (user.passwordHash === password || user.passwordHash === password.trim()) {
          // Plaintext was entered directly into "passwordHash" field in Cloudflare KV!
          passwordValid = true;
          user.passwordHash = inputHash;
          await kv.put(userKey, JSON.stringify(user));
        } else if (user.passwordHash === inputHash) {
          passwordValid = true;
        }

        if (!passwordValid) {
          return jsonResponse({ error: "Invalid username or password" }, 401);
        }

        // If role was updated directly in Cloudflare KV Dashboard, keep user_profiles_list in sync
        try {
          const rawProfiles = await kv.get("user_profiles_list");
          if (rawProfiles) {
            let pList = JSON.parse(rawProfiles);
            let pItem = pList.find(p => p.username.toLowerCase() === user.username.toLowerCase());
            if (pItem && pItem.role !== user.role) {
              pItem.role = user.role;
              await kv.put("user_profiles_list", JSON.stringify(pList));
            }
          }
        } catch(e){}

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
      // 4b. Password Management & Role Administration
      // -------------------------------------------------------------
      if (path === "/api/auth/change-password") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const { username, currentPassword, newPassword, masterKey } = await request.json();

        if (!username || !newPassword) {
          return jsonResponse({ error: "Username and new password are required" }, 400);
        }
        if (newPassword.length < 6) {
          return jsonResponse({ error: "New password must be at least 6 characters long" }, 400);
        }

        const cleanUsername = username.trim();
        const userKey = `user:${cleanUsername.toLowerCase()}`;
        const raw = await kv.get(userKey);

        if (!raw) {
          return jsonResponse({ error: `User "${cleanUsername}" not found` }, 404);
        }

        const user = JSON.parse(raw);

        // Allow master key override OR check currentPassword
        const masterKeyHeader = request.headers.get("x-master-key");
        const isMaster = (masterKey === MASTER_KEY || masterKeyHeader === MASTER_KEY);

        if (!isMaster) {
          if (!currentPassword) {
            return jsonResponse({ error: "Current password is required" }, 400);
          }
          const currentHash = await hashPassword(currentPassword);
          if (user.passwordHash !== currentHash) {
            return jsonResponse({ error: "Incorrect current password" }, 401);
          }
        }

        user.passwordHash = await hashPassword(newPassword);
        user.updated_at = new Date().toISOString();
        await kv.put(userKey, JSON.stringify(user));

        return jsonResponse({ success: true, message: "Password updated successfully" });
      }

      if (path === "/api/auth/update-role") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const { targetUsername, newRole, masterKey, requesterUsername } = await request.json();

        if (!targetUsername || !newRole) {
          return jsonResponse({ error: "targetUsername and newRole are required" }, 400);
        }
        if (newRole !== "moderator" && newRole !== "player") {
          return jsonResponse({ error: "Role must be 'moderator' or 'player'" }, 400);
        }

        // Check authorization: either masterKey or requester must be a moderator
        const masterKeyHeader = request.headers.get("x-master-key");
        let authorized = (masterKey === MASTER_KEY || masterKeyHeader === MASTER_KEY);

        if (!authorized && requesterUsername) {
          const reqRaw = await kv.get(`user:${requesterUsername.trim().toLowerCase()}`);
          if (reqRaw) {
            const reqUser = JSON.parse(reqRaw);
            if (reqUser.role === "moderator") {
              authorized = true;
            }
          }
        }

        if (!authorized) {
          return jsonResponse({ error: "Unauthorized: Moderator privileges required" }, 403);
        }

        const cleanTarget = targetUsername.trim();
        const targetKey = `user:${cleanTarget.toLowerCase()}`;
        const rawTarget = await kv.get(targetKey);

        if (!rawTarget) {
          return jsonResponse({ error: `User "${cleanTarget}" not found` }, 404);
        }

        const targetUser = JSON.parse(rawTarget);
        targetUser.role = newRole;
        targetUser.updated_at = new Date().toISOString();
        await kv.put(targetKey, JSON.stringify(targetUser));

        // Also update user_profiles_list
        let profilesList = [];
        const rawProfiles = await kv.get("user_profiles_list");
        if (rawProfiles) {
          try { profilesList = JSON.parse(rawProfiles); } catch(e){}
        }

        const idx = profilesList.findIndex(p => p.username.toLowerCase() === cleanTarget.toLowerCase());
        if (idx >= 0) {
          profilesList[idx].role = newRole;
        } else {
          profilesList.push({
            id: targetUser.id,
            username: targetUser.username,
            role: newRole,
            prediction_points: targetUser.prediction_points || 0
          });
        }
        await kv.put("user_profiles_list", JSON.stringify(profilesList));

        return jsonResponse({ success: true, username: targetUser.username, role: newRole });
      }

      if (path === "/api/auth/reset-password") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const { targetUsername, newPassword, masterKey, requesterUsername } = await request.json();

        if (!targetUsername || !newPassword) {
          return jsonResponse({ error: "targetUsername and newPassword are required" }, 400);
        }
        if (newPassword.length < 6) {
          return jsonResponse({ error: "New password must be at least 6 characters long" }, 400);
        }

        // Check authorization: either masterKey or requester must be a moderator
        const masterKeyHeader = request.headers.get("x-master-key");
        let authorized = (masterKey === MASTER_KEY || masterKeyHeader === MASTER_KEY);

        if (!authorized && requesterUsername) {
          const reqRaw = await kv.get(`user:${requesterUsername.trim().toLowerCase()}`);
          if (reqRaw) {
            const reqUser = JSON.parse(reqRaw);
            if (reqUser.role === "moderator") {
              authorized = true;
            }
          }
        }

        if (!authorized) {
          return jsonResponse({ error: "Unauthorized: Moderator privileges required" }, 403);
        }

        const cleanTarget = targetUsername.trim();
        const targetKey = `user:${cleanTarget.toLowerCase()}`;
        const rawTarget = await kv.get(targetKey);

        if (!rawTarget) {
          return jsonResponse({ error: `User "${cleanTarget}" not found` }, 404);
        }

        const targetUser = JSON.parse(rawTarget);
        targetUser.passwordHash = await hashPassword(newPassword);
        targetUser.updated_at = new Date().toISOString();
        await kv.put(targetKey, JSON.stringify(targetUser));

        return jsonResponse({ success: true, message: `Password for ${targetUser.username} has been reset successfully` });
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
            // Verify tournament state to reject illegal writes once locked
            const masterKeyHeader = request.headers.get("x-master-key");
            const isMaster = (masterKeyHeader === MASTER_KEY || body.masterKey === MASTER_KEY);

            if (!isMaster) {
              const stateRaw = await kv.get("league_state:main");
              if (stateRaw) {
                try {
                  const stateObj = JSON.parse(stateRaw);
                  const tObj = stateObj?.tournaments?.[tId];
                  if (tObj) {
                    if (tObj.status === "COMPLETE") {
                      return jsonResponse({ error: "Predictions locked: Tournament is complete" }, 403);
                    }
                    const qKey = body.prediction_key || "";
                    // Bracket matches lock once playoffs begin
                    if (qKey.startsWith("Top Cut Bracket Match") || qKey.startsWith("draftdex-bpick-") || qKey.startsWith("Top Cut · ")) {
                      if (tObj.phase === "topcut" || tObj.bracketManagerData?.match?.some(m => m.status >= 4 || (m.opponent1?.score != null && m.opponent2?.score != null))) {
                        return jsonResponse({ error: "Predictions locked: Top Cut playoff matches underway" }, 403);
                      }
                    }
                    // Champion locks once matches start or topcut begins
                    if (/^Who will be the .* Champion\?$/i.test(qKey) || qKey === "champion") {
                      if (tObj.phase === "topcut" || Boolean(tObj.bracketManagerData) || (tObj.matches || []).some(m => (m.as !== "" && m.as != null && m.bs !== "" && m.bs != null) || m.isDone)) {
                        return jsonResponse({ error: "Predictions locked: Tournament underway" }, 403);
                      }
                    }
                    // Regular season head-to-head match locks once played
                    const vsMatch = qKey.match(/^Who wins:\s*(.+)\s+vs\s+(.+)$/i);
                    if (vsMatch) {
                      const p1 = vsMatch[1].trim(), p2 = vsMatch[2].trim();
                      const played = (tObj.matches || []).some(x => ((x.a === p1 && x.b === p2) || (x.a === p2 && x.b === p1)) && (((x.as !== "" && x.as != null && x.bs !== "" && x.bs != null) || x.isDone || x.a === "BYE" || x.b === "BYE")));
                      if (played) {
                        return jsonResponse({ error: "Predictions locked: Match already completed" }, 403);
                      }
                    }
                  }
                } catch(e){}
              }
            }

            // Upsert prediction
            const index = list.findIndex(p => p.user_id === body.user_id && p.tournament_id === tId && p.prediction_key === body.prediction_key);
            const record = {
              user_id: body.user_id,
              tournament_id: tId,
              prediction_key: body.prediction_key,
              selection: body.selection,
              updated_at: (isMaster && body.updated_at) ? body.updated_at : new Date().toISOString()
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

      // -------------------------------------------------------------
      // 7. Discord Webhook Integration (Draft Picks, Matches, Pings)
      // -------------------------------------------------------------
      if (path === "/api/discord/config") {
        if (request.method === "GET") {
          const raw = await kv.get("discord_config");
          let config = {
            webhookUrl: "",
            draftWebhookUrl: "",
            scoreWebhookUrl: "",
            coachDiscordIds: {},
            announcePicks: true,
            announceScores: true,
            announceTopCut: true
          };
          if (raw) {
            try {
              config = { ...config, ...JSON.parse(raw) };
            } catch(e){}
          }
          return jsonResponse(config);
        }

        if (request.method === "POST") {
          const body = await request.json();
          const masterKeyHeader = request.headers.get("x-master-key");
          let authorized = (body.masterKey === MASTER_KEY || masterKeyHeader === MASTER_KEY);

          if (!authorized && body.requesterUsername) {
            const reqRaw = await kv.get(`user:${body.requesterUsername.trim().toLowerCase()}`);
            if (reqRaw) {
              const reqUser = JSON.parse(reqRaw);
              if (reqUser.role === "moderator") authorized = true;
            }
          }

          if (!authorized) {
            return jsonResponse({ error: "Unauthorized: Moderator privileges required" }, 403);
          }

          const existingRaw = await kv.get("discord_config");
          let config = {
            webhookUrl: "",
            draftWebhookUrl: "",
            scoreWebhookUrl: "",
            coachDiscordIds: {},
            announcePicks: true,
            announceScores: true,
            announceTopCut: true
          };
          if (existingRaw) {
            try { config = { ...config, ...JSON.parse(existingRaw) }; } catch(e){}
          }

          if (typeof body.webhookUrl === "string") config.webhookUrl = body.webhookUrl.trim();
          if (typeof body.draftWebhookUrl === "string") config.draftWebhookUrl = body.draftWebhookUrl.trim();
          if (typeof body.scoreWebhookUrl === "string") config.scoreWebhookUrl = body.scoreWebhookUrl.trim();
          if (body.coachDiscordIds && typeof body.coachDiscordIds === "object") {
            config.coachDiscordIds = body.coachDiscordIds;
          }
          if (typeof body.announcePicks === "boolean") config.announcePicks = body.announcePicks;
          if (typeof body.announceScores === "boolean") config.announceScores = body.announceScores;
          if (typeof body.announceTopCut === "boolean") config.announceTopCut = body.announceTopCut;
          config.updatedAt = new Date().toISOString();

          await kv.put("discord_config", JSON.stringify(config));
          return jsonResponse({ success: true, config });
        }
      }

      if (path === "/api/discord/test" && request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        let webhookUrl = body.webhookUrl;
        let testType = body.type || (body.channel === "draft" ? "Draft Picks" : (body.channel === "score" ? "Match Scores" : "General"));

        if (!webhookUrl) {
          const raw = await kv.get("discord_config");
          if (raw) {
            try {
              const cfg = JSON.parse(raw);
              if (body.channel === "draft") webhookUrl = cfg.draftWebhookUrl || cfg.webhookUrl;
              else if (body.channel === "score") webhookUrl = cfg.scoreWebhookUrl || cfg.webhookUrl;
              else webhookUrl = cfg.webhookUrl || cfg.draftWebhookUrl || cfg.scoreWebhookUrl;
            } catch(e){}
          }
        }

        if (!webhookUrl) {
          return jsonResponse({ error: `No Discord Webhook URL provided for ${testType}.` }, 400);
        }

        const testPayload = {
          content: `⚡ **Bellimaka Discord Announcer is Connected!** (${testType} Channel)`,
          embeds: [
            {
              title: `🏆 Bellimaka Pokémon Draft League • ${testType} Test`,
              description: `Your **${testType}** webhook is configured and running 24/7!\n\n**Channel Type:** ${testType}\n**Status:** 🟢 Online (Serverless Cloudflare Worker)`,
              color: 15675448, // 0xEF3038
              fields: [
                { name: "Channel", value: testType, inline: true },
                { name: "Platform", value: "Cloudflare Worker + KV", inline: true },
                { name: "Push Mentions", value: "Active", inline: true }
              ],
              footer: { text: "Bellimaka Pokemon League • 24/7 Discord Integration" },
              timestamp: new Date().toISOString()
            }
          ]
        };

        const result = await sendDiscordWebhook(webhookUrl, testPayload);
        if (!result.success) {
          return jsonResponse({ error: `Discord Webhook Error: ${result.error}` }, 400);
        }

        return jsonResponse({ success: true, message: `Test alert delivered to ${testType} channel!` });
      }

      if (path === "/api/discord/announce-pick" && request.method === "POST") {
        const body = await request.json();
        const rawConfig = await kv.get("discord_config");
        if (!rawConfig) {
          return jsonResponse({ success: true, skipped: true, reason: "No Discord config" });
        }

        let config = {};
        try { config = JSON.parse(rawConfig); } catch(e){}

        const draftWebhookUrl = config.draftWebhookUrl || config.webhookUrl;
        if (!draftWebhookUrl || config.announcePicks === false) {
          return jsonResponse({ success: true, skipped: true, reason: "Draft announcements disabled or no webhook configured" });
        }

        const { tournamentName, pick, nextTurn } = body;
        if (!pick || !pick.pokemon) {
          return jsonResponse({ error: "Invalid pick data" }, 400);
        }

        // Format Next Coach Mention (only <@ID>, without duplicate profile name)
        let nextCoachMention = null;
        let contentPing = "";
        if (nextTurn && !nextTurn.isComplete && nextTurn.player) {
          const coachMap = config.coachDiscordIds || {};
          let targetDiscordId = null;

          // Case-insensitive coach lookup
          const searchName = nextTurn.player.trim().toLowerCase();
          for (const [name, id] of Object.entries(coachMap)) {
            if (name.trim().toLowerCase() === searchName && id && String(id).trim()) {
              targetDiscordId = String(id).trim();
              break;
            }
          }

          if (targetDiscordId && /^\d{16,21}$/.test(targetDiscordId)) {
            nextCoachMention = `<@${targetDiscordId}>`;
          } else {
            nextCoachMention = `**${nextTurn.player}**`;
          }

          contentPing = `**${pick.player}** drafted **${pick.pokemon}**!\n\n⏰ **ON THE CLOCK:** ${nextCoachMention} — you are on the clock for **Round ${nextTurn.round} (Pick #${nextTurn.pickNumber})**!`;
        } else if (nextTurn && nextTurn.isComplete) {
          contentPing = `**${pick.player}** drafted **${pick.pokemon}**!\n\n🏁 **THE DRAFT IS OFFICIALLY COMPLETE!** Congratulations to all coaches on assembling their rosters!`;
        } else {
          contentPing = `**${pick.player}** drafted **${pick.pokemon}**!`;
        }

        const spriteUrl = getPokemonSpriteUrl(pick.pokemon);
        const tourneyTitle = tournamentName ? `${tournamentName}` : "Bellimaka Draft League";

        const embed = {
          title: `🏆 ${tourneyTitle} — Round ${pick.round}, Pick #${pick.pickNumber}`,
          description: `**${pick.player}** drafted **${pick.pokemon}**! 🎉`,
          color: 15675448, // 0xEF3038
          fields: [
            { name: "Cost", value: `${pick.cost || 0} pts`, inline: true },
            { name: "Pick #", value: `Round ${pick.round} (#${pick.pickNumber})`, inline: true },
            { name: "Roster Progress", value: `${pick.teamCount || 1} / ${pick.maxSlots || 10} Pokémon`, inline: true },
            { name: "Budget Left", value: `${pick.remainingBudget ?? "—"} pts`, inline: true },
            {
              name: "⏰ On The Clock",
              value: nextTurn?.isComplete ? "Draft Completed 🏁" : (nextCoachMention ? `${nextCoachMention}` : "TBD"),
              inline: false
            }
          ],
          footer: { text: "Bellimaka Pokemon League • Live Draft" },
          timestamp: new Date().toISOString()
        };

        if (spriteUrl) {
          embed.thumbnail = { url: spriteUrl };
        }

        const payload = {
          content: contentPing,
          embeds: [embed]
        };

        const result = await sendDiscordWebhook(draftWebhookUrl, payload);
        return jsonResponse({ success: result.success, error: result.error });
      }

      if (path === "/api/discord/announce-score" && request.method === "POST") {
        const body = await request.json();
        const rawConfig = await kv.get("discord_config");
        if (!rawConfig) {
          return jsonResponse({ success: true, skipped: true, reason: "No Discord config" });
        }

        let config = {};
        try { config = JSON.parse(rawConfig); } catch(e){}

        const scoreWebhookUrl = config.scoreWebhookUrl || config.webhookUrl;
        if (!scoreWebhookUrl) {
          return jsonResponse({ success: true, skipped: true, reason: "No webhook URL configured for scores" });
        }

        const { match, tournamentName } = body;
        if (!match || !match.p1 || !match.p2) {
          return jsonResponse({ error: "Invalid match data" }, 400);
        }

        if (match.isTopCut && config.announceTopCut === false) {
          return jsonResponse({ success: true, skipped: true, reason: "Top Cut announcements disabled" });
        }
        if (!match.isTopCut && config.announceScores === false) {
          return jsonResponse({ success: true, skipped: true, reason: "Score announcements disabled" });
        }

        const isTie = (match.s1 === match.s2);
        const winner = match.winner || (match.s1 > match.s2 ? match.p1 : (match.s2 > match.s1 ? match.p2 : null));
        const loser = winner === match.p1 ? match.p2 : match.p1;
        const winScore = winner === match.p1 ? match.s1 : match.s2;
        const loseScore = winner === match.p1 ? match.s2 : match.s1;

        let contentText = "";
        if (isTie) {
          contentText = `⚔️ **MATCH RESULT:** **${match.p1}** and **${match.p2}** tied ${match.s1}-${match.s2}!`;
        } else {
          contentText = `⚔️ **MATCH RESULT:** **${winner}** defeats **${loser}** ${winScore}-${loseScore}!`;
        }

        let fileAttachment = null;
        let embeds = [];

        // Check if browser generated a match card graphic
        if (match.imageBase64 && typeof match.imageBase64 === "string" && match.imageBase64.includes(";base64,")) {
          try {
            const cleanBase64 = match.imageBase64.split(";base64,")[1];
            const binaryStr = atob(cleanBase64);
            const bytes = new Uint8Array(binaryStr.length);
            for (let i = 0; i < binaryStr.length; i++) {
              bytes[i] = binaryStr.charCodeAt(i);
            }
            fileAttachment = {
              bytes: bytes,
              filename: 'match_result.png',
              type: 'image/png'
            };
            embeds = [{
              color: 15675448, // 0xEF3038
              image: { url: 'attachment://match_result.png' },
              footer: { text: `Bellimaka Pokemon League • ${tournamentName || "League Match"}` },
              timestamp: new Date().toISOString()
            }];
          } catch(e) {
            console.warn("Error decoding match card base64 image:", e);
          }
        }

        // Clean fallback embed if no graphic was generated
        if (!fileAttachment) {
          let titleText = `⚔️ ${match.stage || "Match Result"}`;
          if (match.roundLabel) titleText += ` • ${match.roundLabel}`;
          embeds = [{
            title: titleText,
            description: isTie ? `🤝 **${match.p1}** and **${match.p2}** tied (\`${match.s1} - ${match.s2}\`)` : `🏆 **${winner}** defeated **${loser}** (\`${winScore} - ${loseScore}\`)!`,
            color: 15675448,
            footer: { text: `Bellimaka Pokemon League • ${tournamentName || "League Match"}` },
            timestamp: new Date().toISOString()
          }];
        }

        const payload = {
          content: contentText,
          embeds: embeds
        };

        const result = await sendDiscordWebhook(scoreWebhookUrl, payload, fileAttachment);
        return jsonResponse({ success: result.success, error: result.error });
      }

      return jsonResponse({ error: "Endpoint not found" }, 404);

    } catch (err) {
      return jsonResponse({ error: err.message || "Internal Worker Error", stack: err.stack }, 500);
    }
  }
};
