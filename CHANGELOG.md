# Bellimaka League — Changelog

All notable changes to the Bellimaka Pokémon Draft League site are documented here.
Format: `v[MAJOR].[MINOR].[PATCH]` — Major = big new systems, Minor = new features, Patch = bug fixes / small improvements.

## [v1.2.0] — 2026-10-03

### Added
- **World Cup TV Broadcast Standings Cards** — Completely revolutionized Group Stage and Swiss Stage standings into a high-energy TV-broadcast graphic format inspired by international tournament presentations:
  - **Modular Card Graphic Format**: Replaced legacy static data tables with broadcast graphic cards featuring sleek header branding, stage icons, and dynamic playoff qualification tags.
  - **Dynamic Ranking & Tiebreaker Criteria Cubes**: Automatically synchronizes with tournament configuration (`getStandingsCriteria`) to dynamically render dedicated stat cubes for every active metric in exact priority order (e.g. `[RECORD]`, `[GW]`, `[DIFF]`, `[H2H]`, `[BUCH]`, `[SOS]`, `[GL]`, `[GW%]`) alongside `[STATUS]`.
  - **Pixel-Perfect Centered Column Subbar**: Re-architected the column header subbar with larger 12px bold condensed uppercase typography (`font: 800 12px 'Barlow Condensed'`), perfectly centering every column label over its corresponding stat cube below.
  - **Unmistakable Status Badge Styling**: Clearly distinguished clinched contenders from bubble qualifiers—featuring solid vibrant emerald green badges with checkmarks (`✓ CLINCHED` / `✓ ADVANCED`) versus electric sky blue / cyan badges (`IN CUT`), warm amber (`HUNT`), and crimson (`ELIMINATED`).
  - **Eliminated Header Style Conflicts**: Fixed an inherited global style collision on the `STATUS` header column, removing an unintended red pill background.
  - **Spacious Vertical Stage Presence & High-Def Team Banners**: Vertically extended each player slot into a substantial 82px broadcast box, expanding coverage downward to fill viewport height comfortably while preserving full-resolution sharpness of custom team cover backdrops without pixelation or heavy cropping.
  - **Full Backdrop Showcase & Streamlined Coach Link**: Removed redundant mini avatar thumbnails next to coach names to let the full backdrop cover art shine, presenting bold team names with prominent coach buttons underneath that open profiles on click and highlight fixtures on hover.
  - **De-Cluttered Standings Presentation**: Removed intrusive qualification cutoff dividing lines across rows and excluded player OVR rating badges from in-season standings tables to maintain razor focus on active match records, tiebreaker metrics, and division standings.
  - **Multi-Tier Metallic Border Glows**: Implemented tiered border illumination and prestige rank badges distinguishing the #1 seed (Radiant Gold glow and golden leader badge), advancing playoff seeds (Emerald metallic border and qualification badge), active bubble contenders (Amber border), and mathematically eliminated squads (Crimson border).
  - **Responsive Mobile Two-Tier Deck & Vertical Stacking**: Re-engineered mobile and small-screen layouts to eliminate cramped horizontal squeezing—groups stack in full-width single-column layout on viewports `<= 900px`, and rows transform on mobile screens (`<= 650px`) into an intuitive two-tier card with Rank and Team/Coach on the top deck and evenly spaced stat cubes with integrated micro-labels (`REC`, `GW`, `DIFF`, `H2H`, `STATUS`) on the bottom deck.
- **Broadcast Clash Banner for Primetime Matchups** — Completely redesigned the Primetime Matchup hero card into a futuristic, high-energy esports broadcast clash graphic utilizing 100% of available stage space:
  - **Metallic Gradient Rectangle Outline**: Framed the banner in a clean rounded rectangle (`border-radius: 10px`) highlighted by a vibrant metallic gradient outline (crimson-to-gold for regular season, prestige gold for Top Cut playoffs) and dynamic ambient glow.
  - **Unified Broadcast Canvas**: Replaced disruptive diagonal split lines with a unified, clean backdrop presentation showcasing custom uploaded matchup artwork with a dark gradient underlay.
  - **Team Flank Stacks & Centered Horizontal Staging**: Reorganized each team into a cohesive vertical flank stack—placing the team and coach name directly above the middle lineup, the coach avatar and Pokémon showcase cards in the middle row, and team records directly below the lineup.
  - **Centered Arena & Outer Navigation Clearance**: Pulled both team flanks inward toward the center clash hub (`justify-content: center` with balanced gap), eliminating large voids around the center hub while guaranteeing generous clearance between coach avatars and outer navigation arrows (`‹` / `›`).
  - **Large Floating Typographic VS Emblem**: Removed the enclosed box shape around the central clash badge in favor of an energetic, prominent floating typographic "VS" (`font: 900 32px 'Barlow Condensed'`) with metallic gradient coloring and radiant neon drop-shadows.
  - **Symmetrical Broadcast Header & Pagination Footer**: Streamlined the top bar to house division metadata and commissioner controls, and focused the bottom subbar purely on match pagination dots.
  - **Unified Site Typography**: Styled coach and team names with the site's signature condensed bold aesthetic (`'Barlow Condensed', sans-serif`, uppercase), perfectly matching global league styling.
  - **Context-Aware Roster & Battle Performer Resolution**: In unplayed upcoming matches, the lineup highlights top drafted picks and tier aces; in completed fixtures, it automatically showcases top battle performers and starters parsed directly from match replay telemetry.
  - **One-Click Commissioner Feature Pinning**: Added an inline pin toggle button (`📌 PIN FEATURE` / `📌 PINNED`) enabling commissioners and moderators to lock any marquee fixture as the #1 spotlight card, with instant unpin toggling to restore automated hype ordering.
  - **Centered Clash Score Hub**: Cleanly centered the series score dash (`-`) evenly between series scores, eliminating redundant status badges while preserving one-click navigation to the Match Replay Hub and Boxscore modal.

### Improved
- **Clean Center Staging & Text De-Cluttering** — Eliminated extraneous labels in the center hub:
  - **Redundant Status Elimination**: Removed the duplicate "FINAL" badge and "BEST OF 3" format pill from the center hub since status is already clearly designated in the top-right header tag.
  - **Agnostic Round Flow**: Removed arbitrary round numbering text to reflect flexible league scheduling where fixtures are contested in organic order.
- **Custom Mega Sprite Resolution & Automated Error Recovery** — Hardened Showdown sprite resolution for custom and non-standard Megas:
  - **Animated & Pixel Art Fallbacks**: Expanded `ANIMATED_ONLY_SPRITES` and `GEN5_ONLY_MEGAS` to include custom and Legends forms (such as Mega Crabominable, Mega Eelektross, Mega Falinks, etc.) lacking standard 3D HOME renders, directing them to working Showdown GIF and Gen 5 assets.
  - **Fail-Safe Stage Fallback**: Equipped battle stage sprite elements with automated multi-tier error handlers (`handleSpriteError`) and transparent text masking, ensuring missing assets seamlessly downgrade without exposing broken image alt text.
- **Smart Active-Round Prioritization for Primetime Selection** — Upgraded the match selection algorithm to prioritize active unplayed games:
  - **Active Round Weighting**: Automatically detects the current active unplayed round of group play and elevates marquee matchups from that round first, factoring in combined team win records, team power ratings (OVR), and divisional rivalry closeness before falling back to completed thrillers.
  - **Collision-Proof Match Identification**: Unified match key generation across regular season and playoff brackets to uniquely qualify fixtures with group, round, ID, and opponent pairings, ensuring feature pinning and replay lookups never collide across divisions.

---

## [v1.1.21] — 2026-10-03

### Fixed
- **Replay Coach Attribution & Roster-Backed Statistical Validation** — Fixed a bug where battle replay statistics, appearances, and postseason awards were incorrectly attributed or inverted between match participants, particularly in playoff series and replays with swapped side assignments:
  - **Roster-Exclusivity Coach Resolution**: Introduced centralized roster cross-referencing (`resolvePokemonCoach` and `checkCoachDraftRoster`) that directly verifies drafted rosters of both match participants before assigning Pokémon credit, ensuring species uniquely drafted by a coach are never erroneously awarded to their opponent.
  - **Playoff & Top-Cut Match Metadata Attachment**: Updated replay rehydration and parsing across `hydrateTournamentsFromIndexedDB`, `applySharedState`, and `flushSync` to explicitly look up playoff match records and pass coaches and tournament context to the parser, preventing unassigned or placeholder coach labels (`Player 1`/`Player 2`) from defaulting to inverted side attributions.
  - **Swapped Replay Side Handling**: Refactored replay side-swapping logic to respect explicit side flags during replay modal inspections, manual swap toggles, and postseason awards compilation, preventing reversed player sides from overriding legitimate draft ownership.
  - **Paldean Tauros Form Normalization**: Corrected regular expression patterns in `normalizeBattleFormToDraftForm` to properly recognize and normalize `Tauros-Paldean-Aqua`, `Tauros-Paldean-Blaze`, and `Tauros-Paldean-Combat` draft variants into unified species keys across all roster sheets and statistical leaderboards.
  - **Awards & Season Leaderboard Parser Versioning**: Bumped the replay parser specification to version 8 across `calculateTeamOfTheSeason`, `getTournamentPokemonStatsMap`, and synchronization routines, invalidating stale cached maps and ensuring postseason awards accurately compute total games played, kills, and MVP impact scores from properly attributed replays.

---

## [v1.1.20] — 2026-10-01

### Fixed
- **Replay Parser Statistics Persistence & Cloud State Cache Clobber Prevention** — Resolved a bug where battle replay statistics intermittently failed to count toward Pokémon appearances and game performance metrics on team rosters and tournament stat leaderboards:
  - **Unconditional Replay Statistics Transfer**: Updated cloud synchronization state application (`applySharedState`) to preserve locally cached and parsed replay statistics (`stats`) onto incoming tournament objects independently of whether raw Showdown battle logs (`log`) are present in memory.
  - **Multi-Level Replay Log Cache Fallbacks**: Added case-insensitive match participant and bracket key lookups against the persistent replay log cache (`window._replayLogCache` and IndexedDB) in `getTournamentPokemonStatsMap`, `calculateTeamOfTheSeason`, and `hydrateTournamentsFromIndexedDB`, guaranteeing missing battle logs are transparently recovered and parsed on demand.
  - **Pre-Parsed Statistics Cloud Bundling**: Enhanced outbound synchronization (`flushSync`) to automatically parse and attach structured statistics objects to all match and playoff replays before sending data to Cloudflare KV, ensuring clients and background sync cycles receive populated, versioned statistics without relying on bulky raw battle log strings.
  - **Granular Replay Deduplication**: Replaced naive index-based replay identification with composite match-and-game keys across standard and top-cut matches, preventing replays across different matches from colliding or being incorrectly deduplicated.
  - **Dynamic In-Memory Cache Invalidation**: Added automated cache invalidation for tournament Pokémon statistics maps (`_cachedMonStatsMaps`) whenever incoming shared cloud state is applied, replays are saved or deleted, or IndexedDB records are rehydrated, ensuring fresh statistics are rendered immediately without delay.

---

## [v1.1.19] — 2026-09-29

### Fixed
- **Prediction Ballot Modal Pick Tag Containment & Layout Anchoring** — Resolved an issue where pick status tags (`✓ PICK`, `✓ HIT`, `✗ MISSED`) broke out of contender showcase rows and stacked in the top-right corner of the viewport:
  - **Inline Badge Containment**: Introduced dedicated inline flex pill styling (`.pred-ballot-pill`) for prediction ballot modals, decoupling showcase badges from the contender card's corner-anchored absolute positioning (`.pred-check-pill`).
  - **Container Positioning Context**: Added explicit `position: relative` and balanced space-between flex alignment to Champion showcase rows and Division winner rows inside the ballot modal, guaranteeing badges remain neatly anchored on the right edge of each contender card.
  - **Modal Pill Safeguard**: Implemented an automated CSS boundary safeguard (`.modal .pred-check-pill`) ensuring any status pill rendered inside modals retains static document flow unless explicitly designated as an absolute corner tag on an interactive contender card.

---

## [v1.1.18] — 2026-09-29

### Improved
- **Full-Width Layout Alignment & 3-Column Grid for Tournaments Archive** — Harmonized the Tournaments archive page container width and card grid structure with the rest of the application:
  - **Site-Wide Width Consistency**: Removed the narrow container restriction (`1,420px`) on the Tournaments page, expanding it to match the standard `1,775px` max-width and `36px 40px 80px` padding used across the Hall of Fame, Standings, Teams, and Home pages.
  - **Symmetric 3-Column Grid**: Configured the tournament archive card grid to display strictly 3 rectangular cards per row across desktop displays (`repeat(3, minmax(0, 1fr))`), giving tournament cover art, season badges, and match statistics balanced horizontal scale and generous breathing room.
  - **Clean Responsive Breakpoints**: Implemented smooth responsive transitions from 3 columns on desktop (≥1100px) down to 2 columns on tablets (641px–1099px) and a single full-width column on mobile viewports (≤640px).

---

## [v1.1.17] — 2026-09-29

### Added
- **Group-Specific Division Seed Identifiers for Multi-Group Playoff Brackets** — Upgraded seed numbering across Top Cut brackets, preview cards, re-seeding director tools, and prediction brackets to reflect actual division finishes in multi-group tournaments:
  - **Division Seed Numbering**: In tournaments with multiple groups/divisions (e.g. 2-group formats), contenders' seeds now clearly display their group placement (e.g. `#1A`, `#1B`, `#2A`, `#2B`, `#3A`, `#3B`) instead of ambiguous sequential numbers (`#1`, `#2`, `#3`, `#4`).
  - **Historical & Custom Seeding Support**: Ensured multi-group tournaments with saved seeding records or custom playoff arrangements consistently display group seeds for all division qualifiers without reverting to sequential numbers.
  - **Single-Group & Swiss Format Preservation**: Maintained standard numeric seeds (`#1`, `#2`, `#3`, `#4`...) for tournaments with a single group, Swiss stage 1 formats, or standalone brackets where division prefixes do not apply.
  - **Robust Group Letter Extraction**: Implemented dynamic extraction of group identifiers supporting standard conventions (`Group A` -> `A`, `Division 1` -> `1`, `Pool B` -> `B`) with clean alphabetical fallbacks.
  - **End-to-End Bracket Presentation**: Propagated division seed badges across opening match slots, advancing rounds, semifinal/final cards, bracket re-seed modals, and prediction pick'ems.

---

## [v1.1.16] — 2026-09-29

### Fixed
- **Cross-Group Playoff Seeding & Elimination of Same-Group Opening Rematches** — Overhauled the Top Cut bracket preview generator, automatic seed ordering, and bracket stage creation algorithms to guarantee proper cross-group matchups and eliminate opening-round same-division rematches:
  - **Cross-Division Seeding Algorithm**: Refactored seed resolution across multi-group stages so that qualifiers from opposite divisions are paired in opening playoff rounds. In 2-group tournaments advancing 3 coaches per group (into an 8-slot bracket with top-seed byes), 2nd-place finishers are systematically paired against 3rd-place finishers from the opposite group (Group B #2 vs Group A #3, and Group A #2 vs Group B #3) rather than facing their own group rivals.
  - **Bracket Half Separation & Delayed Group Rematches**: Positioned the runner-up of the #1 overall seed's division in the opposite half of the bracket (feeding into the #2 overall seed), ensuring that coaches who competed in the same group stage cannot rematch until the Grand Finals (or deep in the semifinals in the event of an upset).
  - **Harmonized Bracket Preview & Stage Creation**: Unified `getTournamentTopCutModel` preview resolution with `seedTopCut` and `buildTopCutSeeding`, ensuring the projected live standings bracket preview, the generated BracketsManager stage, and prediction pick'ems reflect identical, mathematically consistent pairings.
  - **Accurate Reseed Pairing Preview**: Updated the manual bracket re-seeding modal preview to reflect actual 8-bracket matchup paths and bye placements instead of naive contiguous indices.

---

## [v1.1.15] — 2026-09-28

### Improved
- **Balanced 2-Column Roster Grid on Player Profiles & Tournament History** — Restructured the Pokémon roster grid across player profile cards and historical tournament rosters to create a clean, balanced layout:
  - **Symmetric 2-Column Grid**: Replaced the previous auto-fill configuration with a symmetrical 2-column layout (`repeat(2, minmax(0, 1fr))`), ensuring standard 10-Pokémon rosters display cleanly across exactly 5 rows of 2 cards without awkward trailing items on the final row.
  - **Comfortable Breathing Room**: Expanded card widths to ~245–250px per Pokémon chip, providing generous space for long Pokémon form names, sprite art, and quick-action buttons (⇄ swap / × remove) without text truncation or wrapping.
  - **Cross-View Consistency**: Applied the 2-column grid structure across active draft rosters, historical team rosters, and expandable tournament history rosters on player profiles.
  - **Responsive Mobile Layout**: Added a responsive media breakpoint (`@media(max-width: 480px)`) to automatically collapse rosters into a single column (`1fr`) on compact mobile viewports for easy vertical scrolling and comfortable touch targets.

---

## [v1.1.14] — 2026-09-28

### Fixed
- **Schedule-Aware Mathematical Elimination & Clinching in Group Standings** — Overhauled the tournament group stage clinching and elimination algorithms to evaluate remaining head-to-head fixtures and full tiebreaker criteria rather than relying only on isolated win maximums:
  - **Remaining Match Head-to-Head Accounting**: Analyzed unplayed matches between remaining contenders in the division. Since head-to-head fixtures must produce a winner, guaranteed opponent win distributions are now fully evaluated across all future scenario branches.
  - **Tiebreaker & Score Permutation Simulation**: Evaluated match score permutations (2-0, 2-1, 1-2, 0-2) across unplayed division fixtures against the tournament's active standings criteria (Games Won, Game Differential, and Head-to-Head). Clinching correctly detects coaches whose worst-case 0-2 sweep outcome still holds unassailable tiebreakers over contenders tied in match record.
  - **Strict Elimination Precision**: A coach is marked as **ELIMINATED** (with the red status badge) if and only if every single possible permutation of remaining group match outcomes guarantees that at least the cutoff threshold of opponents will finish with strictly more wins than the coach's maximum possible total.
  - **Contention & Hunt Preservation**: If any valid combination of remaining match results allows a coach to tie for a qualifying spot in match wins, they remain alive in the **HUNT** to contest playoff advancement via tiebreakers.
  - **Schedule-Aware Clinching Precision**: A coach is marked as **CLINCHED** when they are mathematically guaranteed to finish within the Top Cut under every possible remaining fixture outcome, ensuring no combination of opponent wins or tiebreaker distributions can drop them below the qualification cutoff.
  - **Odds Simulation Consistency**: Playoff odds calculations and Monte Carlo projections automatically sync with the schedule-aware elimination logic, setting mathematically eliminated contenders to 0% and clinched qualifiers to 100%.

---

## [v1.1.13] — 2026-09-28

### Added
- **Interactive Multi-Metric Column Sorting for Offseason Standings & Records Tables** — Added comprehensive column header sorting to both the All-Time Offseason Standings leaderboard and the Records (Hall of Fame) leaderboard:
  - **Bidirectional Header Sorting**: All numeric and categorical columns can be toggled between descending (highest/most first) and ascending (lowest/least first) orders on successive clicks, with directional indicators (`▲` / `▼`) displaying the active sort key and direction.
  - **Interactive Hover & Visual Feedback**: Column headers feature pointer cursors and subtle gold accent highlights on hover and active selection to clearly indicate interactive capabilities.
  - **Preserved All-Time Legacy Rank Identity**: Coaches retain their permanent canonical All-Time Legacy rank number (and legacy crown for #1) in the rank `#` column regardless of the active sorting order, allowing users to cross-reference baseline standing while comparing individual statistical categories.
  - **Deterministic Legacy Tie-Breaking**: When coaches are tied in a metric (e.g. identical overall ratings, equal win totals, or matching trophy counts), ties are consistently and deterministically broken by canonical All-Time Legacy rank.
  - **Streak & Accolade Momentum Sorting**:
    - **Active Streak**: Sorts by streak momentum from longest active win streaks down to deepest active loss streaks, and vice versa.
    - **Accolades & Badges / Records Held**: Sorts by total badge and historic record counts.
    - **Trainer / Team**: Toggles alphabetically (A-Z) and reverse-alphabetically (Z-A) by coach profile name.
    - **Career W-L & Win Rate**: Primary sorting by total career victories, secondary tie-breaking by fewest losses.
  - **Scroll Position Preservation**: Sorting re-renders the table instantaneously while maintaining the user's vertical scroll position on the page.

---

## [v1.1.12] — 2026-09-28

### Added
- **Spacious Desktop Prediction Ballot View & In-Place Filtering** — Overhauled the prediction ballot modal opened from the tournament prediction leaderboard to match the spacious desktop layout of the main predictions page:
  - **Full-Width Modal Presentation**: Replaced the narrow, condensed modal list with a spacious `1350px` wide popup window allocating full width to the prediction pick sections (Champion Outright row, Group Stage Winners grid, and Match Pick'ems grid).
  - **Focused Outright & Group Pick Showcases**: Instead of rendering grids of all unpicked contenders, the ballot view highlights only the single trainer selected for tournament champion and division winners, displaying their avatar, team name, and hit/miss/pending badge while eliminating unnecessary visual clutter.
  - **Identical Compact Match Cards**: Rendered match pick'ems using the exact compact card layout from the main predictions page (team logos, coach and team labels, and colored pick boxes: gold for open/pending picks, green for hits, and red for misses).
  - **In-Place Tab & Status Filtering**: Integrated the interactive filter bar (All / Division tabs, plus All / Open / Decided status pills) directly inside the ballot view, updating the ballot fixtures instantaneously in-place while preserving container scroll position and leaving the background page filter state untouched.
  - **Read-Only Ballot Security**: Scoped pick resolution to the viewed participant's selections via `_viewingBallotPickMap` and enforced read-only disabled states across all contender buttons and match pick boxes so external ballots cannot trigger accidental edits.
  - **Playoff & Tournament Phase Adaptation**: Automatically renders the full Top Cut Prediction Bracket when inspecting ballots for playoff-phase tournaments, while handling custom prediction bonus questions gracefully.

---

## [v1.1.11] — 2026-09-27

### Fixed
- **Paldean Tauros Breed Typings & Form Resolution** — Fixed typing detection and naming recognition for all Paldean Tauros breeds across the team roster view, draft board, battle log parser, and Pokédex autocompletes:
  - **Typing Accuracy**: Resolved an issue where Paldean Tauros (Blaze Breed) and Paldean Tauros (Aqua Breed) displayed as pure Normal-type on team sheets and the draft board. Updated primary and dual typing maps to ensure Blaze Breed correctly resolves to **Fighting / Fire**, Aqua Breed resolves to **Fighting / Water**, and Combat Breed resolves to **Fighting**, while preserving regular Kantonian Tauros as pure **Normal**.
  - **Showdown Battle Form Normalization**: Added mapping rules to `normalizeBattleFormToDraftForm` so Showdown battle forms (`Tauros-Paldea-Blaze`, `Tauros-Paldea-Aqua`, `Tauros-Paldea-Combat`, `Tauros-Paldea`) automatically reconcile to drafted roster entries (`Paldean Tauros (Blaze)`, `Paldean Tauros (Aqua)`, `Paldean Tauros`).
  - **Draft Resolution Resilience**: Enhanced `resolveDraftMonName` to match both raw and normalized form keys, ensuring battle statistics map accurately to drafted roster slots regardless of input formatting variations.
  - **Pokédex & HP Baseline Coverage**: Added all three Paldean Tauros breeds (`Paldean Tauros (Aqua)`, `Paldean Tauros (Blaze)`, `Paldean Tauros (Combat)`) to `MASTER_POKEDEX` for search datalists and updated `getPokemonBaseHp` to properly index all Paldean Tauros breed keys with their 75 base HP.

---

## [v1.1.10] — 2026-09-27

### Added
- **Zoroark & Illusion Ability Support in Replay Parser** — Added comprehensive Showdown protocol handling for Zoroark and Hisuian Zoroark disguised via the Illusion ability:
  - **Dynamic Slot Delta Attribution**: Added active slot snapshotting that tracks combat actions per switch. When Showdown emits `|replace|` upon breaking Illusion, all damage dealt, KOs, moves used, and damage taken while disguised are retroactively deducted from the disguised disguise and credited to the true Zoroark entry.
  - **Fair Level 50 HP & Damage Rescaling**: Recalculates Zoroark's true Level 50 max HP and rescales percentage-based damage taken and HP healed to Zoroark's actual HP baseline. Automatically adjusts opposing attackers' damage dealt on the disguised slot to reflect Zoroark's true HP pool rather than the disguise's base HP.
  - **Disguised Pokémon State Isolation**: Disguised species only retain combat statistics and appearances from turns where they were legitimately fielded on their own. If a Pokémon only appeared as a Zoroark disguise and was never brought into battle, its switch count drops to zero, resetting its status to benched (0 appearances, 0 damage, 0 KOs) so it is excluded from team rosters and award calculations.
  - **Revival & Multi-Disguise Cycling**: Full support for multiple disguise cycles in a single battle, including revival via Revival Blessing followed by subsequent disguised entries and reveals.
  - **Unbroken Illusion Fallback Detection**: If a team drafts or previews Zoroark and the Illusion is never broken during combat (e.g. 4-0 sweeps, clean substitutions, or evasion of direct hits), signature moves (`Bitter Malice` for Zoroark-Hisui, `Night Daze` for Zoroark) automatically detect the unbroken identity and attribute battle stats to Zoroark.

### Fixed
- **Replay Parser & Stats Cache Invalidation (`v7`)** — Bumped the Showdown replay parser and tournament stats cache version to `v7` across all aggregation systems (Match Replay Hub modals, Game Freak season stats, coach team rosters, and tournament leaderboard awards). All historical matches with Zoroark, Hisuian Zoroark, and disguised teammates re-parse automatically without requiring manual cache resets.

---

## [v1.1.9] — 2026-09-25

### Changed
- **Fair Level 50 VGC Damage & HP Calculations for Showdown Replays** — Overhauled the damage dealt and damage taken stat parser for Pokémon Showdown battle replays to ensure balanced and fair metrics between spectated and non-spectated players:
  - In Showdown replays, non-spectated opponent Pokémon report remaining health as percentages rather than exact raw HP values.
  - Replaced legacy flat HP estimation heuristics with standard Level 50 VGC stat calculations based on 31 IVs and archetype-specific EV investments.
  - Implemented archetype-aware HP formulas:
    - Bulky & Support archetype (252 HP EVs): `Base + 107` HP (e.g., Incineroar, Amoonguss, Farigiraf, Torkoal, Pelipper, Clefairy, Sinistcha).
    - Fast & Offensive archetype (0 HP EVs): `Base + 75` HP (e.g., Flutter Mane, Chi-Yu, Urshifu, Chien-Pao).
    - Balanced / Flexible builds (~120 HP EVs default heuristic): `Base + 90` HP.
    - Handled special mechanics directly (e.g., Shedinja capped at 1 HP).
  - Normalized regional form prefixes and alternate form naming before HP lookup.

### Fixed
- **Automated Replay Stats Cache Invalidation** — Bumped the battle log parser version to `v6` across all replay aggregation pipelines (Match Replay Hub modal, Game Freak season stats, overall leaderboard aggregations, and player box scores). All existing battle logs automatically re-parse with fair Level 50 VGC damage stats without requiring manual cache resets.
- **Coach-Scoped Replay Attribution & Species Form Isolation** — Fixed a bug where team roster cards could attribute Pokémon appearances and battle stats across different coaches who drafted distinct forms of the same species (e.g., base form vs Mega form):
  - Scoped team roster stats strictly to matches played by that specific coach, preventing stats from leaking onto other rosters.
  - Removed blind base-to-mega form fallbacks in stats lookups so distinct drafted forms never cross-pollinate.
  - Enforced strict replay participant isolation so Pokémon in a battle replay can only ever be credited to the coaches participating in that match.
  - Updated awards and all-star calculations to track each coach's Pokémon independently (`coach::species`) to prevent stats collisions.

---

## [v1.1.8] — 2026-09-24

### Added
- **Stationary Prediction Leaderboard with Match Fingerprinting** — `renderPredictionLeaders` and `leaderboardShell` now remain 100% stationary and do not re-calculate or re-fetch on page refreshes or tab switches:
  - Added `getTournamentMatchFingerprint(t)`: Tracks the exact state of tournament matches and champion status. If matches haven't changed, prediction points cannot change.
  - Added persistent caching to `localStorage` (`draftdex-pred-leaders-{tournamentId}`): `leaderboardShell` immediately renders the pre-computed leaderboard markup upon initial load, eliminating layout shifts and "Loading account scores..." flickers.
  - Instant Local Re-scoring on Match Updates: When a match score is entered or updated (`fingerprint !== cached.fingerprint`), `renderPredictionLeaders` re-calculates points locally from cached rows in 0ms without waiting for network requests.
  - Eliminated the 10-second modal refetch timer in `openUserPredictionsModal`: Opening any coach's prediction breakdown modal is now instantaneous from memory.

### Fixed
- **Resolved UUID Display on Prediction Leaderboard & Career Points** — Fixed an issue where unmapped user account identifiers displayed as raw UUID strings instead of coach profile names on the prediction leaders board. Added robust coach identity resolution (`getCoachForUserId`), client account seed fallbacks, corrupt cached HTML detection, and integrated career prediction points calculation across all historical records.
- **Severed Prediction Auto-Sync Feedback Loop** — Resolved a recursion loop where `syncLocalPicksToCloud` triggered `renderPredictionLeaders`, which in turn invoked `syncLocalPicksToCloud`. Removed all write triggers from read-only views (`renderPredictionLeaders`, `updateLocalPredictionInCache`, `syncFromCloud`).
- **Cloudflare KV Quota Circuit Breaker & Throttling** — Added strict rate limiting and backoff controls:
  - Throttled `syncLocalPicksToCloud` to at most once per 60 seconds per tournament.
  - Added an HTTP 429 response guard (`window._kvWriteBlocked`): if Cloudflare KV reaches its daily write quota, the application automatically suspends background sync requests and preserves picks locally in `localStorage` without spamming the API.
  - Streamlined sync payload to single upsert operations, eliminating redundant delete operations.

---

## [v1.1.7] — 2026-09-24

### Fixed
- **Cloud Prediction Ballot Synchronization** — Fixed an issue where submitted prediction ballots could become partially desynchronized or missing from cloud storage during high-volume submissions, ensuring all valid user picks and scores are accurately reflected on the leaderboard and in prediction breakdown modals.
- **Eliminated Cloudflare KV Concurrency Race Condition** — Fixed the root cause of lost and stranded predictions where parallel, unawaited `fetch` requests fired by the client clobbered each other during Cloudflare KV's read-modify-write cycle:
  - Implemented sequential `await` execution for all prediction synchronization batches.
  - Added an in-memory queue (`predictionSyncQueuePromise`) to serialize rapid single-pick selections so fast consecutive clicks never collide in Cloudflare KV.
- **Bulletproof Local-to-Cloud Auto-Sync** — Redesigned `syncLocalPicksToCloud` to guarantee that no user's picks can ever get stranded locally:
  - Fetches live ground-truth records directly from Cloudflare KV upon sync rather than relying on uninitialized or stale client caches.
  - Cross-references all local device picks (`draftdex-pick-{tournamentId}-*`) against cloud state, detecting any missing or updated picks using canonical matchup event keys.
  - Pushes all missing picks sequentially to Cloudflare KV and cleans up any legacy inverted matchup keys.
  - Automatically triggers whenever a user opens the site (client initialization), logs in or registers, navigates to the Predictions view, or refreshes prediction scores.
- **Global Prediction Cache & Modal Independence** — Decoupled prediction score calculations and cache hydration from the presence of `#predLeaders` in the DOM so that opening any user's prediction ballot from profiles, rosters, or other views always loads fresh, complete data.

---

## [v1.1.6] — 2026-09-24

### Changed
- **Unified Sole Profile Picture (PFP) System** — Retired the dual team cover and coach photo system in favor of a single, unified coach profile picture (PFP) identity across the platform:
  - All coach cards, leaderboard items, tournament match cards, draft displays, and roster views now display the coach's circular profile picture avatar.
  - Streamlined the Coach Profile modal, moderation controls, and Team Roster detail headers by removing redundant "Edit Cover" buttons and replacing them with a single "Edit profile picture" control featuring the 1:1 circular guide cropper.
  - Aliased legacy cover editor invocations (`openTeamCoverEditor`) directly to `openProfilePictureEditor` to preserve compatibility with any remaining references.

### Fixed
- **Converted All Existing Team Covers to Profile Pictures** — Migrated all legacy team cover images stored in Cloudflare KV into official `profilePictures` entries, ensuring no user's artwork or branding was lost.
- **Client Startup & Cloud Ingestion Migration** — Added automatic conversion upon client boot (`localStorage` merge) and cloud media synchronization (`fetchMediaFromCloud`) to seamlessly transfer any cached or incoming legacy cover artwork into `profilePictures`.

---

## [v1.1.5] — 2026-09-23

### Fixed
- **Local-to-Cloud Prediction Auto-Synchronization** — Fixed an issue where predictions made on a user's device (e.g. before signing in, or during intermittent background network sync) were saved only into local browser storage (`localStorage`) and never uploaded to Cloudflare KV. Added `syncLocalPicksToCloud()` which automatically detects unsynced or updated local picks and uploads them to the cloud upon page load, sign-in, and leaderboard cache updates.
- **Prediction Ballot Integrity Recovery** — Resolved an issue where submitted match predictions could fail to synchronize to cloud storage, ensuring all match picks, division winners, and champion selections are accurately recorded and scored.
- **Robust Prediction Modal User Resolution & Freshness** — Enhanced `openUserPredictionsModal` to automatically resolve coach profile names, linked account usernames, and account UUIDs interchangeably.
- **Prediction Score Inverted Match Key Deduplication** — Fixed an issue where matches whose competitor order had been saved under reversed questions (e.g., `Who wins: Team A vs Team B` vs `Who wins: Team B vs Team A`) could produce duplicate records for the same match. Implemented `canonicalPredictionEventKey` and `deduplicatePredictionRows` across scoring, rendering, and caching to ensure every match matchup normalizes to a single canonical event key, keeping only the latest pick and eliminating double scoring.
- **Inverted Pick Storage Cleanup** — When a user saves or updates a match prediction (`Who wins: Team A vs Team B`), any reversed question key (`Who wins: Team B vs Team A`) is automatically cleared from `localStorage` and deleted from Cloudflare KV.

### Changed
- **Clean Prediction Leaders Display** — Removed verbose account suffixes from the Prediction Leaders sidebar, displaying clean coach profile names rather than raw account mapping strings.

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