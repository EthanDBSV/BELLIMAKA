# Bellimaka League — Changelog

All notable changes to the Bellimaka Pokémon Draft League platform are documented here.
Format: `v[MAJOR].[MINOR].[PATCH]` — Major = major system overhauls, Minor = new features, Patch = bug fixes and visual improvements.

## [v4.1.0] — 2026-10-15

### Broadcast Playoff Odds Overhaul, Modernized Projections & Visual System Refinements
- **Unified Playoff & Seeding Odds Column (Segmented Progress Visualization)**:
  - **Combined Progress Track**: Merged separate `#1 Seed %` and `Make Top Cut %` columns into a single, high-density `Playoff & #1 Seed Odds` column featuring a dual-fill segmented progress bar.
  - **Accent & Segmented Color Hierarchy**:
    - `#1 Seed %`: Rendered as an amber-gold accent fill (`#ffd166` $\rightarrow$ `#f59e0b`).
    - Remaining Playoff Cut %: Rendered as a warm secondary orange fill (`#fb923c` $\rightarrow$ `#ea580c`), or vibrant emerald (`#34d399` $\rightarrow$ `#10b981`) when qualification is locked.
    - Missed Cut: Rendered as a clean, dark track background (`#09090f`).
  - **Prominent Primary Numeric Typography**: Clear tabular percentage display for total cut probability alongside an adjacent gold star badge (`★ X% #1`) and interactive What-If delta indicators.
  - **Full Distribution Tooltips**: Hovering the track displays exact percentage breakdowns (`Playoff Cut: X% (#1 Seed: Y% · Seeds 2+: Z% · Missed: W%)`).
- **Streamlined Status & Scenarios Engine**:
  - **Removed Text Clutter**: Removed verbose multi-line projected record strings (`Proj. X–Y · Z matches remaining`) directly from table cells to prevent vertical bloat.
  - **Pre-Tournament Tier Badges & Balanced Hierarchy Engine (`getPreTournamentTier`)**:
    - When 0 matches have been played in a tournament, coaches display intuitive pre-tournament outlook badges based on group seed rankings, qualification cutlines, and simulated equity instead of in-season cut badges:
      - `👑 FAVORITE` (Gold): Top projected seed (#1 seed favorite, or co-favorites $\ge 45\%$).
      - `⚔️ CONTENDER` (Cyan): High projected playoff equity holding an automatic Top Cut spot (Rank $\le$ Cut or within 3% of the cutline).
      - `🔥 DARK HORSE` (Purple): Upper-middle challengers right on the bubble with dangerous spoiler/upset potential.
      - `⚡ SLEEPER` (Amber): Lower-middle underdogs flying under the radar with key fixture upset ability.
      - `🎲 LONG SHOT` (Slate): Bottom-tier underdogs facing steep mathematical odds ($\le 8\%$ or bottom seeds in the group).
    - **Balanced Tier Representation**: Eliminated tier clumping (where groups previously collapsed into 5 Dark Horses and 0 Long Shots) by anchoring tier assignments to relative group position and cutline proximity rather than loose global thresholds.
  - **Calibrated Top Contender Emphasis & Lower Tier Realism Model**:
    - Calibrated baseline power scaling (`(ovr - 76) * 8.0`) and match win probability soft caps (`[0.20, 0.80]` baseline with logistic divider `135`), establishing clear competitive separation:
      - **Top Contenders**: Top seeds hold commanding ~60–63% cut odds and ~37–41% #1 seed equity.
      - **Lower-Rated Coaches Toned Down**: Underdogs and sleepers drop to realistic pre-tournament cut equity (~4–14% cut, ~1–4% #1 seed equity), preventing lower-rated teams from holding unrealistic double-digit #1 seed probabilities.
    - Preserved rapid live-form takeover once actual match results are reported, allowing tournament form to instantly supersede pre-tournament expectations.
  - **Intuitive Sports Status Badges (Cryptic `E#` Numbers Eliminated)**:
    - Replaced confusing mathematical elimination numbers (`E#1`, `E#2`) with clear, human-readable race statuses:
      - `✓ CLINCHED`: Playoff spot mathematically secured.
      - `MAGIC #X` / `⚡ WIN & IN`: Combinatorial magic numbers indicating exact wins required to guarantee Top Cut regardless of external match outcomes.
      - `🛡️ IN CONTROL`: Strong qualifying probability; controls own path.
      - `⚔️ ON THE BUBBLE`: Sitting directly on the playoff bubble within immediate striking distance.
      - `🔥 IN THE HUNT`: Chasing the cutline with viable paths to qualification.
      - `⚠️ MUST WIN` / `⚡ WIN OR GO HOME`: Elimination pressure requiring urgent wins to stay alive.
      - `✗ ELIMINATED`: Mathematically eliminated from Top Cut contention.
  - **Scenario Popovers & Interactive Schedule Modal (`openPlayoffScenarioModal`)**:
    - **CSS Hover Popover**: Instant hover preview showing scenario headlines, head-to-head status, and qualification requirements.
    - **Interactive Modal**: Full-depth breakdown displaying game differential, path intelligence, clinch formulas, and remaining fixtures with one-click "Test Win" shortcuts.
- **Table Cutline Redesign & Subtle Zone Background Tinting**:
  - **Removed Banner Dividers**: Eliminated the jarring, full-width dashed cutline banner (`▲ TOP 2 PLAYOFF CUTLINE ▲`).
  - **Accent Border Divider**: Implemented a sleek, glowing 2px amber accent border (`#ffd166`) directly under Rank 2 separating qualifiers from the field.
  - **Subtle Zone Tinting**:
    - **Qualifying Zone (Ranks 1–2)**: 5% emerald green tint (`rgba(16, 185, 129, 0.05)`).
    - **Bubble Zone (Ranks 3–4)**: Neutral dark slate (`#14141d`).
    - **Elimination / Longshot Zone (Ranks 5–7)**: 4% red tint (`rgba(239, 68, 68, 0.04)`).
- **Streamlined Top Cut Championship Projections (Phase 2 Overhaul)**:
  - **Unified Title & Finals Equity Column (`renderNytPhase2Row`)**:
    - Merged separate `Make Finals %` and `Win Title %` columns into a single, high-density `Title & Finals Equity` column featuring a dual-fill segmented progress bar:
      - **Title Champion Equity**: Rendered as an amber-gold accent fill (`#ffd166` $\rightarrow$ `#f59e0b`).
      - **Finals Runner-Up Equity**: Rendered as a vibrant emerald green secondary fill (`#34d399` $\rightarrow$ `#10b981`).
      - **Non-Finals Exit**: Rendered as a dark, clean track background (`#09090f`).
    - Prominent primary numeric typography for Title Equity alongside an adjacent emerald star badge (`★ X% Finals`).
    - Hovering the progress track reveals exact distribution percentages (`Title Champion: X% · Grand Finals: Y% · Earlier Exit: Z%`).
  - **Clean Sports Fixture Chips (Moneyline Betting Clutter Removed)**:
    - Removed confusing gambling moneylines (`-101`, `+16583`, etc.) and redundant match text from table cells.
    - Replaced with sleek, high-visibility matchup chips (e.g. `vs Kai · WB Quarterfinal 1 · 85% Win Prob`) with color-coded win probabilities.
  - **Streamlined Bracket Status Column**:
    - Displays active bracket condition with clean status pills: `👑 CHAMPION`, `🏆 GRAND FINALS`, `🛡️ UPPER · 2 LIVES`, `⚠️ LOWER · 1 LIFE`, or `✗ ELIMINATED`.
    - Pairs with clean playoff win-loss record display (`Playoffs: 2-0`), omitting redundant stage 1 record strings.
  - **Full-Width Table Layout & What-If Rail Streamlining**:
    - Removed the cramped 2-column layout and the Phase 2 bracket What-If picker rail (as double-elimination brackets follow deterministic advancement paths without ambiguous tiebreakers), expanding the championship table to full 100% width.
    - Reduced table columns to 5 high-impact columns (`Seed`, `Contender & Team`, `Bracket Status`, `Title & Finals Equity`, `Next Matchup & Path`), preventing cell wrapping on desktop and tablet displays.
- **Enhanced "What-If" Simulator Interactivity & Visual Fixes**:
  - **Table Highlight Fix (Gold Vertical Lines Removed)**: Fixed a browser rendering bug where `outline` applied to `<tr>` elements within collapsed tables drew vertical box outlines across all column cell borders. Replaced with an elegant background pulse animation (`@keyframes whatifPulseBg`) and an amber accent stripe on `td:first-child`.
  - **Dynamic Row Flash**: Toggling match outcomes in the What-If picker highlights affected coaches (both directly involved in the match and those whose odds shifted by $\ge 0.5\%$).
  - **Real-Time Mini Delta Badges**: Dynamic `▲ +X%` (green) and `▼ -X%` (red) indicators appear directly beside probability numbers.
- **Official Artwork & PokeAPI Form Resolution Expansion**:
  - **Female Form Variants (-F)**: Mapped official PokeAPI artwork IDs for `indeedee-female`/`indeedee-f` (`10186`), `meowstic-female`/`meowstic-f` (`10025`), `oinkologne-female`/`oinkologne-f` (`10254`), and `basculegion-female`/`basculegion-f` (`10248`).
  - **Comprehensive Regional Variants**: Added explicit 10000+ artwork IDs for all Alolan (`10091`–`10115`), Galarian (`10161`–`10180`), Hisuian (`10229`–`10244`), and Paldean (`10250`–`10253`) forms.
  - **Cache Auto-Healing**: Drawer initialization now directly validates artwork against `SPECIAL_FORM_ARTWORK_IDS`, automatically replacing previously cached fallbacks in `localStorage`.
- **Drawer Ability Styling & Clean Typography**:
  - Cleaned ability presentation in Pokémon detail drawers, rendering all primary, secondary, and hidden abilities as uniform pills without jarring purple backgrounds or hidden tags.
- **OVR Badge Redesign & Rose Gold Immortal Tier**:
  - Replaced FIFA/Madden plaque borders, shadows, and backgrounds on `.ovr-badge-pill` with clean, colored tabular typography (`#ff4d58` Elite, `#ffd166` Gold, `#d0d0dc` Silver, `#cd7f32` Bronze) across the Offseason Legacy Standings and Coach Career Stats tables.
  - Changed the All-Time Elo Immortal tier color to Rose Gold (`#f4a4a8`, `#5a3038` badge, `#2a1418` tag) in `getLegacyTier` and the Elo Playbook to eliminate visual conflict with Gold tier player OVRs (`#ffd166`).

## [v4.0.0] — 2026-10-14

### Interactive Pokémon Detail Sidebar Drawer (Drafteon-Style) & Official Artwork Integration
- **Interactive Slide-Over Sidebar Drawer (`openPokemonDetailDrawer`, `closePokemonDetailDrawer`)**:
  - **Drafteon-Style Slide-In Panel (`#pokemonDrawerPanel`, `.pokemon-drawer`)**: Implemented a responsive 60fps desktop & mobile slide-out sidebar drawer inspired by Drafteon.com that flies in smoothly from the right edge upon clicking any Pokémon card on the draft board, team planner, or roster.
  - **Full Backdrop & Keyboard Accessibility**: Includes a frosted glass blur backdrop (`.pokemon-drawer-backdrop`), top close button (`.pokemon-drawer-close`), backdrop click dismissal, and instant <kbd>ESC</kbd> keyboard dismissal.
  - **Unified Navigation Across Views**: Clicking any Pokémon on the active Tournament Draft Board or the Offseason Draft Board immediately opens the drawer with complete data. A small `+` button remains on the cards for 1-click quick-add convenience.
  - **Persistent Body Scroll Lock**: Adds `.pokemon-drawer-open` to prevent background scrolling while inspecting Pokémon stats on mobile devices.
- **Full-Size Official Artwork Integration & Instant Showdown Dex Engine**:
  - **High-Resolution Official Artwork**: Directly streams official Pokémon artwork via PokeAPI GitHub CDN (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{dexId}.png`) using mapped National Dex IDs and specialized form IDs (`SPECIAL_FORM_ARTWORK_IDS`), covering all 1,025+ canonical Pokémon, Megas, Paradox Pokémon, and regional forms.
  - **Showdown Pokedex Engine (`ensureShowdownDex`, `getPokemonShowdownData`)**: Pre-fetches Pokémon Showdown's Pokedex JSON CDN and caches it locally (`bellimaka_showdown_dex_v1`). Eliminates PokeAPI 429 rate limiting, providing 0ms instantaneous load times for stats, BST, and abilities across the entire draft board.
  - **Tiered Multi-Stage Fallback Chain (`handleArtworkFallback`)**: Automatically cascades from PokeAPI Official Artwork $\rightarrow$ Pokémon Showdown Home/Gen5 Sprite $\rightarrow$ Local Pokéball icon, guaranteeing instantaneous display and zero broken image states.
  - **Frame-Filling Sprite Scaling & Auto-Trim (`autoTrimArtwork`)**: Expanded the artwork canvas container to 360px × 250px and added automatic transparent margin trimming via offscreen canvas. Fixes wide-aspect Pokémon (like Kyogre, Rayquaza, Dondozo) that previously appeared tiny and floating due to square-padding constraints, scaling them up by 80% to fill the hero frame edge-to-edge with the same commanding presence as square-aspect Pokémon like Zacian.
  - **Dynamic Ambient Theme Glow**: Surrounds the artwork presentation with a radial gradient glow matching the Pokémon's primary type theme (`TYPE_THEMES` for Fire, Water, Grass, Dragon, etc.).
- **Base Stats & BST (Base Stat Total) Visualization**:
  - **Pure Canonical Genus Title Tagline**: Removed the cluttered Dex number badge from the hero subtitle in favor of a clean, high-impact italicized classification title (e.g. *"The Warrior Pokémon"*, *"The Sea Basin Pokémon"*, *"The Drummer Pokémon"*).
  - **Total Base Stats (BST) Summary Badge**: Dynamically color-coded BST pill with tier highlights ($\ge 600$ Legendary/Mythical Gold, $\ge 500$ High-Tier Cyan, Standard Slate).
  - **6 Competitive Base Stat Bars (`renderDrawerStatsHtml`)**:
    - Visual progress tracks with numeric stat readouts and proportional scaling (up to 200–255 max):
      - **HP** (Health Points): Vibrant Emerald Green (`#22c55e`)
      - **ATK** (Attack): Fiery Orange (`#f97316`)
      - **DEF** (Defense): Amber Gold (`#eab308`)
      - **SPA** (Special Attack): Cyber Cyan (`#06b6d4`)
      - **SPD** (Special Defense): Mystic Violet (`#8b5cf6`)
      - **SPE** (Speed): Neon Rose (`#ec4899`)
- **Complete Ability Display & Hidden Ability Indicators (`renderDrawerAbilitiesHtml`)**:
  - **All Abilities Rendered**: Extracts full ability slots (`0`, `1`, `H`, `S`) so every primary, secondary, and hidden ability displays simultaneously (e.g. Rillaboom displays both *Overgrow* and *Grassy Surge*; Scovillain displays *Chlorophyll*, *Insomnia*, and *Moody*).
  - **CSS Name Collision Fix (`.is-hidden-ability`)**: Resolved a CSS conflict where `.pokemon-ability-pill.hidden` collided with the global `.hidden { display: none !important; }`, which previously rendered hidden abilities invisible. Hidden abilities now render with distinct purple glowing pills and a high-contrast `HIDDEN` tag.
- **Deep Bellimaka Draft & Team Planner Integration**:
  - **Private Team Planner (`handleDrawerAddPlan`, `handleDrawerRemovePlan`)**:
    - Live roster status: detects whether the Pokémon is currently in the active team plan.
    - One-click `➕ Add to My Team Plan ({cost} pts)` or `➖ Remove from Plan` actions with instant live updates to planner capacity (`X/10 slots`) and budget spent (`Y/120 pts`).
  - **Auto-Pick Draft Bank (`handleDrawerSetBank`, `handleDrawerClearBank`)**:
    - One-click `🏦 Save to Draft Bank` to set the Pokémon as the coach's auto-pick target, or clear it if already queued.
  - **Tournament Live Draft Action (`handleDrawerDraftPick`)**:
    - In live tournament drafts, displays a prominent `🎯 Draft {Pokemon} Now` button that launches the draft confirmation flow.
    - If already drafted, displays an alert banner showing the coach name, round number, and pick number.
  - **Moderator Quick-Edit**:
    - One-click `✏️ Edit Tier` button in the drawer header allowing tournament organizers to move or re-cost the Pokémon directly.
  - **External Competitive Reference Links**:
    - Direct shortcuts to **Smogon SV Dex** strategy analysis and **Bulbapedia** encyclopedic entries.
- **Universal Name Guards & Form Resolution Engine (`resolvePokemonData`, `SPECIAL_FORM_ARTWORK_IDS`)**:
  - **Comprehensive PokeAPI Form Artwork ID Audit & Corrections**:
    - **Forces of Nature Therian Formes**: Corrected 1-off ID shift (`landorus-therian = 10021`, `thundurus-therian = 10020`, `tornadus-therian = 10019`, `enamorus-therian = 10249`). Previously, Landorus-Therian erroneously loaded ID 10020 (Thundurus-Therian).
    - **Necrozma Form Resolution**: Fixed slug and alias mapping (`necrozma-dawnwings`, `necrozma-dawn-wings` $\rightarrow$ `10156`; `necrozma-duskmane`, `necrozma-dusk-mane` $\rightarrow$ `10155`; `necrozma-ultra`, `ultra-necrozma` $\rightarrow$ `10157`). Previously, Necrozma-Dawn-Wings defaulted to base prism Necrozma (ID 800) due to a missing alias slug.
    - **Rotom Appliance Alignment**: Corrected Rotom forms (`rotom-heat = 10008`, `rotom-wash = 10009`, `rotom-frost = 10010`, `rotom-fan = 10011`, `rotom-mow = 10012`).
    - **Ogerpon Mask Forms**: Corrected inverted mask IDs (`ogerpon-wellspring = 10273`, `ogerpon-hearthflame = 10274`, `ogerpon-cornerstone = 10275`).
    - **Mega Evolutions (All 97 Canon & Community Megas Mapped)**:
      - Full coverage of classic Gen 6 / ORAS Megas (`10033`–`10090`).
      - Added verified PokeAPI artwork IDs for all 49 newer community & mod Megas (`10278`–`10326`): **Mega Froslass** (`10285`), **Mega Dragonite** (`10281`), **Mega Meganium** (`10282`), **Mega Feraligatr** (`10283`), **Mega Greninja** (`10294`), **Mega Staraptor** (`10308`), **Mega Baxcalibur** (`10325`), **Mega Raichu X/Y** (`10304`, `10305`), **Mega Hawlucha** (`10300`), **Mega Chandelure** (`10291`), **Mega Skarmory** (`10284`), **Mega Excadrill** (`10287`), and 37 others.
      - Fixed fallback logic: Non-base forms and Megas that lack an explicit PokeAPI artwork ID now automatically fall back to the Showdown Mega sprite rather than defaulting to the base Pokémon National Dex number (`entry.num`).
    - **Regional Variants & Legends**: Corrected Mega Camerupt (`10087`), Mega Salamence (`10089`), Hisuian Typhlosion (`10233`), and Calyrex Ice/Shadow Riders (`10193`, `10194`).
  - **Universal Typo Tolerance & Spelling Normalization**:
    - Integrated the master fuzzy name resolver (`resolvePokemonData`) into the sidebar drawer pipeline (`openPokemonDetailDrawer`, `getPokemonShowdownData`, `fetchPokemonDetailData`, `buildPokemonDetailFromDex`).
    - Automatically heals common community typos (e.g. `landorous` $\rightarrow$ `landorus`, `thunderus` $\rightarrow$ `thundurus`, `tornadous` $\rightarrow$ `tornadus`, `enamarous` $\rightarrow$ `enamorus`, spaced Necrozma forms like `necrozma dawn wings` $\rightarrow$ `Necrozma-Dawn-Wings`).
  - **Auto-Cache Busting (`bellimaka_mon_v3_*`)**:
    - Bumped local storage cache version to `v3`, instantly invalidating and replacing any stale base Pokémon artwork previously cached for Megas in user browsers.

- **High-Performance In-Memory & `localStorage` Caching**:
  - Stores fetched Pokémon data in both `_pokemonDetailCache` (memory) and `bellimaka_mon_v3_*` (`localStorage`), enabling subsequent drawer opens to render instantaneously with 0ms network latency.
- **Team Sheet & Showcase High-Resolution Artwork Upgrade (`getPokemonArtworkUrl`)**:
  - **Team Roster Detail Sheet (`TeamRosterDetailView`)**: Upgraded coach team sheets from low-resolution Showdown sprites to high-resolution PokeAPI official artwork via `getPokemonArtworkUrl(monName)`.
  - **Team Showcase Cards (`renderTeamsGridHtml`)**: Upgraded tournament coach showcase overview cards so all 10 roster slots render crisp official artwork.
  - **Total Battle Games Played Next to Match Record (`getCoachTotalTournamentGames`)**: In both tournament archives and ongoing tournaments, team sheet hero headers now explicitly calculate and display the coach's total tournament battle games played alongside their match series record (e.g. `COACH: DAO MING · RECORD: 6-3  ·  21 games played`), capturing all appearances across group stage, Swiss sets, and Top Cut replays.
  - **Full Mega & Special Form Resolution**: All 97 canonical and community Megas (including **Mega Crabominable** `10315`, **Mega Banette** `10056`, **Mega Froslass** `10285`), Therian Formes (**Landorus-Therian** `10021`, **Thundurus-Therian** `10020`), Necrozma Formes (**Necrozma-Dawn-Wings** `10156`), Rotom appliances, and regional forms resolve to verified PokeAPI official artwork.
  - **Non-Base Form Fallback Guard**: Megas and special forms without explicit PokeAPI artwork IDs fall back to Showdown Mega sprites rather than degrading to base Pokémon National Dex numbers.
  - **1-Click Interactive Sidebar Drawer Navigation**: Clicking any Pokémon row on a coach's team sheet seamlessly opens the Drafteon-style detail sidebar drawer (`openPokemonDetailDrawer`) with stats, BST, and abilities, while preserving the point cost edit button independently via `event.stopPropagation()`.
  - **Automatic Artwork Margin Cropping (`autoTrimArtwork`)**: Automatically crops transparent borders using offscreen canvas trimming, ensuring consistent, edge-to-edge presentation.
  - **Zero Broken Image Fallback Chain (`handleArtworkFallback`)**: Cascades from PokeAPI Official Artwork $\rightarrow$ Showdown Sprite $\rightarrow$ Local Pokéball icon.
  - **Real-Time Cold Cache DOM Upgrade**: On cold browser caches, `ensureShowdownDex()` upgrades any rendered team sprites to official artwork in real time as soon as Showdown's Pokedex data arrives.
- **Tournament Awards High-Resolution PokeAPI Artwork & Interactive Drawer**:
  - **Major Awards (`renderMajorAwardsCardsHtml`)**: Upgraded Season MVP and Finals MVP cards (both compact and grand card layouts) to render crisp PokeAPI official artwork with auto-trimming and multi-tier fallback.
  - **Tournament Stat Leaders (`renderTournamentStatLeadersHtml`)**: Upgraded top 3 podium spotlights (Most KOs, Most Damage, Most Tanked, Most Healed, Most Support) to use official PokeAPI artwork.
  - **All-Tournament Teams of the Season (`renderTeamOfTheSeasonCardsHtml`)**: Upgraded 1st, 2nd, and 3rd All-Tournament Team cards (both compact and grand card layouts) to display full official artwork with primary type theme glows.
  - **1-Click Drawer Access from Awards**: Clicking any award winner card or leader Pokémon immediately opens the Drafteon-style detail sidebar drawer (`openPokemonDetailDrawer`) for instant inspection of base stats and abilities, with `event.stopPropagation()` preserving coach profile navigation.

---

## [v3.2.0] — 2026-10-14

### Draft Board Library, Consolidated Board Settings & Direct Library Import + Removal Bug Fix
- **Consolidated "⚙️ Board Settings" Menu (`renderBoardSettingsButton`, `toggleBoardSettingsMenu`)**:
  - **Clean Toolbar Layout**: Consolidated the crowded draft board action buttons across the Offseason Draft View and Tournament Draft Board headers into a single modern **"⚙️ Board Settings ▾"** dropdown menu, significantly reducing clutter and visual footprint.
  - **Preserved Primary Sliders**: Kept the `Private / Public` toggle slider and `Quick Edit: ON / OFF` toggle slider outside on the main header bar for rapid 1-click status changes.
  - **Categorized Actions Menu**:
    - **Presets & Library**: `📚 Saved Boards Library`, `📥 Import Directly to Library`, `💾 Save Active Board as Preset`.
    - **Active Draft Board**: `📋 Edit / Re-Import Board`, `📤 Export Board (CSV)`.
    - **Danger Zone**: `🗑️ Clear Active Board` (with confirmation modal).
  - **Interaction & Responsive Design**: Includes click-outside dismissal (`closeBoardSettingsMenu`), full keyboard/touch compatibility, and right-aligned dropdown positioning (`.board-settings-dropdown`).
- **Direct-to-Library Import Engine (`openImportDirectlyToLibraryModal`, `saveDirectlyToLibrary`)**:
  - **Independent Library Ingestion**: Added the ability to import Google Sheets columns or CSV spreadsheets straight into the Saved Boards Library as reusable presets **without overwriting or modifying the current active draft board**.
  - **Dedicated Import Modal**: Provides an intuitive workflow with custom preset naming (`#libDirectImportName`), file upload (`📁 Upload CSV File`), sample data loading, and instant multi-tier Pokémon parsing & preview (`previewLibDirectImport`).
  - **Accessible Across the Platform**: Accessible from the "⚙️ Board Settings" dropdown menu, the Saved Boards Library modal toolbar (`📥 + Import Directly to Library`), and the Library empty-state view.
  - **Clarified Importer Actions**: Updated button labels in both `openDraftBoardImporter` and `openOffseasonDraftBoardImporter` to explicitly distinguish between `💾 Save to Library Only` and `💾 Set as Active Board`.
- **Draft Board Library & Saved Presets (`savedDraftBoards`)**:
  - **Reusable Board Presets**: Added the ability to save imported draft boards as named library presets for future reuse across tournaments and offseason planning without risk of losing tier layouts.
  - **Comprehensive Preset Management**:
    - **One-Click Saving**: Save the active tournament draft board, offseason board, or newly parsed import table via "+ Save as Preset" buttons in the Draft Importer, toolbar, and Library modal.
    - **Instant Deployment (`loadBoardFromLibrary`)**: Load any saved board into an active tournament or the offseason board with confirmation, updating draft revisions, timestamps, and cloud state.
    - **Importer Editing (`loadSavedBoardIntoImporter`)**: "📋 Edit in Importer" action loads preset tiers into the Google Sheets / CSV text editor and visual preview area for adjustments before applying.
    - **CSV Export Engine (`downloadBoardCSV`, `exportSavedBoardCSV`)**: Dedicated CSV generator to download any saved preset or active draft board as an Excel/Sheets-compatible CSV spreadsheet at any time.
    - **Full Preset Lifecycle**: Rename presets (`renameBoardInLibrary`), overwrite presets with the current board (`overwriteBoardInLibrary`), and delete presets (`deleteBoardFromLibrary`) with real-time keyword search filtering.
  - **Storage & Cloud Sync Integration**:
    - Persisted locally under `'draftdex-saved-boards'` and synchronized automatically across devices via Cloudflare KV (`savedDraftBoards` in `flushSync` and `applySharedState`).
    - Included in automated `league_backup.json` export snapshots.
- **Draft Board Removal Race Condition & Auto-Reappearing Pokémon Fix**:
  - **Root Cause Resolution**: Resolved an issue where removing a Pokémon from the draft board caused it to disappear for ~0.5 seconds before popping back onto the screen. Closing the browser's native `confirm()` modal triggered the window `focus` event listener's `syncFromCloud(true)`, whose forced sync bypassed timestamp checks and overwrote the local removal with stale cloud state before `flushSync()` could upload the change.
  - **Guard Timestamps & Immediate Sync**:
    - Added `_lastLocalDraftBoardActionTime` guards to `shouldApply()` and `syncFromCloud()` preventing cloud poll overwrites within 8 seconds of any draft board modification.
    - Updated `saveEditedBoardPokemon`, `deleteBoardPokemon`, and `saveNewBoardPokemon` to immediately trigger `flushSync()` and `syncDraftStateToCloud()` synchronously.
    - Guaranteed simultaneous pruning across `t.draftData.board`, `offseasonDraftBoard`, and `draftPool.items`.
    - Passed explicit tournament context (`tId`) through `openDraftConfirmationModal`, `openOffseasonMonDetailModal`, and `openEditBoardPokemonModal` to prevent fallback ambiguity.

---

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
- **Bellimaka Broadcast Interactive Playoff & Championship Simulator (`playoffOdds`)**:
  - **2-Column Broadcast Split Layout (`.nyt-sim-layout`)**:
    - Replaced the 3-column card grid with an interactive 2-column simulator layout pairing a streamlined **6-Column Playoff & Seeding Projections Table** on the left (`.nyt-table-card`) with a sticky **Interactive "What-If" Match Simulator Rail** on the right (`.nyt-picker-rail`).
    - Styled natively in Bellimaka's broadcast visual language using bold `'Barlow Condensed', sans-serif` headers, rank badges, records, probability cubes, and status pills paired with `'Plus Jakarta Sans', sans-serif` subtitles and single-line scenario notes.
  - **Interactive "What-If" Scenario Picker & Live Probability Deltas (`computeWhatIfStage1Sim`, `computeWhatIfTopCutSim`)**:
    - Side-by-side matchup cards (`minmax(0, 1fr) auto minmax(0, 1fr)`) with mini coach avatars (`.nyt-side-avatar`), live records, and head-to-head win probabilities let users click any unplayed Stage 1 match or Top Cut bracket set to hypothetically pick a winner (`2–0 Sweep` vs `2–1 Close`).
    - Immediately runs a 1,200-iteration seeded Monte Carlo simulation + exact tiebreaker solver on the hypothetical tournament state and displays live **`▲ +X%` / `▼ -Y%` delta badges** (`.nyt-delta`) next to each coach's probabilities in the table.
    - Clicking any coach row in the projections table focuses the right-hand What-If Simulator rail on that coach's remaining schedule (`togglePlayoffOddsCoachFocus`), with a quick `↗` button to open their Coach Profile modal.
  - **Balanced Pre-Tournament Parity & Live Form Takeover (`getPlayerTournamentPower`, `computeCalibratedMatchWinProb`)**:
    - Removed double-counting between career OVR and raw Elo in `getPlayerTournamentPower` and recalibrated baseline power (`1000 + (ovr - 76) * 4.2`, logistic scale `160`, head-to-head match cap `18%–82%`).
    - Weighted live tournament performance heavily (`(w - l) * 52 + (gw - gl) * 18` in Stage 1 and `tcWins * 28` in Top Cut) so actual wins, losses, and game differential rapidly overtake pre-tournament priors once matches begin.
  - **Phase 1: Streamlined 6-Column Playoff Projections Table & Cutline Divider**:
    - Displays **Rank (`#1`, `#2`...)**, **Coach & Team**, **Record (`W–L (±GD)`)**, **Make Top Cut %** (inline progress bar + heatmap cube pill + What-If delta), **#1 Seed %** (heatmap cube pill + What-If delta), and **Status & Scenario** (Bellimaka status pill + concise 1-line note).
    - Renders a dashed gold **`▲ TOP K PLAYOFF CUTLINE ▲`** divider row (`.nyt-cutline-bar`) separating projected qualifiers from bubble contenders, with crimson/dark broadcast filter pills to filter by Group or toggle sorting between `Sort: Playoff %` and `Sort: Standings`.
  - **Mathematically Verified Playoff Scenario Solver (`solveExactCoachPlayoffScenario`, `computeCoachPlayoffScenario`)**:
    - Evaluates all combinatorial score branches (`2-0`, `2-1`, `1-2`, `0-2`) in the final rounds directly against the tournament's official tiebreaker hierarchy (`evaluateStandingsForMatches` / `getStandingsCriteria(t)`).
    - Distinguishes exact scenarios without misleading coaches: `✓ Clinched Top Cut`, `⚡ Win or Go Home`, `⚡ Do or Die (2-0)`, `🔥 Win and In`, `🔥 2-0 Clinches`, `🔥 Controls Destiny`, `⚡ Must Win Out`, `⚠️ Must-Win + Help`, `⏳ Awaiting Results` (in the clubhouse), and `✗ Eliminated`.
  - **Phase 2: Live Top Cut Championship Bracket Simulator (`simulateTopCutBracketOdds`)**:
    - Automatically activates when the tournament advances to `Top Cut` (`t.phase === 'topcut'`), with a header switcher to toggle back to the Phase 1 Opening Stage Playoff Projections table at any time.
    - Pairs the **Top Cut Championship Projections Table** (`Make Finals %`, `Win Title %`, Implied Moneyline, Bracket Life status, and Next Matchup) with the **Bracket "What-If" Picker** for active Upper Bracket, Lower Bracket, and Grand Finals sets.

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