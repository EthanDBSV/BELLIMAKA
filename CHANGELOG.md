# Bellimaka League — Changelog

All notable changes to the Bellimaka Pokémon Draft League site are documented here.
Format: `v[MAJOR].[MINOR].[PATCH]` — Major = big new systems, Minor = new features, Patch = bug fixes / small improvements.

## [v1.1.7] — 2026-09-24

### Fixed
- **Restored Complete Prediction Ballot for Gavin (zkl)** — Restored all 22 verified predictions submitted by Gavin directly into Cloudflare KV from his verified ballot submission:
  - Champion: Dao Ming
  - Division Winners: Ethan (Group A), Dao Ming (Group B)
  - 19 Match Picks across Groups A & B
  - Gavin's score is now accurately recorded at 32 PTS (4 hits out of 4 decided matches picked) on the official leaderboard and in his prediction ballot breakdown modal.
- **Eliminated Cloudflare KV Concurrency Race Condition** — Fixed the root cause of lost and stranded predictions where parallel, unawaited `fetch` requests fired by the client clobbered each other during Cloudflare KV's read-modify-write cycle.
  - Implemented sequential `await` execution for all prediction synchronization batches.
  - Added an in-memory queue (`predictionSyncQueuePromise`) to serialize rapid single-pick selections so fast consecutive clicks never collide in Cloudflare KV.
- **Bulletproof Local-to-Cloud Auto-Sync** — Redesigned `syncLocalPicksToCloud` to guarantee that no coach's picks can ever get stranded locally:
  - Fetches live ground-truth records directly from Cloudflare KV upon sync rather than relying on uninitialized or stale client caches.
  - Cross-references all local device picks (`draftdex-pick-{tournamentId}-*`) against cloud state, detecting any missing or updated picks using canonical matchup event keys.
  - Pushes all missing picks sequentially to Cloudflare KV and cleans up any legacy inverted matchup keys.
  - Automatically triggers whenever a coach opens the site (client initialization), logs in or registers, navigates to the Predictions view, or refreshes prediction scores.
- **Global Prediction Cache & Modal Independence** — Decoupled prediction score calculations and cache hydration from the presence of `#predLeaders` in the DOM so that opening any coach's prediction ballot from profiles, rosters, or other views always loads fresh, complete data.

---

## [v1.1.6] — 2026-09-24

### Changed
- **Unified Sole Profile Picture (PFP) System** — Retired the dual team cover and coach photo system in favor of a single, unified coach profile picture (PFP) identity across the platform:
  - All coach cards, leaderboard items, tournament match cards, draft displays, and roster views now display the coach's circular profile picture avatar.
  - Streamlined the Coach Profile modal, moderation controls, and Team Roster detail headers by removing redundant "Edit Cover" buttons and replacing them with a single "Edit profile picture" control featuring the 1:1 circular guide cropper.
  - Aliased legacy cover editor invocations (`openTeamCoverEditor`) directly to `openProfilePictureEditor` to preserve compatibility with any remaining references.

### Fixed
- **Converted All Existing Team Covers to Profile Pictures** — Migrated all 12 coaches with team covers in Cloudflare KV (`Kai`, `Max`, `Ozy`, `Sam`, `Eric`, `Jace`, `Trtl`, `Ethan`, `Kiril`, `Yamac`, `Dao Ming`, `Praneeth`) into official `profilePictures` entries, ensuring no coach's artwork or branding was lost.
- **Client Startup & Cloud Ingestion Migration** — Added automatic conversion upon client boot (`localStorage` merge) and cloud media synchronization (`fetchMediaFromCloud`) to seamlessly transfer any cached or incoming legacy cover artwork into `profilePictures`.

---

## [v1.1.5] — 2026-09-23

### Fixed
- **Local-to-Cloud Prediction Auto-Synchronization** — Fixed an issue where predictions made on a user's device (e.g. before signing in, or during intermittent background network sync) were saved only into local browser storage (`localStorage`) and never uploaded to Cloudflare KV. Added `syncLocalPicksToCloud()` which automatically detects unsynced or updated local picks and uploads them to the cloud upon page load, sign-in, and leaderboard cache updates.
- **Restored Complete Prediction Ballot for Max (Celesteil)** — Synchronized all 20 of Max's match predictions (23 picks total: 20 matches + 2 division winners + 1 champion) directly into Cloudflare KV matching his exact ballot submission. Max's score is now accurately calculated at 40 PTS (5 hits across all 5 decided matches).
- **Robust Prediction Modal User Resolution & Freshness** — Enhanced `openUserPredictionsModal` to automatically resolve coach names (`Max`), account usernames (`Celesteil`), and account UUIDs, while refreshing any leaderboard cache older than 10 seconds to ensure ballots always display real-time data.
- **Prediction Score Inverted Match Key Deduplication** — Fixed the root cause of prediction points discrepancy (where a user could be awarded extra points despite having only 4 correct picks). Matches whose competitor order had been saved under inverted questions (e.g., `Who wins: Kiril vs Ethan` vs `Who wins: Ethan vs Kiril`) produced duplicate records for the same match. Implemented `canonicalPredictionEventKey` and `deduplicatePredictionRows` across scoring, rendering, and caching to ensure every match matchup normalizes to a single canonical event key, keeping only the latest pick and eliminating double scoring.
- **Inverted Pick Storage Cleanup** — When a user saves or updates a match prediction (`Who wins: A vs B`), any reversed question key (`Who wins: B vs A`) is automatically cleared from `localStorage` and deleted from Cloudflare KV.

### Changed
- **Clean Prediction Leaders Display** — Removed account suffixes from the Prediction Leaders sidebar (e.g., displaying clean coach profile names like `Max` and `Ozy` instead of `Max as Celesteil` or `Ozy as Fickle Apathy`).

### Added
- **Click-to-View Prediction Ballot Breakdown Modal** — Clicking on any person's name or row in the "Prediction leaders" sidebar now opens a dedicated modal displaying their complete submitted prediction ballot:
  - Total points, hit count, and accuracy summary
  - Champion pick (with hit/miss/pending status)
  - Group Stage winner picks (with hit/miss/pending status)
  - Full Match Pick'em history with final match scores and colored HIT/MISS/PENDING badges

---

## [v1.1.4] — 2026-09-23

### Changed
- **Streamlined Matches & Top Cut Pages** — Removed the tournament selector dropdowns from the top-level **Matches** and **Top Cut** pages. These primary views now strictly load the current/ongoing tournament (`ongoingT() || activeT()`) without dropdown clutter or unnecessary reload overhead.
- **Tournament Archive Architecture** — Historical match schedules, scores, battle replays, and playoff brackets are accessed directly via the individual tournament archive page (**Tournaments** tab → click any tournament card → **Tournament Detail** view with dedicated Group/Swiss Stage, Top Cut, Standings, and Teams tabs).

---

## [v1.1.3] — 2026-09-23

### Fixed
- **Multi-Season Matches & Past Tournament Fixtures** — Added a Tournament / Season Selector dropdown to the main Matches page controls bar. When a tournament is active/ongoing, coaches and organizers can now freely toggle between the live tournament (e.g. Bentonville Regional · LIVE) and any past completed tournaments (Wilmington Regional, Cagliari Regional, Sugar Land Regional) to view past match grids, scores, replays, and group standings.
- **Top Cut Tournament Switcher** — Added a Tournament Selector dropdown to the Top Cut tab, allowing viewers to easily inspect championship results and playoff brackets from past completed tournaments as well as live double-elimination brackets.
- **Replay Metadata Preservation in Local Cache** — Updated `safeSaveTournamentsToLocalStorage()` to strip only bulky raw battle log text (`r.log`) while retaining the match replay metadata objects (`id`, `game`, `title`, `winnerCoach`). This keeps the cached payload well under 300 KB while ensuring `m.replays` arrays remain fully populated so replay navigation pills `[ ▶ 1 ] [ ▶ 2 ]` render instantly at 0ms without waiting for background rehydration.
- **Replay Ingestion Guard on Cloud Sync** — Updated `flushSync()` and `applySharedState()` to safeguard battle replays and prevent accidental cloud overwrites if memory state or local storage had stripped replay objects.
- **Restored Historical Battle Replays** — Successfully merged and restored all 131 battle replays from completed tournaments (Cagliari, Sugar Land, Wilmington) to Cloudflare KV while 100% preserving all live Bentonville Regional tournament matches, picks, and Showdown battle replays.

---

## [v1.1.2] — 2026-09-18

### Fixed
- **Split-Second Draft Room Flash on Refresh** — Eliminated the split-second flash on page reload where the site momentarily displayed the mid-draft room with pick #43 (Lycanroc-Dusk) before flipping to the Group Stage.
- **LocalStorage Quota Failure & Stale Cache** — Serialized tournament cache is now optimized from ~3.08 MB down to 182 KB by stripping redundant base64 image strings (already stored in dedicated cover keys), deduplicating draft objects, and offloading bulky match replay logs to IndexedDB. This prevents browser `QuotaExceededError` from silently freezing `localStorage` in outdated draft states.
- **0ms Startup Self-Healing** — Added synchronous startup validation that detects when an ongoing tournament's draft is structurally complete (e.g. coach rosters are already filled or matches are scheduled) and immediately renders the tournament stage at 0ms, preventing any false mid-draft frames before cloud sync completes.
- **IndexedDB Structural Progress Sync** — Enhanced `hydrateTournamentsFromIndexedDB()` to hydrate newer picks, matches, and phase transitions from IndexedDB in addition to battle replay logs.

---

## [v1.1.1] — 2026-09-18

### Fixed
- **Prediction Selection Glow Not Appearing** — Clicking a prediction pick (Champion contender, Group Winner, Match Pick'em row, or Top Cut bracket slot) now immediately highlights the selected card with gold border and `✓ PICK` badge. Previously the UI scored the pick on the leaderboard but never visually marked the selection.
- **Cloud Picks Not Showing on Load** — Picks stored in Cloudflare KV from another device or session are now hydrated back into `localStorage` when the Prediction Leaderboard loads, so prior predictions show as selected without requiring a re-pick.
- **Cross-Device Pick Selection Sync** — `savedPick()` now falls back to `predictionScoresCache` when `localStorage` is empty, so signed-in coaches see their cloud picks reflected on any device or browser.
- **Tournament ID Mismatch on Prediction Save** — Prediction save handlers now receive the explicit tournament ID from the caller rather than relying on `ongoingT()`, eliminating the risk of picks being saved or read under the wrong tournament's key when multiple tournaments exist.

---

## [v1.1.0] — 2026-09-15

### Fixed
- **Draft Start Stutter** — Clicking ▶️ Start Draft no longer flickers between "Draft Pending" and the live draft screen. Background cloud sync polls returning stale `pending` status are now suppressed for 15 seconds after the organizer starts the draft.
- **Draft Order Resetting** — Reordering coaches in the Draft Order Editor no longer gets reset to alphabetical order every few seconds by background cloud sync. Order edits are now staged in a local buffer and fully isolated from background sync while the modal is open.
- **Genuine Remote Pick Ingestion** — Despite the sync protections above, legitimate draft picks made by other coaches on their own devices are still accepted and rendered in real time.
- **Discord Draft Duplicate Announcements** — Duplicate draft pick announcements that were firing on reconnect/delay have been suppressed.

### Added
- **Instant Draft State Cloud Sync** — Draft status changes (start/pause/resume/order save) are now immediately pushed to Cloudflare KV via a lightweight fast-path endpoint, cutting propagation lag from ~2–5 seconds down to under 50ms.
- **Draft Pending Pick Guard** — Coaches can no longer submit official draft picks before the tournament organizer presses Start Draft. The confirmation modal now shows a clear "⏳ Draft Not Started" notice and disables the pick button in pending status.
- **Draft Pending HUD** — The On-The-Clock card in the Draft Room now shows "⏳ DRAFT PENDING START" during pending status instead of incorrectly showing "YOU ARE ON THE CLOCK!" before the draft has started.

---

## [v1.0.0] — 2026-09-14

Initial full release of the Bellimaka Pokémon Draft League site.

### Core League Platform

- **Home Dashboard** — Live season overview with tournament progress bar, draft progress tracker, recent match results, and current standings snapshot. Switches to an Offseason view (season archive, previous champions, all-time stats) when no tournament is active.
- **Multi-Tournament Support** — Create and manage multiple tournament seasons. Each tournament is independently tracked with its own phases, players, rosters, matches, and results. Previous seasons are archived and browsable.
- **Cloudflare Workers Backend** — All league data is stored and synced in real time via a Cloudflare Workers + KV backend. Zero database egress costs, ~2s live sync polling, and < 50ms edge write latency.
- **Accounts & Auth System** — Moderator / coach role system. Coaches log in via a Cloudflare-authenticated account. Moderators have access to all management controls. Regular coaches see a read-only view unless editing their own profile.
- **Sandbox Mode** — Moderators can toggle a sandbox mode (purple status dot) that disables all cloud sync and Discord announcements, allowing safe testing and data editing without affecting live state.

---

### Draft System

- **Live Draft Room** — Real-time Pokémon drafting with a live on-the-clock system, snake order support, pick confirmation modal, and automatic turn advancement.
- **Draft Board (CSV Import)** — Import a draft board from CSV (e.g. a Google Sheets export). Pokémon are organized into cost tiers and displayed as a pick grid.
- **Draft Status Controls** — Moderator controls to Start, Pause, and Resume the draft with live status broadcast to all connected coaches.
- **Draft Order Editor** — Set and rearrange the snake draft order via a drag-and-drop / button-based modal. Supports randomize, move to top, move to bottom, move up/down, and direct slot selection.
- **Undo Last Pick** — Moderators can undo the most recent draft pick, restoring the previous state and broadcasting the undo to all connected coaches.
- **Point Budget System** — Each coach has a configurable point budget (default 100). The draft board tracks remaining budget in real time and prevents picks that would exceed the budget.
- **Real-Time Sync** — Draft picks, status changes, and undo events are broadcast to all connected clients within 2 seconds via Cloudflare KV polling. No page reload required.
- **Mobile Wake Lock** — The Draft Room requests a screen wake lock on mobile devices so coaches' screens don't sleep mid-draft.
- **Draft Pick Discord Announcements** — Each official draft pick automatically posts an announcement to a configured Discord webhook channel, including the picked Pokémon's sprite, cost, coach name, and next coach on the clock.

---

### Match & Score System

- **Match Schedule (Group / Swiss)** — Supports both Group Stage (round-robin within groups) and Swiss Stage formats. Matches are auto-generated based on the tournament format and number of players/groups.
- **Score Entry** — Moderators can enter match scores directly on the Matches tab. Scores are saved and synced to the cloud on submit.
- **Showdown Replay Parser** — Paste a Pokémon Showdown replay URL or log text to auto-parse match results, KOs, damage dealt, Pokémon used, and survivorship statistics. Replays are stored per match.
- **Match Score Discord Announcements** — When a score is saved, an embed is automatically posted to Discord with winner, loser, score, and Pokémon used.
- **Top Cut Playoffs** — Automatic generation of a top-cut bracket (supports 4/6/8-team cuts). Winners and losers bracket support via the brackets-manager library. Bracket results update automatically as scores are entered.

---

### Standings & Records

- **Live Standings** — Win/loss standings with customizable group filtering, W-L-D record display, tiebreaker sorting, and visual safe/elimination/hunt zone indicators.
- **All-Time Records** — Per-player career records, win streaks, max win streak tracking, and tournament finish history.
- **Team of the Season (TOTS)** — Auto-calculated award at season end: Season MVP, Finals MVP, 1st/2nd/3rd All-League Teams, Top Damage Dealer, and other major awards, all driven by Showdown replay parse data.
- **Player Profiles** — Per-coach profile with champion count, top-cut appearances, career record, current roster, team history across previous seasons, and profile picture / team cover art.

---

### Predictions & Playoff Odds

- **Predictions (Pick'em)** — Coaches can predict match winners before results are entered. Both a classic versus-card format and a compact grid format are available. Predictions lock after scores are submitted.
- **Prediction Leaderboard** — Tracks cumulative correct predictions per coach across the season.
- **Playoff Odds** — Monte Carlo simulation (2,000 runs) calculates each coach's projected probability of making the top cut, winning the championship, and finishing in each placement. Updates after every match result.

---

### Teams & Rosters

- **Teams Tab** — Displays all coaches' teams with team name, cover art, roster, and record. Clickable to view a full roster detail view.
- **Team Cover Art** — Moderators can upload custom cover images per coach. Images are compressed and stored in Cloudflare KV, served via CDN.
- **Player Profile Pictures** — Per-coach avatar images, separate from team covers.
- **Pokémon Sprite System** — Sprites pulled from Pokémon Showdown's CDN. Supports Home sprites (default), Gen 5 animated BW sprites, and animated GIF sprites where available. Sprite style is a user-settable preference.
- **Draft Roster View** — Within a tournament's detail page, a dedicated "Draft" tab shows all coaches' drafted rosters with sprites, pick order, and cost breakdowns.

---

### Tournaments Archive

- **Tournaments Tab** — Browse all seasons in chronological order. View completed and ongoing tournaments with their champions, dates, and format.
- **Tournament Detail View** — Deep-dive into any tournament with tabbed sub-views: Standings, Teams, Draft Rosters, Matches, Top Cut, and Predictions.
- **OVR Ratings** — Each coach has an auto-calculated OVR (Overall Rating) score based on win rates, playoff finishes, and performance metrics, calculated both for the current season and historically per tournament.

---

### Discord Integration

- **Webhook Configuration** — Moderators can configure up to two Discord webhooks (main + backup) per tournament, stored securely in Cloudflare KV.
- **Draft Pick Announcements** — Auto-posted to Discord on every official pick during a live draft.
- **Match Score Announcements** — Auto-posted to Discord when scores are saved.
- **Announce Next Draft embed** — Moderators can post a formatted "Draft Starting Soon" countdown announcement to Discord.

---

### Admin & Moderation Tools

- **Moderator Panel** — Moderator-only controls accessible from the top bar: create tournaments, edit scores, manage rosters, upload media, configure Discord, and toggle sandbox mode.
- **Bandwidth & Egress Breakdown** — A detailed breakdown modal showing estimated data transfer from Cloudflare Workers, KV reads/writes, image uploads, and sprite CDN usage. Includes live allowance tracking against the Cloudflare free tier.
- **Drag-and-Drop Group Placement** — During group stage, moderators can drag and drop coaches into groups via a visual interface.
- **Drag-and-Drop Standings Rank Override** — Moderators can manually override standings rank positions by dragging rows within the standings editor.