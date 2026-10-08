# Bellimaka League — Changelog

All notable changes to the Bellimaka Pokémon Draft League platform are documented here.
Format: `v[MAJOR].[MINOR].[PATCH]` — Major = major system overhauls, Minor = new features, Patch = bug fixes and visual improvements.

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