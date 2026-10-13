# Bellimaka League — Changelog

All notable changes to the Bellimaka Pokémon Draft League platform are documented here.
Format: `v[MAJOR].[MINOR].[PATCH]` — Major = major system overhauls, Minor = new features, Patch = bug fixes and visual improvements.

## [v3.1.0] — 2026-10-12

### League Phase Competitive Format (Random No-Rematch Single-Table Stage)
- **New Stage 1 Competitive Format (`league_phase`)**:
  - Added **League Phase (Random No-Rematch)** (`stage1Format === 'league_phase'`) to the Tournament Creator alongside Round Robin Groups and Swiss System.
  - Combines a unified single-table League Phase standings board with round-by-round progression (`t.swissRounds`, default 4 rounds, max $N - 1$ for even player counts or $N$ for odd player counts).
  - Full-field active pool: every coach competes in every round through the final round, with the Top $K$ (`t.swissCut`) advancing to the Championship Top Cut bracket.
- **Lookahead Random No-Rematch Pairing Engine (`generateLeaguePhaseRound`)**:
  - Pairs coaches completely at random each round (independent of W-L record) while strictly guaranteeing **zero rematches** across the entire League Phase.
  - Uses Minimum Remaining Values (MRV) graph matching (`findSingleRandomMatchingNoRematch`) combined with multi-round lookahead verification (`canExtendLeagueRounds`) so early random rounds never trap later rounds in an un-matchable graph cycle (such as 4-cycles in $K_6$ when running up to $N - 1$ rounds).
  - For odd player counts, automatically assigns at most one random `BYE` (2–0 win) per coach across the stage before verifying the remaining pool can complete all future rounds without rematches.
  - Supports round-by-round unlocking (`🎲 Pair Round N`), live re-drawing of unstarted rounds (`🎲 Re-pair Round N`), and transition to Top Cut (`🏆 End League Phase & Start Playoffs`) once all configured rounds are complete.
- **Customizable Tiebreakers & 2-Column Split Standings**:
  - Uses the customizable standings tiebreaker engine (`getStand` + `getStandingsCriteria`) with full access to the `⚖️ Ranking criteria` editor on the Standings view (`W-L`, `H2H`, `GD`, `GW`, `SOS`, `FR`, `Overdraft`).
  - Displays on the 2-column desktop split board (`LEAGUE PHASE ADVANCERS` vs `THE HUNT` / `FINAL PLACEMENT`) and integrates with mathematical clinch/elimination solvers (`isMathematicallyClinched`, `isMathematicallyEliminated`) and Monte Carlo Playoff Odds (`simulateTournamentOdds`).
- **Popup Text-Selection Drag Dismissal Protection**:
  - Added capture-phase `mousedown`/`mouseup` (and `touchstart`/`touchend`) target verification on `.modal-wrap` backdrop clicks so dragging to highlight text inside an `<input>` or `<textarea>` and releasing the mouse button outside the popup window never accidentally dismisses the modal.
- **Two-Phase Playoff Race & Championship Bracket Predictor Overhaul (`playoffOdds`)**:
  - **Balanced Pre-Tournament Parity & Live Form Takeover (`getPlayerTournamentPower`, `computeCalibratedMatchWinProb`)**:
    - Removed double-counting between career OVR and raw Elo in `getPlayerTournamentPower` and recalibrated baseline power (`1000 + (ovr - 76) * 4.2`, logistic scale `160`, head-to-head match cap `18%–82%`).
    - Pre-tournament (`0–0`) head-to-head edges now sit in a realistic `~36%–64%` competitive range so top seeds start around `~45%–52%` Top Cut in a 12-player field instead of `~90%` before a single match is played.
    - Weighted live tournament performance heavily (`(w - l) * 52 + (gw - gl) * 18` in Stage 1 and `tcWins * 28` in Top Cut) so actual wins, losses, and game differential rapidly overtake pre-tournament priors once matches begin.
  - **Phase 1: Opening Stage Playoff Odds & Qualification Predictor**:
    - Dedicated exclusively to **Top Cut Qualification & Seeding** during Round Robin Groups, Swiss Stage, and League Phase (saving Grand Finals % and Championship % for Phase 2).
    - Displays **Top Cut Qualification Probability** (`topCutDisplay`), **#1 Seed Odds** (`firstSeedPct%`), **Projected Final Record** (`projWins–projLosses`), **Average Finish Seed** (`#${avgSeed}`), **Conditional Next-Match Swing** (`If Win / Lose Next`), and **Schedule & Remaining SOS**.
    - Organizes contenders into clear Playoff Picture Tiers (`🛡️ Inside Playoff Cutline`, `⚔️ On The Bubble & In The Hunt`, `🎲 Longshots & Eliminated`) with group filter tabs (`All Groups`, `Group A`, `Group B`, ...) and a live **🔥 Playoff Picture & Exact Clinch Scenarios** spotlight panel.
  - **Mathematically Verified Playoff Scenario Solver (`solveExactCoachPlayoffScenario`, `computeCoachPlayoffScenario`)**:
    - Evaluates all combinatorial score branches (`2-0`, `2-1`, `1-2`, `0-2`) in the final rounds directly against the tournament's official tiebreaker hierarchy (`evaluateStandingsForMatches` / `getStandingsCriteria(t)`).
    - Distinguishes exact scenarios without misleading coaches: `✓ Clinched Top Cut`, `⚡ Win or Go Home`, `⚡ Do or Die (2-0)`, `🔥 Win and In`, `🔥 2-0 Clinches`, `🔥 Controls Destiny`, `⚡ Must Win Out`, `⚠️ Must-Win + Help`, `⏳ Awaiting Results` (in the clubhouse), and `✗ Eliminated`.
  - **Phase 2: Live Top Cut Championship Bracket Predictor (`simulateTopCutBracketOdds`)**:
    - Automatically activates when the tournament advances to `Top Cut` (`t.phase === 'topcut'`), with a header switcher to toggle back to the Phase 1 Opening Stage Playoff Race archive at any time.
    - Runs 2,500 Monte Carlo simulations directly from the live `getTournamentTopCutModel(t)` bracket state across Single Elimination and Double Elimination (Upper Bracket, Lower Bracket, Grand Finals Set 1, and the Double-Elimination Bracket Reset `gf2`).
    - Ranks Top Cut qualifiers on Contender Cards by **Championship Title Equity (`champPct%`)** and **Grand Finals Equity (`finalsPct%`)**, displaying live Bracket Life status (`2 Lives (Upper)`, `1 Life (Lower)`, `Grand Finalist`, `Champion`, or `Eliminated`), next opponent + head-to-head win probability, and exact path to the title.

---

## [v3.0.1] — 2026-10-12

### Replay Parser `Ally Switch` (`|swap|`) Slot Tracking & Stat Attribution Fix
- **Active Field Slot Swapping (`|swap|`)**:
  - Fixed a bug in `parseShowdownBattleLog` where Pokémon Showdown `|swap|<slot>: <nickname>|<posIndex>|[from] move: Ally Switch` events were ignored, leaving `activeSlots` mapped to the pre-swap field slots (`p1a`/`p1b` or `p2a`/`p2b`).
  - Added a dedicated `cmd === 'swap'` handler that swaps `activeSlots[fromSlot]` and `activeSlots[toSlot]` (mapping position indices `0 ➔ 'a'`, `1 ➔ 'b'`, `2 ➔ 'c'`) and updates `lastAttackerSlot` so all subsequent moves, KOs, damage dealt, damage taken, healing, and support points are attributed to the actual Pokémon occupying that slot.
  - Also resolved secondary percentage-HP `damageDealt` drift on opposing attackers caused by `target.curHp` and `target.maxHp` being read from the unswapped ally's HP state.
- **Readable Battle Log Rendering**:
  - Added a `cmd === 'swap'` handler in `formatBattleLogHtml` to display `🔄 <Pokémon> swapped positions with its ally!` in the formatted battle log viewer.
- **Automatic Cache Invalidation & Backup Re-Parsing**:
  - Bumped replay parser `stats.version` to `12` and `_cachedMonStatsVersion` to `16` across all hydration, modal, awards, and persistence pipelines, and synchronized `t.topCutReplays` with `t.bracketManagerData.match[i].replays`.
  - Re-parsed all 20 affected `|swap|` replays in `league_backup.json` to `version: 12` (e.g. in Cagliari Regional `tc_6` Game 1, Ceruledge now properly receives its `Ally Switch`, `Bitter Blade`, `Light Screen`, `Destiny Bond`, 54 HP healed, and KO on Hisuian Lilligant, while Diancie receives its `Trick Room`, `Diamond Storm`, and `Play Rough`).
- **UI Text & Header Decluttering**:
  - Removed `"Minimum 5 appearances"` subtitle from the Offseason Home Page Team of the Season preview and cleaned up the empty-state copy.
  - Removed the `"👑 Moderator Mode: Click on any drafted Pokémon cell below to swap it for an undrafted Pokémon on the board or adjust a coach's roster."` banner from the Draft Board view.
  - Removed the inline parenthetical explanations (e.g. `— Top tournament-wide performers by Average Impact`) next to All-Tournament team headers (`First Team All-Tournament`, `Second Team All-Tournament`, `Third Team All-Tournament`).
- **Standings Row Background & Legacy `teamCovers` Storage Cleanup**:
  - Updated Standings row background (`bannerArt = pfpArt || coverArt`), Tournament Progression row banners, and Draft Stage Hero Spotlight cards to prioritize `profilePictures[p]` so updated coach profile pictures display immediately everywhere.
  - Migrated any remaining legacy `teamCovers` entries into `profilePictures` and purged `teamCovers` (`draftdex-teamcovers` in `localStorage` and `teamCovers` in Cloudflare KV `/api/state?id=media`), eliminating ~756 KB of duplicate/stale base64 images from both browser `localStorage` and cloud storage.

---

## [v3.0.0] — 2026-10-12

### Bellimaka v3.0 Feature Suite — Draft Automation, Team Planner & Profile History
- **Scheduled Draft Timer & Overnight Active Window Engine**:
  - Configurable draft clock (`draftTimerEnabled`, `draftTimerMinutes`, `activeStart`, `activeEnd`) configurable during tournament creation and live via the new **⚙️ Timer & Settings** modal.
  - Multi-day active window tracking (`calculateActiveMsBetween`) accurately credits clock time while automatically pausing overnight (e.g. 10:00 PM to 9:00 AM) without eating into coach time limits.
  - Dynamic countdown HUD badge in the draft room header displaying running time, `⏸️ Paused (Resumes at 09:00)`, or `⏸️ Timer Paused (By Director)`.
  - **Moderator Manual Timer Pause & Resume**: Added dedicated `⏸️ Pause Timer` / `▶️ Resume Timer` button in the draft room moderator action bar and Settings modal (`toggleDraftTimerPause`). Directors can freeze the pick clock indefinitely while keeping the draft room interactive, resuming from the exact remaining millisecond via Supabase realtime broadcast.
  - **Expanded Timer Lengths**: Added **1 minute** (blitz mode & testing) and **6 hours** (asynchronous league drafts) options to the tournament creator and draft room settings presets.
  - Automated timeout resolution (`autoPickLowestAvailableMon`): on timer expiry, randomly drafts a legal Pokémon from the lowest available point cost tier among affordable options with badge `⏰ Auto-picked on timeout`.
- **Coach Draft Bank (1-Slot Reserve Queue)**:
  - 1-slot reserve queue (`t.draftData.bank = { [coach]: { pokemon, cost, setAt } }`) allowing coaches to queue up their next pick ahead of time.
  - **Right-Hand Panel Integration**: Integrated the Coach Draft Bank widget into the persistent right-hand Team Planner panel (`#teamBuilder`), placing the coach's active banked slot directly alongside their team plans and tabs rather than consuming vertical board space.
  - Quick `"🏦 Bank"` actions on draft board cards and pick confirmation modals, with active reserve status and one-click clear controls.
  - Automated turn trigger (`checkAndExecuteDraftBank`): drafts reserved Pokémon the instant the coach is on the clock, chained cleanly across consecutive banked turns.
  - Discord webhook pick announcements include distinctive badges and mentions for `🏦 Banked` and `⏰ Timeout` auto-picks.
- **Cross-Device Team Planner Cloud Sync**:
  - Cloudflare Worker KV integration via `/api/user/planner` endpoints (`GET` and `POST`) syncing planner plans to user accounts (`user:${username}`).
  - **Mobile Auto-Adoption & Cache-Busting**: When coaches open the planner on a secondary device (e.g. mobile Safari on phone), the planner automatically adopts cloud plans from PC even if local blank slate timestamps are newer (`!localHasTeams || remoteIsNewer`).
  - **Foreground & Wake Triggers**: `handleAppForeground` automatically triggers `pullRemoteTeams(true)` whenever the mobile browser wakes up, switches visibility (`visibilitychange`), or regains focus (`pageshow`). Added cache-busting timestamps (`_t`) and `Cache-Control: no-cache` headers to prevent iOS Safari from caching empty responses.
  - **Manual 🔄 Sync Button**: Added a dedicated one-tap `🔄 Sync` button in both empty and active planner footers for instant manual synchronization.
- **Drag & Drop Team Planner Reordering**:
  - HTML5 drag and drop (`handlePlannerDragStart`, `handlePlannerDrop`) and mobile touch event handlers (`handlePlannerTouchMove`, `handlePlannerTouchEnd`) on `.tm-item` rows.
  - Real-time reordering persists to storage and syncs across devices.
- **Team Planner "Current" Drafted Roster & Auto-Seeding**:
  - Pinned `[🛡️ Current (N)]` chip in the planner header displaying the coach's live official tournament drafted roster, points spent, and remaining budget.
  - Auto-seeding: All newly created plans (`quickCreateTeam`, `createTeam`, `createPlanFromCurrent`) automatically initialize with the coach's current drafted roster.
- **Player Profile Tournament Match History**:
  - Integrated round-by-round match history stacked directly beneath tournament rosters in `pastTournaments(p)`.
  - **Strict Reverse Chronological Order & Top Cut Priority**: Matches display in descending chronological order (most recent on top). In all tournaments (including Cagliari Regional), Top Cut playoff fixtures (`isTopCut: true`) strictly precede Group Stage matches, preventing re-uploaded or late-imported group stage replays from floating above playoffs. Within Top Cut and Group Stage, matches are ordered from Grand Finals down to Round 1.
  - Displays tournament stage/round, opponent avatar with OVR rating, match game score, outcome status badge (`WIN` / `LOSS`), and direct Showdown replay links.
- **Standings Overdraft Penalty Tiebreaker**:
  - Added `overdraft` (`PEN`) metric to `STANDING_METRICS` for ranking coaches with the fewest overdraft penalty points.
  - Tournament directors can assign custom coach penalties via the updated **⚠️ Overdraft Penalties & Sanctions** section in `openTiebreakerEditor`.
- **Standardized 0.0 – 100.0 Battle Impact Rating System**:
  - **Calibrated 0.0 to 100.0 Scale**: Reworked Impact Scores into an intuitive, standardized rating scale from `0.0` to `100.0` with precision to the tenths decimal place (e.g. `94.4`, `86.5`, `85.7`, `74.1`).
  - **Cumulative Average Raw Performance Evaluation**:
    - Addressed the early 100-cap penalty where volatile carry monsters (e.g. Mega Swampert delivering 800–1,000+ raw points in monster games) had their excess carry value wiped out by per-game 100 caps, pulling their average below low-variance utility mons on an off-game.
    - Tournament-wide `avgImpactScore` now evaluates the Pokémon's overall average raw performance per game (`avgRaw = rawScoreTotal / games` mapped through `rawToImpactScore(avgRaw)`), fully crediting massive carry games while maintaining 100.0 bounds.
  - **Calibrated Power Curve** (`rawToImpactScore`, baseline = `750`, power = `0.38`):
    - `85.0 – 100.0` (🔷 **Blue**): Masterclass / Carry (Superstar performers, tournament MVPs, and dominant sweeps; e.g. Mega Charizard Y reaches `94.4`, Mega Eelektross reaches `86.5`, and Mega Swampert reaches `85.7`, decisively above steady utility performers like Hisuian Zoroark at `74.1`).
    - `70.0 – 84.9` (🟢 **Green**): High Impact (Consistent tournament contributors and 2nd/3rd Team All-Tournament performers averaging in the 71–83 range).
    - `51.0 – 69.9` (🟠 **Orange**): Solid Contribution (Standard positive trades, chip damage & positioning).
    - `0.0 – 50.9` (🔴 **Red**): Low battle presence / early faint / sacrificed lead.
  - **Color-Coded Weights & Tight Conforming MVP Yellow Contour**:
    - Impact ratings across replay tables, Match MVP cards, All-Tournament teams, primetime matchups, and roster sheets are color-coded into the 4 tiers (Blue, Green, Orange, Red).
    - Retired the lightning bolt `⚡` for squad side MVPs in favor of a crisp, tight 1–3px yellow radiant contour shadow (`text-shadow: 0 0 1.5px #ffd166, 0 0 3px rgba(255, 209, 102, 0.65)`) hugging the exact glyph outline of the numbers without blurry background bleed.
  - **Clean Labels & Percentage Cleanup**:
    - Removed extraneous `%` from `Dmg/g` across All-Tournament team breakdown subtitles (now displays cleanly as `1.4 KOs/g • 366 Dmg/g • 37 Supp/g`).
    - Updated All-Tournament Team cards to display `"Average Impact per Game"` instead of `"Avg Impact / 10"`.
    - Removed redundant `"/ 10"` and `"/ 100"` suffixes from team roster sheets, MVP cards, and replay tooltips as the 100-point scale is self-explanatory.
  - **Backward Compatibility & Cache Migration**: Pre-existing replays and legacy caches automatically convert onto the 0.0–100.0 scale, and tournament stats cache version was bumped to `15`.
- **Standings 2-Column Split Board for Single-Group & Swiss Stages**:
  - Re-architected standings presentation for single-group and Swiss system tournaments (`renderSingleStageOrSwissStandings`): on desktop, automatically partitions standings across the playoff cutoff line into an elegant 2-column board (`.bcast-groups-grid.two-groups.single-group-split`).
  - **Left Card (Playoff Seeds / Advancers)**: Shows Ranks $1$ to $\text{cut}$ (e.g. `GROUP A ADVANCERS (TOP 4)` or `SWISS PLAYOFF ADVANCERS` with `QUALIFIED FOR TOP CUT` or `TOP N ADVANCE` green/gold badge and trophy icon).
  - **Right Card (The Hunt / Final Placement)**: Shows Ranks $\text{cut} + 1$ to $N$ with `FINAL PLACEMENT` or `THE HUNT` and `ELIMINATED` or `OUTSIDE TOP N` red/amber badge and target icon.
  - **Eliminated Background Image Stretching**: Matches the card width and ~4:1 banner proportions of 2-group tournaments (e.g. Cagliari Regional), completely resolving the extreme 15:1 distorted slit problem on desktop displays while gracefully stacking into single-column cards on mobile (`<= 900px`).
  - Multi-group tournaments (e.g. Cagliari Regional) remain completely untouched in their side-by-side group layout.
- **Tournament Detail Tabs Mobile UI Overflow & Touch-Scroll Fix**:
  - Fixed horizontal overflow on `.tabs` across tournament archive detail views on mobile devices (`max-width: 100% !important; overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; scrollbar-width: none !important`).
  - Added `flex-shrink: 0 !important; white-space: nowrap !important` on tab buttons with compact padding on `< 600px` viewports, ensuring trailing tabs like "Top Cut", "Awards", and "Predictions" are smoothly accessible via touch swiping without breaking page boundaries.

---

## [v2.5.4] — 2026-10-11

### All-Tournament Teams 60% Calculation Engine & Coach Aggregator Fix
- **Lowered Appearance Threshold to 60%**:
  - Adjusted the qualification requirement for All-Tournament Teams and Statistical Leaderboards from 70% to **60% (rounded down, floor of 3 games)** of the coach's total tournament battles: `Math.max(3, Math.floor(coachTotalGames * 0.60))`.
  - Updated all badges, equations, and playbook guide modals across the UI to display `"Min. 60% Games Played"`.
- **Eliminated Single-Pokemon Game Fallback Bug**:
  - Removed the faulty fallback `if((coachGames == null || coachGames === 0) && m.games > 0) coachGames = m.games;` in `calculateTeamOfTheSeason()`, which previously caused unmapped or missing coach queries to self-evaluate Pokémon against their own individual games.
- **Multi-Source Coach Total Games Aggregator**:
  - Implemented `getCoachTournamentGames()` and a pre-pass `coachMaxMonGamesMap` across all drafted and brought Pokémon to establish a mathematically guaranteed lower bound: a coach's tournament games can never be less than the maximum games played by any Pokémon on their roster ($\text{coachTotalGames} \ge \max(\text{monGames})$).
  - Unifies coach battle counts across regular season match fixtures, top cut replays, roster draft mappings, and fuzzy/canonical coach name resolution.
  - Automatically falls back unassigned/neutral Pokémon to the tournament's maximum coach game count (`tournamentRefCoachGames`) rather than individual Pokémon appearances.
- **Immediate One-Click UI Recalculation**:
  - Added a dedicated **🔄 Recalculate Honors** button in the Awards view navigation bar with instant toast notifications, ensuring users can trigger recalculation without needing browser hard refreshes or clearing cache.
- **Accurate Honors Results**:
  - Mega Steelix (5 games), Milotic (5 games), and Gholdengo (3 games) remain properly disqualified ($< 6$ games required under Ozy's 11 games).
  - Mega Tyranitar (10 games $\ge 6$), Sinistcha (8 games $\ge 6$), and Garchomp (7 games $\ge 6$) qualify.
  - Mega Tyranitar holds its Second Team All-Tournament slot, and Mega Crabominable holds the "Most KOs" badge.

---

## [v2.5.3] — 2026-10-11

### All-Tournament Teams & Statistical Leaderboards 70% Appearance Requirement
- **Dynamic 70% Coach Games Requirement**:
  - Replaced the static 5-game requirement for All-Tournament Teams (1st, 2nd, and 3rd Team) and Statistical Leaderboards (Most KOs, Most Damage, Most Tanked, Most Healed, Most Support) with a dynamic requirement: each Pokémon must participate in at least **70% of its coach's total tournament battles** (`Math.floor(coachTotalGames * 0.70)`).
  - Enforced a minimum floor of 3 games (`Math.max(3, Math.floor(coachTotalGames * 0.70))`) to ensure reliable statistical sample size even for short tournament runs.
  - Automatically calculates total games played per coach across all verified replays (regular season + top cut playoffs).
- **Graceful Fallback & Prioritization**:
  - In cases where fewer than 12 Pokémon meet the 70% threshold, backfills remaining slots from the next highest appearance-percentage candidates so all 12 All-Tournament slots and top 3 statistical podiums remain fully populated.
  - Prioritizes qualified 70% performers above backfilled candidates in leaderboard rankings.
- **UI & Guidance Alignment**:
  - Updated awards playbook guide modal and section badges to display `"Min. 70% Games Played"`.

---

## [v2.5.2] — 2026-10-11

### Unified Single-Color Broadcast Branding & Metallic Typography
- **Streamlined Single Team Color System**:
  - Retained the ESPN College Football-style split layout, two-line mascot typography, and battle ribbon ticker while reverting coach branding to a unified primary color setup.
  - Removed secondary color storage, secondary color pickers, and secondary splash backgrounds.
  - Aligned team name headers to a crisp metallic white-to-primary text gradient (`linear-gradient(180deg, #ffffff 0%, #f8fafc 35%, var(--team-name-col2, var(--team-pri, #cbd5e1)) 100%)`).
  - Synchronized match card canvas exporter (`generateMatchCardDataUrl`) with the single primary color system and metallic gradients.

---

## [v2.5.1] — 2026-10-11

### Primetime Matchup Card Typography & Name Formatting
- **Small Prefix Eyebrow Style**: Short articles and prefixes (such as `"THE"`, `"A"`, `"AN"`, `"EL"`, `"LA"`, `"LE"`, `"LOS"`, `"LAS"`, `"ST"`, `"ST."`) now render as a sleek, metallic uppercase eyebrow line (`.primetime-cfb-team-name-prefix`) above the main mascot name rather than taking up a giant split line, keeping names like "The Misters" balanced and punchy.
- **Multilingual & CJK Font Integration**: Added Google Fonts (`ZCOOL KuaiLe`, `Noto Sans SC:wght@700;900`) and system heavy typography (`'Microsoft YaHei'`, `'PingFang SC'`, `'Hiragino Sans GB'`, `'SimHei'`) across all broadcast elements and canvas renderers, ensuring non-English characters (e.g. `"廣州"` in `"廣州 Gibles"`) match the weight and rounded boldness of `Matcha World`.
- **Subtle Proportional Indentation**: Refined the middle indent for two-line names down to a cohesive `clamp(10px, 1.8vw, 16px)` (and `clamp(8px, 1.2vw, 12px)` under prefixes), preventing words from drifting into the center seam.
- **Live Preview & Canvas Alignment**: Synchronized the Broadcast Branding modal (`#bbLivePreview`) and canvas banner exporter (`generateMatchCardDataUrl`) with the prefix rules and CJK font loading for identical live rendering.

---

## [v2.5.0] — 2026-10-11

### Tournament Lifecycle & Match Automation
- **Post-Tournament Most Improved Accolade**: Added a strict tournament completion check (`status === 'COMPLETE'`) to the Most Improved badge algorithm, ensuring it is exclusively awarded once the full tournament concludes rather than triggering off temporary group-stage standings.
- **Dynamic Opening Date for TBD Tournaments**: When a tournament's start date is set to `TBD`, entering the very first match score (in group stage, Swiss, or playoffs) now automatically sets and locks the tournament's official opening date to that day (`YYYY-MM-DD`).
- **Dynamic End Date on Deciding Playoff Match**: If the tournament's end date has not been manually specified (remains `TBD` or blank), entering the deciding match score in the tournament (Grand Finals or Bracket Reset) in `saveTopCutScore()` now automatically assigns the tournament's end date to that match's completion date (`YYYY-MM-DD`). Also safely enforced upon tournament completion in `endTournament()`, and cleanly reverts to `TBD` if the deciding match is ever reset or undone.
- **Anticipation-Building Hat Ceremony (5.0s)**:
  - Overhauled the Live Hat Draw Ceremony with a 4.2-second suspense sequence featuring an accelerating-to-decelerating ticker curve (60ms ➔ 80ms ➔ 120ms ➔ 180ms ➔ 260ms delay ticks) building tension up to the reveal.
  - Added an 0.8-second celebratory reveal pause with a popping card animation before auto-advancing to the next draw (5.0s total cycle).
  - Updated auto-draw control label and cadence to `⚡ Auto-Draw Show (5.0s)`.
- **Match Pick'em Tip-Off Lock**:
  - Individual match predictions now lock immediately for the entire tournament the moment the first match result or score is reported, matching standard pick'em rules and preventing mid-stage prediction tampering.
  - Match cards automatically transition into the locked ballot view upon the tournament's first recorded game.
- **Decluttered Matches Navigation**: Removed the redundant "Arrange groups" button from the Matches view action bar; group configuration remains cleanly accessible on the Standings page.
- **Sugar Land Regional Seeding & Bracket Correction**:
  - Fixed Sugar Land Regional (`t1787348238028`) Top Cut seeding to reflect the authentic bracket format: Ethan (Seed #1), Ozy (Seed #2), Jace (Seed #3), and Dao Ming (Seed #4).
  - Updated bracket match card origins and seed badges to properly display `[1] Ethan vs [2] Ozy` (`Seed #1` vs `Seed #2`) in Upper Semifinal 1 and `[4] Dao Ming vs [3] Jace` (`Seed #4` vs `Seed #3`) in Upper Semifinal 2.
  - Synchronized `customTopCutSeeding` and `topCutCache` in the live Cloudflare database, aligning all career stats, head-to-heads, and tournament archives.
- **Tournament Progression & Rating Alignment**:
  - **Group-Stage Exit Rating Freeze**: Eliminated coaches (such as Kiril and Gavin) who play no playoff matches now retain their group placement bonus (`0.5`) upon tournament conclusion in both `getHistoricalPlayerOVR()` and `calculatePlayerOVR()`, preventing artificial 1-point OVR drops between Group Stage and Final Standings when no matches were played.
  - **Top Cut Clinch Rating at Group Stage**: Updated `histTopCuts` in `getHistoricalPlayerOVR()` at `stage === 'group'` to recognize clinched playoff berths upon group stage conclusion, awarding the Top Cut qualification (+1.5) and consistency bonuses (+0.7) immediately at the Group Stage checkpoint. This restores Ethan's Group Stage rating to his authentic peak of 89 (`88 ➔ 89 ➔ 88`).
  - **Final OVR Progression Evaluation**: Removed the `inTopCut &&` gating in `renderTournamentProgressionTabHtml()`, ensuring `FINAL OVR` is evaluated across all tournament participants upon tournament conclusion so that Progression cards, Player Profiles, and All-Time Standings show unified numbers.
- **Recent Draft Picks Grid Expansion (10 Picks)**: Increased the Live Draft Activity spotlight feed on the home page from 8 to 10 cards (`picks.slice(0, 10)`), cleanly filling out two complete 5-card rows on widescreen displays and eliminating empty trailing gaps.
- **Moderator Quick Test Cup Preset**:
  - Added a one-click `⚡ Quick Test Cup` button on Step 1 of the Tournament Creator (exclusive to moderators) placed right next to the "Basic Info" badge.
  - Automatically preconfigures standard testing defaults in one click without auto-submitting (Name: `Test Cup`, Badge Label: `Test`, Regulation: `Test`, Start Date: `TBD`, Phase 1: `Round Robin`, Phase 2: `Double Elimination`, Groups: `2`, Advance: `2`, Coaches: `All`, Live Draft: `Off`, Cover Art: `None`).
  - Allows moderators to immediately review, adjust any test parameters, and click `+ Create Tournament` when ready.
- **Matcha World Typography Overhaul**:
  - Replaced `Saphifen` across the entire platform with `Matcha World` (`Matcha World.otf` / `Matcha World.ttf`).
  - Updated the font preload tags, CSS font stacks, Primetime CFB matchup broadcast cards, generated canvas match banners, hidden DOM preloader elements, and Broadcast Banner customizer UI.
  - Retained backward-compatible `@font-face` aliases so any legacy or fallback references seamlessly render with `Matcha World`.

### Cloudflare KV Infrastructure & Automatic Maintenance
- **Automated Orphaned KV State Cleanup**: Added a dedicated `/api/tournament/delete` endpoint and integrated a backend safety net inside `POST /api/state` that automatically purges orphaned `draft_state:*`, `predictions:*`, and detached test `replay:*` keys whenever a test tournament is removed from the site.
- **Hardcoded Official Tournament Guardrail**: Permanently protected all four historical official tournaments (Cagliari, Sugar Land, Wilmington, Bentonville), user profiles, discord configurations, and core database records against accidental deletion.

---

## [v2.4.4] — 2026-10-10

### Season Awards & All-Tournament Rework
- **Role-Free All-Tournament Teams**: Retired rigid DPS and Tank divisions in favor of ranking All-Tournament Teams purely by holistic Average Impact per game across the entire tournament.
- **Top 3 Statistical Leaderboards**: Added dedicated podium leaderboards celebrating the top 3 Pokémon across 5 major categories: Most KOs, Most Damage, Most Tanked, Most Healed, and Most Support.
- **Two-View Decluttered Navigation**: Added clean sub-tabs separating **All-Tournament Teams** and **Stat Leaderboards** into dedicated views so each section has room to breathe.
- **Frameless Tier Presentation**: Removed heavy nested container boxes around team tiers in favor of sleek, minimalist header dividers and open card layouts.
- **Full Width Tournament Awards**: Expanded the Season Awards tab layout to span full width, perfectly matching the Top Cut bracket and other tournament tabs.
- **Five Game Qualification Threshold**: Standardized award qualifications to a minimum of 5 games played to ensure sustained excellence across the season.
- **Tier & Rank Card Badging**: Award cards now showcase clear tier and rank badges alongside bold per-game impact numbers and detailed statistical breakdowns.
- **Full Width Tournament Progression**: Expanded the Progression & Accolades tab to full width (`100%`) matching the rest of the tournament archive.
- **Entry Overall (OVR) & 3-Step Progression**: Progression cards now feature the rating coaches entered the tournament with, displaying a clear 3-step evolution (`[ENTRY OVR] ➔ [GROUP OVR] ➔ [FINAL OVR]`) alongside total tournament growth.
- **Enlarged Podium Leaderboard Slots**: Upgraded 2nd (Silver) and 3rd (Bronze) place cards on the Statistical Leaderboards with 40px sprites, larger player & stat typography, and roomier card padding for immediate legibility.
- **Cloudflare KV Write Optimization**: Added intelligent battle replay deduplication so existing replays are never re-uploaded on tournament saves, drastically reducing database write operations.

---

## [v2.4.3] — 2026-10-10

### Replay Box Score Alignment & Dedicated Support Column
- **Perfect Match Impact Alignment**: Moved the MVP lightning bolt indicator to an absolute corner badge so all Impact numbers stay centered and aligned with the column header.
- **Dedicated Support Points Column**: Added a dedicated Support column in match box scores showing the exact utility points earned by each Pokémon, complete with an itemized hover tooltip.
- **Clean Move-Only Recording**: Kept the "Moves Recorded" column strictly for clicked battle moves, removing stat drops and non-move effects from that column.
- **Weather & Field Ability Support**: Weather and terrain abilities (like Drought, Drizzle, and Surges) now award support points for setting up team conditions.

---

## [v2.4.2] — 2026-10-10

### Support & Utility Impact Scoring Overhaul
- **Dedicated Credit for Support Play**: Introduced comprehensive Impact Score recognition for non-damaging utility moves, ensuring dedicated support Pokémon receive proper credit alongside offensive sweepers.
- **Support Action Categories**:
  - *Status Conditions*: Inflicting primary status conditions (Sleep, Burn, Paralysis, Toxic, Poison, Freeze) on opponents.
  - *Speed Control & Team Defense*: Setting Tailwind, Trick Room, Reflect, Light Screen, and Aurora Veil.
  - *Redirection & Protection*: Redirecting attacks (Follow Me, Rage Powder, Ally Switch) and team-wide shielding (Wide Guard, Quick Guard).
  - *Stat Disruption & Entry Abilities*: Weakening opponents via Intimidate, Speed drops, and stat-reducing moves.
  - *Field Control & Entry Hazards*: Setting Hazards (Stealth Rock, Sticky Web, Spikes, Toxic Spikes) and active Weather or Terrain.
- **Diminishing Returns & Anti-Stall Caps**: Support contributions scale with diminishing returns for repeated applications and a sensible per-battle cap, ensuring balanced ratings and preventing endless stall point accumulation.
- **Enriched Box Score Breakdown**:
  - Hovering over a Pokémon's Impact score in the replay box score now reveals an itemized breakdown of exact support points and key actions earned (e.g. `Support: +75 [Tailwind, Burn]`).
  - Active support actions (like Intimidate, Flinches, and Speed Drops) display as distinct purple utility badges alongside recorded moves.
  - The Game MVP showcase card highlights support points and utility contributions for match-defining support performances.
  - Replay box score summaries now track each team's total Support Points alongside KOs, Damage Dealt, and Healing.
- **Coach Team Sheet Utility Recognition**:
  - Pokémon with recorded support contributions feature a distinct purple `Supp` badge on coach team sheets showcasing both total support points and per-game averages.
  - All tournament MVP calculations, Team of the Season honors, and playoff awards automatically incorporate support contributions.

---

## [v2.4.1] — 2026-10-10

### Match Box Score Impact Scoring & Visual Faint Feedback
- **Impact Score Replacement**: Replaced the textual `Status` column in the Match Box Score table (Replay Hub modal) with a dedicated **Impact** metric column highlighted in cyan (`#38bdf8`), scoring each Pokémon's battle performance: `(KOs × 150) + Damage Dealt + Survival Bonus (+75) + (Healed × 0.5)`.
- **Top Performer Lightning Indicator**: The Pokémon with the highest Impact score on each squad is distinguished with a gold `⚡` indicator.
- **Visual Survival & Faint Feedback**:
  - Eliminated bulky faint text from the table in favor of clean visual cues: fainted Pokémon sprites are desaturated and dimmed (`opacity: 0.45`, `grayscale(100%)`), Pokémon names appear in muted slate (`#8e8c95`), and row backgrounds are subtly softened.
  - Survived Pokémon remain at full opacity and vibrant color, highlighting their survival bonus.
  - Hovering over a Pokémon sprite or name displays a precise tooltip showing exact faint timing (e.g. `Fainted Turn 8`) or survival status.
- **Color-Coded Box Score Metric Headers**: Color-coded all match box score table headers and stats to match standard analytics palettes:
  - *Impact*: Cyan (`#38bdf8`)
  - *KOs*: Orange (`#fb923c`)
  - *Dmg Dealt*: Red (`#f87171`)
  - *Dmg Taken*: Slate (`#cbd5e1` / `#94a3b8`)
  - *Healed*: Green (`#4ade80`)

### Coach Team Sheet Impact Metric & Stat Strip Harmony
- **Per-Game Impact Average**: Integrated an **Impact** badge directly into the Pokémon stat strip on coach team sheets (`TeamRosterDetailView`), positioned right after `Apps`: `Impact [avg]/g`.
- **Comprehensive Impact Breakdown**: Hovering over the Impact badge reveals both the per-game average and total career/season impact score accumulated across all tournament appearances.
- **Stat Strip Palette Alignment**: Synchronized stat badge colors across team sheets (`KOs` in orange `#fb923c`, `Taken` in slate `#cbd5e1`) to maintain seamless visual harmony with the box score table.
- **Historical Replay Stat Fallback**: Hardened `getTournamentPokemonStatsMap` with an automatic fallback calculation so legacy replays without stored `impactScore` attributes compute their impact contribution seamlessly into season totals and averages.

### Clean URLs & Top Cut Moderator Event Handling
- **Clean Hash Routing**: Removed percent-encoded URL fragments for top cut and playoff odds pages, upgrading `#Top%20Cut` to `#TopCut` and `#Playoff%20Odds` to `#PlayoffOdds` while preserving seamless backward compatibility for existing bookmarked links.
- **Top Cut Card Moderator Click Isolation**: Resolved a conflict in playoff bracket cards where moderator permissions intercepted clicks across the entire card. Clicking a coach's name or avatar now cleanly opens their player profile without triggering the score modal, while clicking the card header, score capsule, or background opens the score setting dialog.

---

## [v2.4.0] — 2026-10-10

### Instant Site Performance & On-Demand Replay Streaming
- **Ultra-Fast Site Loading**: Decoupled full Pokémon Showdown battle logs from the main league database, reducing initial site loading times by over 70% and eliminating browser storage limits.
- **On-Demand Replay Streaming**: Match replays, battle logs, and detailed box scores now load on demand only when you choose to watch them, keeping the rest of the site lightweight and responsive.
- **Smooth Replay Previews**: Added instant loading animations to the replay hub so you know exactly when a match is loading without any frozen screens.
- **Smart Local Replay Caching**: Replays you watch are automatically saved to your device for instant playback on repeat visits with zero extra data usage.
- **Instant League Records & Awards**: All player career statistics, Team of the Season honors, and tournament awards continue to calculate and display instantly across all seasons.

---

## [v2.3.17] — 2026-10-08

### Playoff Top Cut Bracket Replay Match Isolation
- **Strict Match Identity Isolation**: Fixed an issue where bracket matches between coaches who meet multiple times in a double-elimination tournament (such as Upper Bracket and Lower Bracket / Grand Finals) shared or bled replays.
- **Unplayed Match Safeguards**: Prevented unplayed or unscored bracket matches (`!m.isDone`) from borrowing completed replays or box score links via coach-name fallback scanning.
- **Direct Match ID Precedence**: Updated `getMatchTopCutReplays`, `getMatchTopCutReplayKey`, `findTournamentMatch`, and `getTournamentTopCutModel` so replays are strictly keyed by exact match IDs (`actualMatchId` / `id`), ensuring completed Upper Bracket matches retain their full replay series while upcoming Lower Bracket rematches remain clean with only the add replay action.

### Tournament Creator & Archive Edit Hub Overhaul
- **5-Step Tabbed Tournament Creator**: Redesigned the monolithic "Create Tournament" modal into an intuitive, tabbed multi-step wizard:
  - *1. Details & Dates*: Tournament title, season number, custom badge label, regulation description, and scheduling dates.
  - *2. Format & Rules*: Opening stage architecture (Round Robin groups or Swiss System), playoff top cut formats (Double or Single Elimination), group counts, qualification thresholds, and Swiss pairing pool rules.
  - *3. Coaches & Staff*: Tournament Director moderator permission picker, coach participant checklist with real-time selection counter, and comma-separated new profile generation.
  - *4. Draft Setup*: Live Showdown Draft Room toggle, coach point budgets, roster size round limits, and one-click offseason/custom draft board import status.
  - *5. Cover Artwork*: 16:9 widescreen showcase banner dropzone, interactive crop and framing tool, and live tournament card mockup preview.
  - *Persistent Action Footer*: Seamless `← Back`, `Step X of 5`, `Next →`, and constant `+ Create Tournament` action across all tabs with automatic validation tab-jumping if participants are missing.
- **Categorized 2-Column Edit Tournament Hub**: Replaced the cluttered vertical wall of 10 generic buttons with a modern, categorized visual cards dashboard:
  - *Tournament & Media*: Tournament Details & Director permissions, 16:9 Showcase Cover Image & Banner, and Resync Stats & Records (for completed seasons).
  - *Rosters & Brackets*: Players & Teams manager, Arrange & Draw Groups (with playoff lock indicators), Qualification Cutoff line, and Tiebreakers & Columns criteria.
  - *Draft Engine*: Draft Board & Pool importer, Snake Order & Sequence, and Pokémon Point Costs editor.
  - *Responsive Mobile Behavior*: Automatically stacks into a clean 1-column mobile card view on small viewports with custom scrollbars.

### Mobile Team Sheet Responsiveness & Navigation Cleanup
- **Mobile Team Sheet Card Auto-Fitting**: Redesigned mobile team sheet Pokémon cards with a compact horizontal layout (scaled sprites, streamlined gaps, and wrapping stat badges) so draft point costs remain fully visible on screen without horizontal clipping.
- **Compact Empty Slot Alignment**: Balanced empty roster slots on mobile with proportional sizing and icons to match filled roster entries.
- **Streamlined Navigation & Modal Cleanups**:
  - Removed the redundant bottom "All Coaches" return button from team sheets on both mobile and desktop, keeping navigation centered on the top back button.
  - Removed the redundant "Back to League" button at the bottom of player profile modals to reduce modal scroll clutter.
  - Removed the duplicate top-right "Download .html" button in the replay viewer modal header, keeping the dedicated red replay download button in the footer.

---

## [v2.3.16] — 2026-10-06

### Discord Match Card Typography & High-Visibility Score Pill
- **Single-Line Team Titles**: Streamlined team names on Discord match announcement cards into a single, bold line to fill the center broadcast area with clean, balanced spacing.
- **Smart Title Auto-Fitting**: Configured dynamic font scaling so exceptionally long team names automatically resize to fit comfortably without crowding coach avatars.
- **Enlarged High-Visibility Score Pill**: Expanded the center score pill into a significantly larger capsule with bold, high-contrast numbers for effortless reading at smaller Discord preview sizes.
- **Reliable Broadcast Font Preloading**: Ensured custom athletic brush typography (*Saphifen*) reliably renders across all tabs and match completion contexts with proactive font-face preloading and memory-cached drawing safeguards.
- **Universal Romanization Fallback on Match Cards**: Integrated site-wide text normalization for Discord match cards, converting accented international letters to standard Roman characters (e.g. *HA NOI HOOTHOOTS*) and stripping punctuation so every letter renders seamlessly in the custom athletic brush font without awkward system font glyph substitutions.
- **Clean Record Badges & Subtitle Encoding**: Standardized win-loss records on avatar badges and sanitized match stage headers to eliminate encoding artifacts and ensure crisp bullet separators.

### Playoff Prediction Leaderboard Synchronization
- **Dynamic Playoff Score Tracking**: Ensured the prediction leaderboard immediately updates and recalculates as tournament playoff matches conclude, eliminating stale standings and keeping points fully aligned between personal prediction ballots and public rankings.
- **Universal Bracket Match Recognition**: Enhanced tournament bracket prediction matching to reliably recognize and award points for playoff series regardless of internal bracket separators or match numbering formats.
- **Unified Ballot Consolidation**: Synchronized pick deduplication so all picks submitted under linked player profiles and usernames combine seamlessly into one accurate leaderboard total.
- **Dynamic Prediction Accolades & Badges**: Rebuilt the Hall of Fame badge evaluation engine to dynamically score tournament prediction standings in real time, ensuring tournament honors like Prediction King seamlessly follow live playoff points and align with all-time career records.

---

## [v2.3.15] — 2026-10-06

### Interactive Discord Message & Embed Preview Modal
- **Live Discord Announcer Simulation**: Added an in-app Discord preview popup when testing webhooks, allowing organizers to visually verify exactly how announcements and cards will appear in chat before broadcasting.
- **Interactive Match Result Simulator**:
  - Generates the high-resolution broadcast match card in real time, featuring the metallic gold frame, bold score pill, team typography, winner glow, and defeat fade.
  - Added one-click scenario toggles to simulate home wins, away wins, ties, and regular season versus playoff layouts instantly.
- **Live Draft Pick Simulator**: Previews draft room announcements with Pokémon sprites, costs, pick numbers, remaining budget, and coach mention highlights.
- **Direct Test Delivery**: Added an instant test broadcast button inside the preview dialog that delivers a sample message directly to Discord while preserving any unsaved settings in the configuration form.

---

## [v2.3.14] — 2026-10-06

### Broadcast-Grade Discord Match Result Graphics
- **Primetime-Matched Discord Cards**: Redesigned Discord match announcement images into high-resolution broadcast cards that mirror the website's marquee match spotlight design.
- **Dynamic Defeat Fadeout**: Defeated teams are automatically dimmed and desaturated on the announcement card, providing clear visual contrast against the vibrant, glowing winning team.
- **Radiant Metallic Gold Frame**: Framed announcement cards with a multi-tone metallic gold border alongside a clean broadcast header showing the tournament stage and final score badge.
- **Curved Record Badges & Center Score Capsule**: Highlighted coach avatars with floating record badges and centered series score numbers for a complete televised sports look.

---

## [v2.3.13] — 2026-10-06

### Continuous Radiant Gold Border & Header Cleanup
- **Continuous Metallic Gold Border**: Upgraded match spotlight cards with a vibrant, uninterrupted metallic gold border that remains crisp and visible against dark backgrounds.
- **Flush Border Contact**: Removed inner dark outlines so team colors and banners meet the gold frame directly with no awkward gaps.
- **Simplified Header Controls**: Removed obsolete cover management buttons from the match header, keeping the banner focused on match information and feature pinning.

---

## [v2.3.12] — 2026-10-06

### Avatar-Curved Record Badges & Cover Aspect Restoration
- **Avatar Curve Record Anchoring**: Attached coach win-loss records directly along the outer curve of coach avatars for a sleek, collegiate sports broadcast aesthetic.
- **Restored Card Proportions**: Adjusted match card heights and spacing so tournament cover artwork displays in its natural, unstretched aspect ratio without vertical distortion.
- **Clean Team Name Spacing**: Refined multi-line team name layouts to provide generous breathing room without colliding with top ribbons or side borders.

---

## [v2.3.11] — 2026-10-06

### Record Typography & Card Spacing Polish
- **Collegiate Number Styling**: Upgraded win-loss record text to an athletic condensed font with clean spacing, eliminating any text clipping on tall numbers or parentheses.
- **Vertical Breathing Room**: Increased card padding to ensure team names and record lines stay well clear of outer hashtag ribbons.

---

## [v2.3.10] — 2026-10-06

### Streamlined Matchup Cards & Record Lines
- **De-Cluttered Broadcast Layout**: Removed redundant rating pills and tags from spotlight match cards to create a cleaner, bolder presentation.
- **High-Contrast Record Text**: Styled season records in glowing gold with deep drop shadows for clear readability on both light and dark team backgrounds.
- **Inward Diagonal Alignment**: Positioned team names and records along a balanced diagonal stair-step matching the card's athletic slant.

---

## [v2.3.9] — 2026-10-06

### Balanced Team Name Typography
- **Equal Line Prominence**: Balanced city/prefix and mascot text sizes so both lines of a team's name have bold, unified visual weight.
- **Balanced Diagonal Stagger**: Aligned multi-line titles with the natural slant of the card for a cohesive, professional broadcast look.

---

## [v2.3.8] — 2026-10-06

### League Logo Alignment & Smooth Loading
- **Standardized Header Branding**: Assigned the official league badge across desktop navigation and the mobile drawer menu.
- **Browser Tab Icons**: Updated browser tab icons with transparent, high-resolution artwork and cache-busting updates.
- **Persistent Spectator Mode**: Ensured spectator and player modes remain active across page refreshes without unexpectedly re-enabling moderator controls.
- **Instant Account Screen Loading**: Account views now display immediately on page refresh without momentary login form flickers.

---

## [v2.3.7] — 2026-10-06

### Reliable Cloud Sync & Playoff Progress
- **Authoritative Cloud Synchronization**: Fixed a synchronization issue where stale local browser data could prevent the latest tournament results from displaying on initial visit.
- **Accurate Playoff Progress**: Corrected playoff counter badges and recent results to display up-to-date championship fixtures and completed series counts.
- **Optimized Cloud Data Delivery**: Streamlined data transmission between the cloud and browser to ensure fast loading and prevent network timeout errors.

---

## [v2.3.6] — 2026-10-06

### Resilient Brand Assets & Browser Icons
- **Multi-Format Brand Discovery**: Added comprehensive format support and automatic fallbacks for league logos and browser icons across local and hosted web environments.

---

## [v2.3.5] — 2026-10-06

### Full Team Name Display & Font Expansion
- **Zero Truncation**: Eliminated text truncation and ellipses on long team names so every team's full name is displayed without cutoff.
- **Expanded Character Support**: Enhanced custom sports fonts to fully support numbers, accents, special symbols, and international characters.
- **Clean Hashtag Ribbons**: Refined static hashtag ribbons with star dividers for effortless reading across mobile and desktop.

---

## [v2.3.4] — 2026-10-05

### Broadcast Matchup Visuals & Bracket Progression
- **Vibrant Corner Saturation**: Eliminated dark, murky corner shadows so team colors fill the entire card with rich, uniform saturation.
- **Flush Rectangular Frames**: Removed inner corner roundings so background colors fill cleanly without exposing dark gaps.
- **Clear Winner & Loser Contrast**: Automatically dims the defeated team's card while keeping the winner bright and saturated.
- **Solid Center Divider Line**: Upgraded the horizontal dividing seam to a solid, glowing white line all the way across.
- **Playoff Bracket Progression Guard**: Resolved a bracket progression bug in double-elimination tournaments to prevent any player from erroneously advancing into a match against themselves.

---

## [v2.3.3] — 2026-10-05

### Playoff Replays & Match History Integration
- **Instant Playoff Replays**: Added one-click replay buttons and box score access to playoff matches in the Recent Results section.
- **Seamless Replay Theater Linking**: Linked playoff games directly to the Showdown Replay Hub for video playback, statistical breakdowns, and awards tracking.
- **Stability Safeguards**: Fixed a bracket calculation recursion issue to ensure smooth, instantaneous page rendering during deep playoff stages.

---

## [v2.3.2] — 2026-10-05

### In-Frame Team Emblems & Key Performers Spotlight
- **Fully Contained Team Logos**: Adjusted circular team emblems to remain completely within card boundaries without being cut off at the corners.
- **High-Contrast Overall Rating Badges**: Redesigned player overall rating badges with solid dark backgrounds and gold borders for readability over any team color.
- **Performance-Driven Pokémon Spotlight**: Match cards dynamically showcase each team's top performing Pokémon based on actual tournament knockouts, damage dealt, and impact ratings.

---

## [v2.3.1] — 2026-10-05

### Clean Match Seam & Athletic Splash Textures
- **Seam Bleed Prevention**: Ensured profile photos never cross the center seam line between competing teams.
- **Active Roster Showcase**: Added a central Pokémon showcase strip displaying key team members between team titles and logos.
- **Authentic Sports Grunge Textures**: Integrated subtle diagonal athletic splash overlays and paint splatter details for a stadium broadcast feel.

---

## [v2.3.0] — 2026-10-05

### Marquee Matchup Graphic Overhaul
- **Broadcast Sports Typography**: Integrated distressed athletic lettering for team names and clean condensed lettering for ribbons.
- **Dynamic Team-Colored Ribbons**: Replaced generic black ribbons with vibrant, team-colored banners featuring clean white pinstripe borders.
- **Layered Broadcast Medallions**: Enlarged team emblems with bevel highlights, drop shadows, and subtle ambient glows.
- **Text Normalization**: Added automatic accent and symbol normalization so all team names render smoothly without character gaps.
- **Broadcast Branding Editor**: Added commissioner tools to customize team hashtags and primary colors with auto-extraction from team logos.

---

## [v2.2.9] — 2026-10-05

### Playoff Prediction Bracket Integrity Lock
- **Automatic Lock on Match Start**: The entire playoff prediction bracket now automatically locks as soon as the first live playoff game concludes, preventing edits after results are underway and protecting competitive scoring integrity.
- **Clear Read-Only Indicators**: Locked brackets display informative tooltips and cleanly disable pick buttons.

---

## [v2.2.8] — 2026-10-04

### Ultra-Wide Prediction Ballot & Season Archive
- **Spacious Bracket View**: Expanded prediction ballot popups to comfortably fit all four playoff rounds side-by-side without horizontal scrolling on desktop displays.
- **Regular Season Archive**: Categorized regular season winner picks and match predictions into clean, organized divisions during playoff phases.

---

## [v2.2.7] — 2026-10-04

### Playoff Bracket Card Visual Polish
- **Distinct Section Accents**: Restored distinct colored border accents distinguishing Winners Bracket, Losers Bracket, and Championship matches.
- **Seamless Hover Effects**: Added smooth row highlight lighting without horizontal shifting or border misalignment.

---

## [v2.2.6] — 2026-10-04

### Bracket Visual Refinements
- Streamlined match cards with clean, rounded dark borders and subtle selection glows.

---

## [v2.2.5] — 2026-10-04

### Playoff Bye Auto-Advancement
- Fixed prediction brackets in tournaments with opening byes so players with byes automatically advance to the next round, allowing fans to predict the entire tournament through to the championship.

---

## [v2.2.4] — 2026-10-04

### Playoff Spotlight Prioritization
- Automatically features active and upcoming playoff bracket clashes on the home screen during postseason play instead of past regular season games.

---

## [v2.2.3] — 2026-10-04

### Multi-Way Tiebreaker Resolution
- Enhanced standings tiebreakers so complex 3-way circular ties (where each team beat one of the others) correctly advance to secondary tiebreaker criteria like combat efficiency.

---

## [v2.2.2] — 2026-10-04

### Broadcast Branding Profile Editor
- Added an easy branding editor inside coach profiles to set team hashtags, pick primary colors, and preview live match cards.
- Scaled up coach names and season records for clear visual hierarchy.

---

## [v2.2.1] — 2026-10-04

### Matchup Typography & Stadium Textures
- Hand-drawn athletic lettering for team names, distressed stadium scratch textures, and clean static hashtag banners.

---

## [v2.2.0] — 2026-10-04

### Television Broadcast Matchup Redesign
- Redesigned the marquee match card with stacked team tiers, bold metallic lettering, oversized team emblems, and animated hashtag ribbons.
- Added central series score badges with one-click access to the replay theater.

---

## [v2.1.2] — 2026-10-04

### Combat Faint Ratio Tiebreaker
- Introduced an advanced combat efficiency metric (Total KOs Dealt ÷ Knockouts Taken) across tournament replays to break close ties.
- Added automatic 4-faint forfeit adjustments, undefeated tier handling, and interactive standings columns with detailed tooltips.

---

## [v2.1.1] — 2026-10-04

### Mobile Account Hub Overhaul
- Re-engineered account views on mobile phones with clean two-tier headers, equal-width tabs, balanced 2x2 career stat grids, and zero horizontal screen overflow.

---

## [v2.1.0] — 2026-10-04

### Showdown Replay Viewer & Modernized Playbooks
- Full-width, responsive battle replay theater with zero overlay clutter, turn controls, and game-by-game box scores.
- Universal click-outside and Escape key dismissal across all popup dialogs.
- Modernized league documentation for Overall ratings, Elo matchmaking, coach badges, and season awards.

---

## [v2.0.1] — 2026-10-04

### Mobile Screen Polish
- Clean two-tier action buttons on home cards, zero-scroll mobile leaderboards, and interactive badge popups.

---

## [v2.0.0] — 2026-10-04

### Mobile Navigation Drawer & Responsive Layouts
- Sleek 56px sticky top header on mobile with an animated hamburger menu and frosted-glass navigation drawer.
- Full-width mobile tournament archive cards, responsive 5x2 team roster grids, and touch-friendly horizontal scroll filters for matches and divisions.

---

## [v1.3.0] — 2026-10-04

### Postseason Progression & Accolades Showcase
- Dedicated Progression tab in completed tournament archives featuring TV broadcast cards, prestige medals (1st, 2nd, 3rd, Top Cut), season honors, and rating evolution.

---

## [v1.2.0] — 2026-10-03

### World Cup Broadcast Standings & Primetime Clash
- High-energy broadcast standings cards with dynamic criteria stat cubes, clinch badges, and tiered metallic border glows.
- Futuristic match clash hero banner with floating score hubs, feature pinning, and automatic battle performer showcase.

---

## [v1.1.21] — 2026-10-03

### Replay Attribution & Postseason Awards
- Centralized roster verification ensuring battle replay statistics and tournament awards are accurately credited to the correct team roster.
- Resolved regional form mappings and updated tournament awards to ensure complete games played, knockouts, and MVP impact calculations.

---

## [v1.1.20] — 2026-10-01

### Replay Data Persistence & Cloud Sync
- Enhanced battle replay data storage to ensure combat statistics and appearances persist reliably across browser reloads and cloud updates without data loss.

---

## [v1.1.19] — 2026-09-29

### Prediction Ballot Badges
- Contained prediction status tags cleanly within contender cards to prevent badges from breaking outside dialog boxes.

---

## [v1.1.18] — 2026-09-29

### Full-Width Tournaments Archive
- Expanded the tournament archive to standard full-width layout with a symmetric 3-column card grid across desktop displays.

---

## [v1.1.17] — 2026-09-29

### Division Seed Identifiers
- Updated playoff seed numbering in multi-group tournaments to clearly show division origin (e.g. #1A, #1B, #2A, #2B) instead of ambiguous sequential numbers.

---

## [v1.1.16] — 2026-09-29

### Cross-Group Playoff Seeding
- Structured playoff brackets to systematically pair qualifiers against rivals from the opposite division in opening rounds, preventing early regular season rematches.

---

## [v1.1.15] — 2026-09-28

### Balanced Team Roster Grid
- Restructured Pokémon roster cards into a symmetrical 2-column grid across player profiles and tournament history views.

---

## [v1.1.14] — 2026-09-28

### Schedule-Aware Playoff Clinching & Elimination
- Overhauled standings algorithms to evaluate remaining head-to-head fixtures and full tiebreaker permutations, ensuring accurate Clinched and Eliminated statuses.

---

## [v1.1.13] — 2026-09-28

### Interactive Multi-Metric Column Sorting
- Added bidirectional column header sorting to All-Time Standings and Hall of Fame leaderboards while preserving canonical legacy ranks.

---

## [v1.1.12] — 2026-09-28

### Spacious Prediction Ballot Inspection
- Expanded prediction ballot inspection popups with spacious layouts, focused single-contender showcases, and in-place division filtering.

---

## [v1.1.11] — 2026-09-27

### Form Resolution & Pokédex Typing Accuracy
- Corrected typing assignments and battle form recognition for regional variants across rosters, draft boards, and battle logs.

---

## [v1.1.10] — 2026-09-27

### Ability Parsing & Battle Disguises
- Added full battle log tracking for disguised Pokémon abilities, accurately attributing damage, knockouts, and moves to the true species upon reveal.

---

## [v1.1.9] — 2026-09-25

### Balanced Damage & Health Calculations
- Standardized tournament battle log calculations for competitive Level 50 play, ensuring fair, balanced damage and health metrics between players.

---

## [v1.1.8] — 2026-09-24

### Instant Prediction Leaderboards & Cloud Safeguards
- Cached prediction leaderboards for instant, flicker-free loading on page navigation, coupled with cloud rate-limiting safeguards.

---

## [v1.1.7] — 2026-09-24

### Cloud Prediction Synchronization
- Added reliable sequential synchronization for submitted prediction ballots, preventing conflicting updates during high-volume submissions.

---

## [v1.1.6] — 2026-09-24

### Unified Profile Picture System
- Streamlined coach branding into a single, circular profile picture across all cards, leaderboards, matches, and roster sheets.

---

## [v1.1.5] — 2026-09-23

### Offline Prediction Recovery & Ballot Modals
- Added automatic sync of offline predictions when connecting, and added click-to-view prediction ballot popups from the leaderboard.

---

## [v1.1.4] — 2026-09-23

### Streamlined Match & Playoff Pages
- Focused primary Matches and Playoff tabs on the active tournament, routing historical seasons through the dedicated Tournaments archive.

---

## [v1.1.3] — 2026-09-23

### Past Tournament Replay Access & Cloud Restoration
- Added quick tournament selectors to view past brackets and matches, while restoring historical battle replays across completed seasons.

---

## [v1.1.2] — 2026-09-18

### Instant Startup & Cache Optimization
- Optimized local data caching to eliminate browser storage limits and prevent momentary mid-draft flashes on page reload.

---

## [v1.1.1] — 2026-09-18

### Cross-Device Prediction Sync & Visual Selection
- Ensured saved predictions highlight immediately with gold selection borders and sync smoothly across multiple devices.

---

## [v1.1.0] — 2026-09-15

### Live Draft Room Polish & Instant Sync
- Cut draft synchronization latency to under 50ms, added draft start guards, and suppressed duplicate Discord pick announcements.

---

## [v1.0.0] — 2026-09-14

### Initial Full Platform Launch

#### Core League Platform
- **Live Home Dashboard**: Season overview with tournament progress bar, draft tracker, recent match results, and current standings snapshot, automatically switching to an Offseason archive between events.
- **Multi-Tournament Management**: Create and manage multiple tournament seasons, each independently tracked with its own phases, rosters, fixtures, and historical archives.
- **Real-Time Cloud Backend**: Cloud-synced data architecture providing live multi-user polling and fast edge write latency without database egress costs.
- **Account & Role Security**: Secure commissioner and coach role system with custom profile management.
- **Testing Sandbox**: Dedicated testing mode enabling commissioners to safely stage data and test configurations without altering live state.

#### Live Draft Suite
- **Real-Time Draft Room**: Live snake drafting with an on-the-clock timer, pick confirmation dialogs, and automatic turn progression.
- **Draft Board & CSV Import**: Import custom draft boards with cost tiers and visual pick grids.
- **Budget Tracking**: Live point budget tracking per coach to prevent picks that exceed team limits.
- **Commissioner Draft Controls**: Start, pause, resume, undo picks, and drag-and-drop draft order management.
- **Discord Draft Alerts**: Automated announcements posted to Discord channels on every official pick with Pokémon sprites, costs, and current clock status.

#### Match Schedule & Results
- **Flexible Match Schedules**: Support for both Group Stage (round-robin) and Swiss Stage tournament formats.
- **Showdown Replay Analyzer**: Automatically parse Pokémon Showdown battle replays to record match outcomes, knockouts, damage dealt, and Pokémon used.
- **Top Cut Playoff Brackets**: Automated championship brackets supporting single and double-elimination formats with live progression.
- **Discord Score Announcements**: Automatic embed notifications posted to Discord when match results are saved.

#### Standings, Records & Analytics
- **Live Standings**: Comprehensive division standings with customizable tiebreaker sorting, qualification badges, and hunt/elimination zones.
- **Hall of Fame & All-Time Records**: Career win-loss tracking, longest win streaks, and historic tournament finish records.
- **Postseason Awards (Team of the Season)**: Auto-calculated awards including Season MVP, Finals MVP, statistical leaders, and All-League selections driven by battle replay data.
- **Interactive Predictions (Pick'em)**: Fan pick'em predictions for upcoming matches, division winners, and tournament champions with live scoring leaderboards.
- **Playoff Odds Simulation**: Monte Carlo simulations running thousands of season permutations to calculate projected playoff qualification and championship odds.