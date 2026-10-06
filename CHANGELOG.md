# Bellimaka League — Changelog

All notable changes to the Bellimaka Pokémon Draft League site are documented here.
Format: `v[MAJOR].[MINOR].[PATCH]` — Major = big new systems, Minor = new features, Patch = bug fixes / small improvements.

## [v2.3.16] — 2026-10-06

- **Discord Match Card Single-Line Large Team Names & Auto-Fit**:
  - **Single-Line Max Impact Typography**: Replaced the 2-line split team names on the Discord webhook match card graphic (`generateMatchCardDataUrl`) with commanding single-line team names in `Saphifen`, filling the wide open middle broadcast space left vacant by the absence of the team Pokémon highlight strip.
  - **Dynamic Auto-Fit Font Scaling**: Configured a bold `62px` base font size with intelligent auto-fit downscaling (min `36px`) constrained to a safe `630px` width boundary, ensuring extra-long team names never collide with the coach avatar while maximizing presence and impact across the canvas.
  - **Balanced Broadcast Diagonal Anchoring**: Positioned the top team name left-aligned (`x = 42px`) and the bottom team name right-aligned (`x = w - 42px = 858px`), perfectly centered vertically between the hashtag ribbons and center seam.
  - **Clean Single Parentheses Record Fix**: Updated `formatRecordParen()` to strip any existing parentheses before formatting, eliminating accidental double-parentheses (e.g. `((4 - 1))` -> `(4 - 1)`).

---
## [v2.3.15] — 2026-10-06

- **Interactive Discord Message & Embed Preview Modal**:
  - **Live Discord Announcer Simulation**: Clicking "Test Scores" or "Test Draft" in the Discord Webhook Settings Modal now opens an authentic interactive Discord dark-mode client preview popup modal, allowing moderators to visually verify how announcements and embeds look in Discord.
  - **Primetime Match Card Preview (#match-results)**:
    - Renders the high-resolution 900x450 Primetime graphic on the fly via `generateMatchCardDataUrl()`, showcasing the metallic gold frame, Barlow Condensed score pill, Saphifen team names, winner green glow ring, and authentic loser defeat fadeout.
    - **Interactive Scenario Switcher**: Added one-click scenario toggles (`🏆 Player 1 Wins (2-0)`, `🏆 Player 2 Wins (0-2)`, `🤝 Tie (1-1)`) and stage toggles (Group Stage vs Top Cut Playoffs) that regenerate and update the graphic in real time.
    - Displays Discord bot header (`Bellimaka Bot` with blue `[BOT]` badge and timestamp), match result headline, and red `#EF3038` sidebar embed.
  - **Live Draft Pick Preview (#draft-room)**:
    - Renders live draft announcements with Pokémon Showdown sprites, roster progress, cost, pick number, remaining budget, and highlighted Discord `@pings` on the clock.
    - Includes interactive sample pick selector (Ethan drafting Meowscarada, Ozy drafting Iron Valiant, Jace drafting Garchomp, and Draft Complete final pick).
  - **Dual Action Bar & Form State Persistence**:
    - Added "📤 Send Real Test to Discord" button directly inside the preview modal with instant delivery status feedback.
    - Added "← Back to Settings" navigation that preserves any typed webhook URLs or coach Discord IDs in memory (`_tempDiscordConfig`) without losing user input.

---
## [v2.3.14] — 2026-10-06

- **Primetime-Matched Discord Webhook Match Result Graphics**:
  - **Broadcast-Grade Card Rendering**: Completely redesigned `generateMatchCardDataUrl()` to generate high-resolution (900x450, 2:1) match result graphics for Discord webhooks that match the website's Primetime card design to a T.
  - **Loser Defeat Fadeout**: Implemented authentic desaturation and darkening (`grayscale(60%) brightness(65%) contrast(92%)`) on the defeated coach's half, dynamically contrasting with the bright, saturated winning half.
  - **Luminous Gold Border & Top Subbar**: Framed the Discord card with the new multi-stop metallic radiant gold border (`#ffd166` to `#ffeaa7` to `#f59e0b`) and a clean broadcast header featuring the stage name and green `FINAL SCORE` badge.
  - **Curved Agency FB Records & Staggered Saphifen Typography**: Rendered the team names in staggered bold `Saphifen` and coach avatars with glowing winner rings and floating gold `Agency FB` record pill badges anchored along the avatar curves.
  - **Center Score Capsule**: Centered floating dark pill seam badge with vibrant green winning score digits in `Barlow Condensed` and faded loser digits.

---
## [v2.3.13] — 2026-10-06

- **Continuous Radiant Gold Border & Primetime Cover Cleanup**:
  - **Continuous Luminous Gold Border**: Replaced the previous brown-fading diagonal gradient (`#6e461f` / `#2a2230`) across all Primetime matchup spotlight cards with a continuous, vibrant multi-stop gold metallic frame (`#ffd166` to `#ffeaa7` to `#f59e0b`). Both side walls now remain bright, crisp, and high-contrast without fading into the dark background.
  - **Seamless Border Contact (Removed Dark Seam)**: Applied `border: none !important;` to `.matchup-hero-card` to eliminate the inherited 1px dark slate `--line` border, allowing the team background and ribbons to meet the gold frame directly without any dark gap.
  - **Removed "Edit cover" & Unused Cover Storage**: Removed the obsolete `[Edit cover]` button from the Primetime matchup header subbar and eliminated unused background cover overlay logic, keeping the header clean with only the `[📌 PIN FEATURE]` control.

---
## [v2.3.12] — 2026-10-06

- **Avatar-Curved Floating Records & Main Tournament Cover Aspect Restoration**:
  - **Avatar Curve Record Anchoring**: Relocated the `(wins - losses)` record text directly onto each coach's circular avatar in floating bold gold `Agency FB` with deep dual drop-shadows:
    - Top Player (Coach 1): Anchored at the **bottom curve** of the avatar circle (`bottom: -8px`), pointing inwards toward the center seam.
    - Bottom Player (Coach 2): Anchored at the **top curve** of the avatar circle (`top: -8px`), pointing inwards toward the center seam.
  - **Restored Compact Card Height (Eliminated Cover Image Stretching)**: Reverted `.primetime-cfb-half` minimum height from 178px back to 150px (125px on mobile), preventing the right-hand sidebar from over-expanding and allowing the tournament hero cover photo (Blastoise) to display in its natural, unstretched aspect ratio.
  - **Pristine 2-Line Team Names (Zero Clipping)**: Returned the team name block to a clean 2-line layout with diagonal stagger, providing generous vertical breathing room with zero risk of banner collision or top glyph clipping.

---
## [v2.3.11] — 2026-10-06

- **Agency FB Record Font & Centered Vertical Breathing Room**:
  - **Agency FB Typography for Records**: Switched `.primetime-cfb-record-line` to `Agency FB` (`font-weight: 800; font-size: clamp(21px, 3.0vw, 26px); letter-spacing: 2.2px`), delivering clean, collegiate, broadcast-grade number styling.
  - **Eliminated Top Glyph Cropping**: Added `padding-top: 6px`, `padding-bottom: 4px`, and `line-height: 1.25` so tall parentheses and digits never get shaved or clipped by text gradients or bounding boxes.
  - **Centered Card Spacing (Cleared Outer Banners)**:
    - Expanded `.primetime-cfb-half` min-height to `178px` (`138px` on mobile).
    - Increased top card padding to `46px` on top (`34px` on mobile), shifting the team name down and away from the top hashtag ribbon.
    - Increased bottom card padding to `46px` on bottom (`34px` on mobile), shifting the record line up and away from the bottom hashtag ribbon.

---
## [v2.3.10] — 2026-10-06

- **Streamlined Primetime Card & Saphifen Record Line**:
  - **Removed Redundant Badges**: Removed the amber coach name tag, career overall badge (`OVR`), and black record pill badge from both top and bottom match spotlight cards for a cleaner, bolder collegiate broadcast look.
  - **New Saphifen (Wins - Losses) Typography**: Introduced `.primetime-cfb-record-line` displaying records in `Saphifen` font (e.g. `(3 - 1)` / `(4 - 1)`).
  - **High-Contrast Gold with Heavy Dark Outline**: Styled the record text in amber/gold (`#ffd166`) with dual deep drop-shadows and outline protection, ensuring 100% legibility on light and yellow card backgrounds.
  - **Step 3 Staircase Diagonal Stagger**: Positioned the record line directly below the team names, following the diagonal card slant as Step 3 (`padding-left: clamp(32px, 6.4vw, 72px)` on top card, `padding-right: clamp(32px, 6.4vw, 72px)` on bottom card).
  - **Live Studio Branding Modal Sync**: Updated live editor preview (`#bbLiveRecord`) to mirror the new 3-step typographic format.

---
## [v2.3.9] — 2026-10-06

- **Primetime Team Name Equal Sizing & Balanced Diagonal Stagger**:
  - **Matched 2nd-Line Font Size**: Promoted `.primetime-cfb-team-name-l2` to match `.primetime-cfb-team-name-l1` font size at `clamp(28px, 4.2vw, 42px)` on desktop and `clamp(20px, 5.4vw, 26px)` on mobile.
  - **Unified Visual Styling**: Upgraded Line 2 to 900 font weight, full silver-white gradient highlight, 2px letter-spacing, and dual drop-shadow effects with tightened vertical spacing (`margin-top: 0`).
  - **Inward Diagonal Stagger Alignment**: Configured balanced inward diagonal stepping matching the card slant angle (top card steps right with `padding-left: clamp(16px, 3.2vw, 36px)`, bottom card steps left with `padding-right: clamp(16px, 3.2vw, 36px)`).
  - **Live Studio Branding Modal Sync**: Updated live editor preview (`#bbLiveTeamL2`) from 16px to 26px to match the active match spotlight card.

---
## [v2.3.8] — 2026-10-06

- **Logo Placement Alignment & Asset Separation**:
  - **Top-Left Site Header Brand**: Assigned `bellimaka_logo.jpg` (the cartoon Darumaka badge) to the top navigation header banner (`.brand`) and mobile navigation drawer.
  - **Browser Tab Header (Favicon)**: Assigned `bellimaka_logo.png` (transparent background) with cache-busted `?v=2.3.8` query parameters to browser tab favicon, shortcut icon, and apple-touch-icon tags in `<head>`.
  - **Multi-Tier Fallback Resilience**: Updated `handleLogoError()` fallback sequence to prioritize JPG paths before falling back to PNG and root directory assets.

- **Moderator Mode Refresh Persistence**:
  - Fixed moderator mode state restore so that refreshing in spectator or player mode (`draftdex-mod-mode: 'off'`) respects user preference instead of reactivating moderator mode unconditionally.

- **Zero-Flash Account Screen Hydration**:
  - Synchronously restored `sessionUser` and `window.currentAccount` from `draftdex-cf-session` at initial script parse time prior to the first synchronous render.
  - Eliminated the brief flash of the Sign In / Trainer Portal form when refreshing or directly loading the 'Your Account' screen.

---
## [v2.3.7] — 2026-10-06

- **Authoritative Cloud State Hydration & Stale Cache Recovery**:
  - **Unconditional Initial Boot Cloud Sync**:
    - Overhauled `shouldApply(incoming, force)` to ensure initial boot syncs and non-moderator sessions unconditionally accept authoritative cloud tournament data from Cloudflare Worker.
    - Fixed the desync bug where local browser storage with bumped revision counters or newer clock timestamps would falsely reject authoritative cloud state, causing the site to display a stale pre-playoffs snapshot (Ethan vs Gavin).
  - **Top Cut Playoff Metrics & Recent Results Alignment**:
    - Resolved `completedTopCutMatches` counter so playoff fixtures accurately reflect completed Top Cut matches (`1 / 10`) and display current playoff results (`Ethan vs Dao Ming`) in Recent Results.
  - **Cloudflare Worker Response Streaming (Error 1102 Fix)**:
    - Stream raw KV JSON directly from Cloudflare KV without expensive `JSON.parse` and `JSON.stringify` cycles, eliminating Cloudflare CPU timeout errors.
  - **On-Demand Resync Utility**:
    - Exposed `window.forceSyncLeague()` to immediately fetch and render the latest cloud state.

---
## [v2.3.6] — 2026-10-06

- **Header Logo & Browser Tab Favicon Bulletproofing**:
  - **Favicon Multi-Format & Root Discovery**:
    - Added `<link rel="icon" type="image/x-icon" href="favicon.ico?v=2.3.6">`, `<link rel="icon" type="image/png" sizes="32x32" href="Fonts%20%26%20Logos/bellimaka_logo.png?v=2.3.6">`, and `<link rel="shortcut icon">` with cache-busting version query string `?v=2.3.6` to bypass sticky browser tab favicon caching.
    - Placed `favicon.ico` and `bellimaka_logo.png` directly into the repository root for automatic browser `/favicon.ico` discovery.
  - **Multi-Stage Resilient Header Logo Fallback**:
    - Standardized `.brand` header logos in the topbar and mobile drawer to use `bellimaka_logo.png`.
    - Implemented an automated multi-stage fallback handler (`handleLogoError`) that sequentially tries URL-encoded and unencoded paths across both PNG and JPG formats (`Fonts & Logos/` and root) to guarantee the logo loads in every environment (local file system, live server, GitHub Pages).

---
## [v2.3.5] — 2026-10-06

- **Ticker Ribbon Alignment (Agency FB at 15px)**:
  - Preserved **Agency FB** as the dedicated font for the hashtag ticker ribbon (`.primetime-ticker-static` and `#bbLiveRibbon`).
  - Set `font-size: 15px` with `letter-spacing: 2px` to smooth out font hinting, maintaining authentic broadcast aesthetics.

- **Full Real Team Name Display (Zero Ellipsis & Zero Clipping)**:
  - Eliminated the `text-overflow: ellipsis` truncation issue that caused names to cut off with ellipses (e.g. "NETANY...", "고...").
  - Configured `overflow: visible` with responsive font sizing (`clamp(28px, 4.2vw, 42px)` for L1 and `clamp(16px, 2.6vw, 23px)` for L2), ensuring full real names always display completely.
  - Adjusted line-height to `1.16` (L1) and `1.14` (L2) with micro-padding so tall Hangul characters (like Jace's "고양시"), accents, and italic slant edges never get clipped at the top or sides.
  - Preserved the staggered 2-line collegiate broadcast layout.

- **Saphifen Font Remapping & Comprehensive Character Support**:
  - **Full Support for Numbers, Letters, and Accents**:
    - Remapped `@font-face` definitions for `'Saphifen'`, `'Agression'`, and `'Aggression'` to `Fonts & Logos/Saphifen.otf` and `Fonts & Logos/Saphifen.ttf`.
    - `Saphifen` includes complete vector contours for all digits `0`–`9`, uppercase `A`–`Z`, lowercase `a`–`z`, and Latin accented characters (e.g. `é`, `è`, `à`, `ñ`), guaranteeing names like "5 Espurrs in A trenchcoat" render without missing numbers or fallback gaps.
    - Updated Primetime team name font stacks (`.primetime-cfb-team-name-l1`, `.primetime-cfb-team-name-l2`, and `.primetime-cfb-team-name`) to lead with `'Saphifen'`.

- **Unified Asset Consolidation (`Fonts & Logos/`)**:
  - **Comprehensive Path Rewiring**:
    - Re-routed all fonts, brand logos, background textures, and fallback assets to the consolidated `Fonts & Logos/` directory:
      - Fonts: `Agression.otf`, `Agression.ttf`, `AgencyFB-Bold.ttf`, `Another Danger Slanted - Demo.otf`.
      - Logos & Icons: `bellimaka_logo.png` (favicon), `bellimaka_logo.jpg` (topbar & mobile navigation), `iconNotFound.png` (Pokéball fallback sprite & Add Pokémon modal).
      - Textures: `cfb-splash-texture.jpg` (Primetime matchup graphic grunge overlay).
    - Applied URL-encoded fallbacks (`Fonts%20%26%20Logos/` and `Fonts & Logos/`) across CSS `@font-face`, `background-image`, HTML `<link>` / `<img>`, and JavaScript sprite handlers in both `index.html` and `index.dev.html`.

---

## [v2.3.4] — 2026-10-05

### Fixed & Improved
- **ESPN Primetime Spotlight Visual Enhancements**:
  - **Full Box Corner Color Saturation**:
    - Eliminated dark, murky corners across the Primetime card halves by removing the 40px dark inset shadow (`box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.7)`) from `.primetime-cfb-stage`.
    - Removed the darkening corner radial vignette in `.primetime-cfb-half::before`.
    - Adjusted gradient color stops in `getBattlewornBg(color, isTop)` so coach and team colors saturate fully edge-to-edge into all corners with rich color uniformity.
    - Balanced the grunge splash layer opacity from `0.82` to `0.35` so background textures complement rather than diminish team colors at the edges.
  - **Square Team Color Box Corners**:
    - Eliminated inner rounded corners on the Primetime matchup cards by setting `border-radius: 0` on `.primetime-cfb-stage` and both `.primetime-cfb-half` team sections.
    - Team color backgrounds now extend as crisp, flush rectangular blocks without any rounded corners exposing dark gaps.
  - **Uncrowded Sub-Row Layout & Winner Tag Removal**:
    - Removed the redundant `👑 WINNER` and `FINAL` badges from the coach sub-rows, eliminating text overflow and preventing pills from crowding or shifting into Pokémon cards and avatar logos.
    - Preserved the clean, high-contrast faded styling on the loser (`.is-loser`) as the sole, elegant outcome indicator.
  - **Agression Font Integration (Numbers & Accents Support)**:
    - Added `@font-face` definitions for the newly added `Agression.otf` and `Agression.ttf` font files (supporting both `'Agression'` and `'Aggression'` font-family names).
    - Swapped out `'Another Danger'` in `.primetime-cfb-team-name-l1`, `l2`, and single-line team names for `'Agression'`, delivering superior character coverage for digits (e.g. "Team 1") and accented international characters (e.g. Vietnamese Hà Nội, Spanish, French).
  - **Consistent Solid Center Seam Divider Line**:
    - Resolved the horizontal seam divider losing color and fading from white in the center to black/transparent at the sides.
    - Updated `.primetime-cfb-seam` to a solid, edge-to-edge white line (`#ffffff`, 2.5px height) with a subtle broadcast glow (`box-shadow: 0 0 6px rgba(255, 255, 255, 0.45)`), ensuring a single, solid color all the way across.
  - **Winner vs. Loser Visual Distinction**:
    - Added dynamic `.is-winner` and `.is-loser` state styling to `.primetime-cfb-half` for completed matches.
    - The losing team's half is automatically faded and greyed out (`filter: grayscale(0.58) brightness(0.68) contrast(0.92); opacity: 0.72`), highlighting the outcome clearly while remaining interactively readable on hover.
    - The winning team's half stays vibrant (`filter: brightness(1.05) saturate(1.1)`) with winning score glow in the center seam.

- **Double Elimination Losers Bracket Progression Fix**:
  - **LB Round 2 Match 2 Self-Play Elimination**:
    - Fixed a bug where LB Round 2 Match 2 displayed Ethan playing himself (`#2A Ethan` vs `#2A Ethan`) with replays attached instead of waiting for the loser of WB Semi 1.
    - Corrected slot alignment in `lb2Matches` for Double Elimination (`count === 8`) so opponent 1 accurately maps to `wb2Matches[0]?.loser` (`Loser WB Semi 1`) and opponent 2 maps to `lb1Matches[1]?.winner` (`Winner LB R1.2`, Ethan).
    - Hardened stage match resolution with fallback to unplayed origin labels (`originP1` / `originP2`), ensuring slots stay as `"Loser of WB Semi 1"` until WB Semifinal 1 concludes.
    - Implemented self-play conflict guards (`if(isKnownPlayer(m.p1) && m.p1 === m.p2)`) across `lb2Matches`, `lb3Matches`, `lb4Matches`, `gfMatches`, and globally across `allBracketMatches.forEach` to ensure a player can never be paired against themselves site-wide.
    - Guarded replay attribution in `isReplayListForCoaches` to prevent replays from attaching to identical coaches.

---

## [v2.3.3] — 2026-10-05

### Fixed & Improved
- **Top Cut Playoff Replays & Recent Results Integration**:
  - **Recent Results Playoff Replays Display**:
    - Fixed playoff matches in "RECENT RESULTS" (`allResults(t)` on the Home page) displaying only `+` instead of full replay pills (`▶ 1`, `▶ 2`, `▶ 3`) and the box score button (`📊`).
    - Resolved root cause where `allResults` discarded match metadata (`replays`, `actualMatchId`, `matchId`, `id`, `tournamentId`) and prioritized stripped `t.topCutCache.results` over the full bracket model.
    - Overhauled `allResults(t)` to prioritize `getTournamentTopCutModel(t).completedList`, preserve full match metadata, attach replays via `getMatchTopCutReplays`, and ensure `tournamentId` is retained on all returned matches.
    - Top cut match cards rendered via `matchCard(m)` now immediately display all game replay buttons (`▶ 1`, `▶ 2`, `▶ 3`) alongside the box score button (`📊`) and add button (`+`).
    - Clicking any replay button or clicking the match card body directly launches the Showdown Replay Hub modal with video playback and box score statistics.
  - **Playoff Replay Key & Association Engine**:
    - Introduced `getMatchTopCutReplays(t, m, matchKey)` and `getMatchTopCutReplayKey(t, m, matchKey)` with multi-tier resolution across `actualMatchId`, `matchId`, `id`, prefixed `tc_` keys, and participant coach matching.
    - Synchronized `findTournamentMatch` so bracket matches can be located seamlessly by participant coaches even without explicit `tc_` prefixes.
    - Updated `saveReplayToMatch` to store `p1` and `p2` on replay objects and index `t.topCutReplays` by both raw and `tc_`-prefixed match identifiers.
    - Updated `openAddReplayModal` to identify previously uploaded playoff games and display overwrite indicators.
    - Upgraded Top Cut awards calculation to use `getMatchTopCutReplays` instead of legacy direct property checks.

  - **Call Stack Recursion Prevention & Reentrancy Guard**:
    - Resolved `Uncaught RangeError: Maximum call stack size exceeded` triggered at line 15411 during Top Cut model resolution.
    - Eliminated circular calls where `isReplayListForCoaches` and `getMatchTopCutReplayKey` re-invoked `getTournamentTopCutModel` while the model was already computing bracket matches.
    - Implemented a strict reentrancy guard (`_inGetTournamentTopCutModel`) with a `try...finally` block inside `getTournamentTopCutModel(t)` to ensure recursive calls safely abort and never blow the call stack.
    - Swapped external helper calls inside `getTournamentTopCutModel` for direct property inspection on `t.topCutReplays` and raw bracket participant metadata.

---

## [v2.3.2] — 2026-10-05

### Fixed & Improved
- **ESPN Primetime Spotlight: In-Frame Logos, High-Contrast OVR Badges & Impact-Driven Showcase**:
  - **Fully In-Frame Team Logos**:
    - Centered circular team/coach logos vertically (`top: 50%; transform: translateY(-50%)`) and inset them from the outer frame edges (`clamp(16px, 2.2vw, 28px)` on desktop, `12px` on mobile).
    - Adjusted logo diameter to `clamp(118px, 14.5vw, 136px)` so circular profile pictures and logos remain 100% within the frame without being awkwardly clipped or cut off at container corners.
    - Synchronized Broadcast Branding Studio live preview modal (`#bbLiveLogo`) to accurately match the in-frame placement.
  - **High-Contrast Career OVR & Record Badges**:
    - Completely redesigned the overall rating pill (`.primetime-cfb-ovr-pill`) with an opaque pitch-black (`#09090f`) background, solid `#ffd166` gold border, outer shadow, and distinct two-part typography (`.ovr-lbl` in light slate `#cbd5e1`, `.ovr-num` in bold glowing gold `#ffd166`).
    - Guaranteed crisp readability across all light, neon, pastel, or dark coach theme backgrounds (e.g., cyan, bright yellow, pastel green).
    - Enhanced `.primetime-cfb-record-pill` with solid dark backing for unified broadcast badge aesthetics.
  - **Impact Score & Performance-Driven Roster Spotlight**:
    - Overhauled `getMatchupShowcasePokemon(tourn, m, coach)` to dynamically identify each coach's top performers based on real tournament match stats (`getTournamentPokemonStatsMap`) rather than arbitrarily picking the first 4 drafted Pokémon.
    - Ranks Pokémon via a composite impact formula (`impact * 1.0 + kills * 75 + damage * 0.12`), taking into account official tournament Impact Scores, kills, and damage dealt across all season and playoff replays.
    - Displays kill count (`X KO`) or Impact Score (`⚡Y`) badges (`.primetime-mon-stat-badge`) directly on Pokémon spotlight cards with detailed tooltip breakdowns.
    - Dynamically labels the center showcase as `"⚡ KEY PERFORMERS"` for finished matches, `"⚡ IMPACT LEADERS"` for upcoming matches with season stats, and `"ROSTER SPOTLIGHT"` for early-season drafts.

---

## [v2.3.1] — 2026-10-05

### Fixed & Improved
- **ESPN Primetime Spotlight: Frame Rearrangement, Seam Bleed Fix & Color Splash Texture**:
  - **Center Seam Containment & Bleed Elimination**:
    - Fixed the bottom profile picture (e.g., Gible) bleeding across the horizontal center seam line into the top team's row.
    - Set `overflow: hidden` and dedicated corner border radii (`border-top-left-radius: 9px; border-top-right-radius: 9px` on top; `border-bottom-left-radius: 9px; border-bottom-right-radius: 9px` on bottom) on `.primetime-cfb-half`.
    - This physically prevents any logo from ever crossing the seam line vertically into the other half, while cleanly preserving the ~20% outer-corner cutoff against the exterior frame.
  - **Center Void Elimination & Active Roster Showcase**:
    - Eliminated the massive empty void in the middle of each team's row between the team name and the corner logo.
    - Rearranged the layout into a purposeful, high-energy 3-part broadcast presentation: `[ Team Name Info ]` — `[ ⚡ Key Performers Roster Strip ]` — `[ Corner Cutoff Logo ]`.
    - Rendered `.primetime-cfb-center-showcase` containing up to 4 Pokémon performer mini-cards with hover lift and team glow effects (`renderMonCards` via `getMatchupShowcasePokemon`), with fallback placeholders for unplayed matchups.
    - Added coach overall rating pills (`.primetime-cfb-ovr-pill`, e.g. `OVR 88`) next to coach tags.
    - Added responsive tablet (`@media (max-width: 880px)`) and mobile (`@media (max-width: 640px)`) rules to dynamically adapt card count and spacing.
  - **Authentic Diagonal Color Splash Background Texture**:
    - Purged the dark blob stains and floating rock polygons from the background.
    - Replicated the authentic diagonal color splash and screenprint grit texture from user reference `media_1791252556221.jpg`:
      - Integrated `cfb-splash-texture.jpg` as an independent `.primetime-cfb-splash-layer` overlay (`mix-blend-mode: overlay`) with opposing diagonal orientation per half.
      - Generated dynamic two-tone directional background gradients (`linear-gradient(125deg...)` for top, `305deg` for bottom) in `getBattlewornBg`.
      - Augmented with high-contrast dry-brush scrape slashes and 60+ aerosol paint splatter particles in `getCfbScratchOverlayHtml`.

---

## [v2.3.0] — 2026-10-05

### Added & Improved
- **ESPN Primetime Spotlight Matchup Graphic Overhaul**:
  - **Local Font Files Integration (`@font-face`)**:
    - Embedded `'Another Danger'` referencing `Another Danger Slanted - Demo.otf` for authentic distressed sports team name typography.
    - Embedded `'Agency FB'` referencing `AgencyFB-Bold.ttf` for condensed broadcast hashtag ribbon text.
    - Configured relative font URLs and local fallbacks for seamless cross-platform rendering on both local development and GitHub Pages.
  - **Team-Colored Inset Hashtag Ribbons**:
    - Replaced generic solid black ribbons with dynamic, team-colored banners tinted a few shades lighter and richly saturated (`getBannerShade` / `getBannerTextColor`).
    - Inset ribbons by 8px (`top: 8px` / `bottom: 8px`, `6px` on mobile) leaving an authentic strip of team-colored background above and below each ribbon.
    - Styled ribbons with broadcast-grade double white pin-stripe border rules (`border-top: 1px solid rgba(255,255,255,0.5)` and `border-bottom: 1px solid rgba(255,255,255,0.4)`).
    - Set ribbon typography to uppercase bold `'Agency FB'` with clean star dividers (`★`).
  - **Layering & Z-Index (Ribbons Underneath Giant Cutoff Logos)**:
    - Ribbons run continuously across the card at `z-index: 2`.
    - Team logos are positioned as direct children of the half containers at `z-index: 5`, allowing the logos to overlap directly over the ribbons and center seam while the ribbons pass smoothly underneath.
  - **Giant Out-Of-Frame Logos with Boundary Cutoff**:
    - Enlarged team logo medallions to giant broadcast proportions (`clamp(155px, 20vw, 195px)` on desktop, `clamp(105px, 26vw, 130px)` on mobile) with 4.5px crisp white borders, inner bevels, and drop-shadows.
    - Cut off ~20–25% of the logos off-screen against the outer corners (`.top-right` right: `clamp(-38px, -4.5vw, -50px)`, top: `clamp(-18px, -2.2vw, -28px)`; `.bottom-left` left: `clamp(-38px, -4.5vw, -50px)`, bottom: `clamp(-18px, -2.2vw, -28px)`), clipped cleanly by the card frame (`overflow: hidden; border-radius: 9px`).
  - **Authentic Chipped Paint & Peeling Wall Texture**:
    - Completely removed all diagonal straight slash lines that imparted a brushed-metal feel.
    - Implemented authentic chipped paint flakes using irregular polygon chips (`<polygon points="...">`) with dark substrate pits and white flaked paint lip highlights.
    - Added organic meandering and branching hairline paint cracks with dual-pass dark fissure depths and light primer highlights.
    - Added chipped paint notches along the center divider seam replicating real painted broadcast stage wear.
    - Shifted radial background gradients (`getBattlewornBg`) to rich, pure painted wall tones without glaring center specular hotspots.
  - **Font Accent & Apostrophe Normalization (`cleanDisplayTeamName`)**:
    - Auto-normalizes Latin diacritics and apostrophes (e.g., `HÀ NỘI` -> `HA NOI`, `NETANYAHU'S` -> `NETANYAHUS`, `POKÉMON` -> `POKEMON`) so all Latin team names render seamlessly without character gaps or missing glyphs in `'Another Danger'`.
    - Preserves Korean Hangul syllables (e.g., `고양시`) and CJK ideographs via NFC recomposition, falling back to bold italic athletic typography.
  - **Two-Line Team Names & Broadcast Studio Split**:
    - Split team names into two staggered lines: Line 1 (`.primetime-cfb-team-name-l1`) for City / State / Prefix, and Line 2 (`.primetime-cfb-team-name-l2`) for Mascot / Nickname in 'Another Danger' font with staggered indent depth.
    - Added dedicated "Line 1 · City / Prefix" and "Line 2 · Mascot / Nickname" inputs to the Broadcast Branding editor (`openBroadcastBrandingEditor`), with smart auto-split fallback.
    - Upgraded the Studio Live Preview modal to reflect the new inset ribbon, chipped paint overlay, and corner logo cutoff.
    - Added a direct "📺 Studio" button in coach profile cards for quick one-click access.

---

## [v2.2.9] — 2026-10-05

### Added & Improved
- **Top Cut Prediction Bracket Universal Lock**:
  - **First-Match Universal Lock (`isTopCutPredictionLocked`)**: The entire Top Cut prediction bracket now locks automatically as soon as the first non-BYE playoff match is completed with a winner recorded. This prevents downstream prediction alteration once live playoff matches are underway and preserves the competitive integrity of chained bracket prediction points.
  - **Subtle Read-Only State**: When locked, all trainer rows smoothly transition to read-only mode (`isClickable = false`), removing the pointing cursor and hover glow while displaying informative locked tooltips and updating the bracket subtitle to `"Picks locked — Playoff matches underway."`.
  - **Universal Guard**: Enforced the lock guard across both `saveBracketPredictionPick` and `savePredictionPick` strictly for all users, including moderators.

---

## [v2.2.8] — 2026-10-04

### Added & Improved
- **Prediction Ballot Ultra-Wide Viewport & Regular Season Archive**:
  - **Expanded Ballot Modal Sizing**: Expanded the prediction ballot modal window (`.ballot-view-modal`) from a cramped 1350px / 96vw to an ultra-wide format (`width: min(1650px, calc(100vw - 24px)) !important; max-width: calc(100vw - 24px) !important; max-height: 94vh !important;`). All 4 rounds of the Top Cut Bracket (Quarterfinals, Semifinals, Winners Final, and Grand Finals) now fit comfortably side-by-side on desktop displays without horizontal scrollbars, while narrower screens retain smooth horizontal scrolling.
  - **Restructured Regular Season Archive Section**: In playoff and top-cut tournament phases, replaced the generic "Additional Predictions (23)" card dump with an authentic "📜 Regular Season Archive" presentation matching group-stage formatting:
    - **Group Stage Winners (45 PTS each)**: Rendered in dedicated two-column division showcase cards displaying the chosen trainer's avatar, team name, and hit/miss/pending outcome badge.
    - **Match Pick'ems (8 PTS each)**: Rendered in the full match pick'em grid using `compactMatchPredictionCard` with interactive Group filter tabs (`All`, `Group A`, `Group B`) and Status filter tabs (`All`, `Open`, `Decided`).
    - **Clean Custom Predictions**: Correctly registered all bracket fixtures (including bracket reset `gf2`) and group stage fixtures so that only genuine extra bonus prop bets appear in the custom outcomes section.
  - **Main Predictions Tab Parity**: Brought identical Regular Season Archive section parity to the main predictions tab during Playoff phases.

---

## [v2.2.7] — 2026-10-04

### Fixed & Improved
- **Top Cut Bracket Match Card Colored Side Walls Restored**:
  - **Restored Colored Side Wall Borders**: Restored the distinct 4px thick colored vertical left borders on `.tc-match-card` (`#a855f7` purple for Winners Bracket, `#ef3038` red for Losers Bracket, and `#ffd166` gold for Grand Finals) to maintain clean visual distinction across bracket sections.
  - **Fixed Hover/Selection Offset Gap**: Eliminated `transform: translateX(2px)` from `.tc-slot.interactive:hover`. Row hover states now highlight with a smooth background illumination (`rgba(255,255,255,0.06)`) without shifting horizontally, ensuring the background color stays completely flush against the card's colored left side wall with zero uncolored gaps on the left and zero protruding edges on the right.
  - **Border-Radius Clipping**: Maintained `overflow: hidden` on match cards so inner slot rows clip seamlessly to the card's 9px rounded corners.

---

## [v2.2.6] — 2026-10-04

### Changed
- **Top Cut Bracket Match Visual Polish & Strip Removal**:
  - **Eliminated Clashing Vertical Side Strips**: Removed the jarring 4px thick colored vertical left borders (`#a855f7` purple/pink in Winners Bracket and `#ef3038` red in Losers Bracket) from `.tc-match-card`. Cards now feature a sleek, uniform, rounded 1px dark border all around (`#2e2e3c`) with `overflow: hidden`.
  - **Clean Selection Highlighting**: Removed the inner 3px vertical border-left from `.tc-slot.picked` and `.tc-slot.hit`. Selecting a trainer now smoothly displays the red horizontal gradient glow (`linear-gradient(90deg, rgba(239,48,56,0.22), transparent)`), gold trainer typography, and glowing gold pick checkbox without any clashing or protruding vertical color bars on the edge of the card.

---

## [v2.2.5] — 2026-10-04

### Fixed
- **Top Cut Prediction Bracket BYE Auto-Advancement & LB Progression**:
  - **Automatic LB Round 1 BYE Progression**: In double-elimination brackets with byes (such as a 6-player bracket where Seeds 1 & 2 receive opening byes into Semifinals), the opening Losers Bracket fixtures (`lb1` and `lb2`) naturally pair the dropping WB Quarterfinal losers against byes. Resolved the defect where `predMap` left these LB Round 1 fixtures as unpickable `OPEN` matchups without a winner, permanently deadlocking users from completing downstream rounds.
  - **Dynamic Downstream Feeder Flow**: Known players paired against a BYE in LB Round 1 (e.g. Jace and Dao Ming) now automatically advance with `BYE ADVANCE` status and a checkmark, instantly populating into LB Round 2 to face the dropping WB Semifinal losers (e.g. Jace vs Max, Dao Ming vs Yamac).
  - **Full Bracket Predictability**: Downstream rounds (LB Semifinals, Losers Final, and Championship Final) now smoothly open and update as predictions are made, allowing users to predict all matches to the Grand Finals and select a Projected Champion.
  - **Real Bracket Model Sync (`getTournamentTopCutModel`)**: Synchronized LB Round 1 BYE auto-advancement into the tournament bracket model so live bracket progression handles bye-rounds seamlessly without getting stuck on unplayable feeder slots.
  - **Oracle Badge Safeguard**: Filtered out unpickable BYE matches from `totalSettledKeys` so users are not penalized on perfect prediction achievements.

---

## [v2.2.4] — 2026-10-04

### Fixed
- **Top Cut Playoff Primetime Matchup Detection & Fallthrough Prevention**:
  - **Accurate Playoff Phase Condition**: Corrected `getFeaturedMatchups(t)` where an erroneous check for non-existent property `t.topCut` caused the top cut playoffs branch to always evaluate to `false`, causing the site to fall through to completed regular season group fixtures. Replaced with comprehensive playoff state detection (`t.phase === 'topcut' || t.status === 'COMPLETE' || Boolean(t.bracketManagerData) || t.phase === 'complete'`).
  - **Top Cut Match Prioritization**: Automatically prioritizes uncompleted / upcoming playoff fixtures (Quarterfinals, Semifinals, etc.) with gold `TOP CUT` status badges and round subtitles, ensuring upcoming bracket clashes are featured on the home stage.
  - **Group Stage Leak Prevention**: Added strict phase-gate isolation ensuring completed group-stage matches can never be displayed in the featured spotlight card once the tournament has transitioned into Top Cut or Playoffs.

---

## [v2.2.3] — 2026-10-04

### Fixed
- **Multi-Way Head-to-Head Tiebreaker Resolution & Circular Tie Fallthrough**:
  - **Mini-Round-Robin Multi-Way Tie Engine (`sortStandingsWithCriteria`)**: Resolved a critical tiebreaker flaw where a standard binary sort comparison caused circular multi-way ties (e.g. 3-way circular head-to-head cycles where A beat B, B beat C, and C beat A) to incorrectly favor individual pairwise results without recognizing that the entire tied pool was inconclusive.
  - **Automatic Fallthrough to Subsequent Tiebreakers**: When 3 or more trainers are tied across prior criteria (e.g. 3-1 match record, +3 game differential), the system now calculates the mini-round-robin head-to-head win count exclusively among matches between the tied trainers. If all tied trainers have the identical head-to-head record (e.g. 1-1 against each other), Head-to-Head is properly recognized as inconclusive, and the ranking automatically falls through to the next configured tiebreaker (such as Faint Ratio `FR`).
  - **Accurate Group B Seeding**: Correctly resolves the Group B 3-way tie between Max (FR 1.43), Ozy (FR 1.29), and Dao Ming (FR 1.08), placing Max at #1, Ozy at #2, and Dao Ming at #3.

---

## [v2.2.2] — 2026-10-04

### Added & Improved
- **Broadcast Branding Profile Editor & Primetime Visual Cleanup**:
  - **Broadcast Branding Moderator Tool**: Added a dedicated `🎨 Broadcast Branding` button directly in the empty slot next to `Link account` inside the Trainer Profile's Moderator Tools grid. Clicking it opens a focused modal editor (`openBroadcastBrandingEditor`) featuring a live broadcast preview card, hashtag input (with default `#${CoachName}Nation`), native color picker with manual hex entry, `⚡ Auto-Extract` color analysis from the trainer's avatar, and quick Save/Cancel actions.
  - **OVR Removal from Primetime Cover**: Completely removed the circular OVR rating badges from the Primetime hero card to maintain a clean, athletic broadcast look matching television presentations.
  - **Enlarged Coach Name & Season Record**: Scaled up the coach link typography to 16.5px with gold/amber styling and enlarged the season record pill to 13px with a 1.5px metallic border and drop shadow, establishing a clear visual hierarchy underneath the team name.

---

## [v2.2.1] — 2026-10-04

### Improved
- **Primetime Matchup Typography, Grunge Scratches & Static Hashtag Ribbons** — Refined the College Football broadcast graphic based on user alignment:
  - **'Another Danger' Marker Typography**: Re-styled team names in the aggressive hand-drawn marker aesthetic using `@font-face` prioritization for `local('Another Danger')` / `local('Another Danger Slanted')`, coupled with Google Fonts `Permanent Marker` and `Barlow Condensed` fallbacks for cross-device support. Styled with athletic forward slant, metallic chrome gradients, and crisp high-contrast drop shadows.
  - **Authentic Stadium Grunge & Scratch Texture Overlay**: Implemented `getCfbScratchOverlayHtml()` generating high-detail vector diagonal slash scrapes, claw gouges, micro-scuffs, and stadium dust specks with `mix-blend-mode: overlay`. Enhanced background color saturation with radial spotlight flares and micro woven cross-hatch grit for an authentic athletic arena feel.
  - **Static High-Legibility Hashtag Ribbons in Agency FB**: Converted the scrolling hashtag ribbons to static, non-moving banners utilizing `Agency FB Bold Condensed` (`'Agency FB', 'Barlow Condensed'`) for clean, effortless legibility across desktop and mobile, with repeating hashtags and star separators (`#CoachNation ★ #CoachNation...`) spanning the bar cleanly without motion fatigue.

---

## [v2.2.0] — 2026-10-04

### Added
- **College Football ESPN Primetime Matchup Broadcast Graphic Overhaul** — Completely redesigned the marquee Primetime Matchup hero card into a bold, high-impact college football television broadcast graphic inspired by major ESPN / ABC prime-time clash presentations:
  - **Stacked Top-and-Bottom Split Stage**: Restructured the clash arena into two stacked team tiers with an alternating zig-zag layout (Team 1 on top with metallic title and record on left, giant circular logo on right; Team 2 on bottom with giant circular logo on left, metallic title and record on right).
  - **Chiseled 3D Metallic Chrome Team Typography**: Rendered team names in massive, bold athletic block typography with specular chrome gradients (`linear-gradient(180deg, #fff, #94a3b8, #cbd5e1)`), heavy drop shadows, and bevel highlights for authentic ESPN broadcast styling.
  - **Oversized 3D Embossed Circular Team Medallions**: Replaced the small round avatars with massive circular 3D team emblems featuring multi-layer chrome bevel rims, deep drop shadows, and vibrant team-colored ambient glows that bleed toward the stadium edges.
  - **Continuous Animated Hashtag Ticker Ribbons**: Integrated sleek edge-to-edge ticker tape ribbons along the top and bottom borders displaying continuous, smooth-scrolling `#Hashtags` separated by glowing stars (`#EthanNation ★ #EthanNation...`). Automatically pauses on hover for easy inspection.
  - **Coach Broadcast Branding & Hashtag Profile Editor**: Added a dedicated moderator card to the Coach Profile modal in the space previously occupied by the retired team covers tool:
    - **Custom Team Hashtag Field**: Allows commissioners to customize individual coach slogans (e.g., `#RollTide`, `#HoothootNation`, `#DawgMentality`), automatically defaulting to `#${CoachName}Nation` when left blank.
    - **Primary Team Color Picker & Auto-Extraction**: Provides an interactive HTML color picker with an "Auto-Extract" button that analyzes uploaded coach avatars to sample their dominant vibrant color via off-screen canvas analysis, with automatic fallback to the coach's brand hue.
  - **Metallic Dividing Seam & Center Matchup Badge**: Pinned a heavy metallic pill badge directly over the central dividing seam displaying the bold athletic series score (e.g., `2 - 0`) without distracting status labels for completed matches, or a glowing `VS` crest for upcoming clashes. Clicking the badge seamlessly opens the Match Boxscore & Replay Hub modal.
  - **Streamlined Team Record Integration**: Retained team season records (`RECORD 3-1`) neatly docked alongside coach links and OVR rating badges, keeping the focus entirely on the broadcast clash without sprite clutter.

---

## [v2.1.2] — 2026-10-04

### Added
- **Group Stage Faint Ratio (FR) Replay Tiebreaker System** — Introduced a new advanced tiebreaker metric that integrates directly with the Pokémon Showdown replay analyzer to rank trainers by combat efficiency:
  - **Faint Ratio Calculation (`Faints Dealt ÷ Faints Taken`)**: Measures the total number of opponent Pokémon knocked out divided by a trainer's own fainted Pokémon across all verified group replays.
  - **Automatic 4-Faint Forfeit Penalization & Award Engine**: If a trainer forfeits or loses due to inactivity in a replay, or if the game ends prematurely before 4 Pokémon have fainted for the losing side, the forfeiting trainer is assessed 4 fainted Pokémon total (all 4 Pokémon fainted) and 4 faints dealt are awarded to the winning trainer. Any Pokémon lost by the winner prior to the forfeit are accurately credited as faints taken against the winner.
  - **Undefeated Infinity Tier & Zero-Taken Tiebreakers**: Undefeated trainers who lost zero Pokémon (`faintsTaken === 0`) are granted top priority (`∞`), with ties between undefeated trainers broken by total faints dealt. Inactive or unplayed trainers (`0/0`) safely default to `0.00`.
  - **Replay Verification Safeguards**: Only verified, attached Showdown replays contribute towards the Faint Ratio; games missing parsed logs safely contribute 0 faints dealt and 0 taken without distorting records.
  - **Interactive Standings Table & Tooltip Integration**: Displays a dedicated `FR` stat cube in the group standings table with decimal ratio display (e.g., `1.75` or `∞`) and hover tooltips showing exact combat counts (`X faints dealt / Y taken`).
  - **Tiebreaker Priority Modal Configuration**: Registered under `STANDING_METRICS`, allowing tournament commissioners to add `FR`, promote/demote its priority level, or remove it in the Tiebreaker & Ranking Priority Editor modal (`openTiebreakerEditor`), while preserving the standard `['wl', 'gw', 'gd', 'h2h']` default priority.
  - **Standings Ranking Order Subtitle**: Added dynamic criteria priority display (`Group ranking order: Metric 1 → Metric 2 → ...`) beneath the group standings grid matching the Swiss System display.

---

## [v2.1.1] — 2026-10-04

### Improved
- **Account View Mobile Responsive Overhaul** — Completely redesigned the Account hub view on mobile screens (`<= 768px`) to resolve horizontal and vertical cutoffs, cramped layouts, and obscured statistics:
  - **Zero-Cutoff Mobile Identity & Action Bar**: Restructured the mobile account card into a two-tier layout—giving the coach avatar, username, and linked team pill the full row width without side-by-side squeezing, and moving `👤 View Profile` and `🚪 Sign Out` into an equal 50/50 action grid directly below. Completely eliminates the clipping bug where the right 20% of `Sign Out` was cut off past the edge of the card.
  - **Auto-Flow Equal Column Hub Tab Bar**: Converted the hub navigation bar into a 3-column auto-flow grid (`grid-auto-flow: column; grid-auto-columns: 1fr`) with responsive label adaptation (`⚔️ Matches`, `🎯 Picks`, `👑 Mod Tools` on mobile; full labels on desktop). Every tab spans an equal 33.3% width (or 50% for standard players), eliminating horizontal scrolling and preventing `👑 Moderator Tools` from being clipped on the right.
  - **Symmetrical 2×2 Career Stat Grid**: Replaced the rigid multi-column stats banner with a balanced 2-column by 2-row grid (`repeat(2, 1fr)`) with fluid typography (`clamp(18px, 5.2vw, 22px)`), completely eliminating horizontal cutoffs where `Championships 1 🏆` and `Top Cut Finishes` were previously clipped off-screen to the right.
  - **Match Screen Viewport Containment & Zero-Overflow Clash Rows**: Completely resolved the bug where the Matches tab was expanding past the viewport and cutting off the right-hand card border:
    - Stacked `.acct-filter-header` vertically on mobile with `min-width: 0 !important` on `.acct-filter-strip`, preventing horizontal chip rows from forcing container blowout.
    - Armed `.acct-match-coach` and `.acct-coach-meta` with strict `flex: 1 1 0% !important; min-width: 0 !important; overflow: hidden !important` and inline-block button ellipsis clipping (`.player-link`), compact 24px avatars, and a 15px score pill, fitting all match rows down to 240px wide without overflow.
    - Locked global viewports on mobile (`body { overflow-x: hidden !important; max-width: 100vw !important; }` and `.page { overflow-x: clip !important; }`), ensuring `.acct-hub-card` maintains perfectly balanced, symmetrical side margins matching the Predictions and Moderator tabs.
  - **Responsive Moderator Controls & Prediction Grids**: Added an inline moderator mode toggle bar for mobile and switched prediction pick cards to single-column stacking (`.acct-pred-grid`) on mobile screens.

---

## [v2.1.0] — 2026-10-04

### Added
- **Pokémon Showdown Replay Viewer & Analyzer Complete Overhaul** — Transformed the match replay theater on both desktop and mobile devices into a clean, unobstructed, edge-to-edge experience:
  - **Zero-Overlay Canvas Architecture**: Permanently eliminated tacky and obstructive overlay buttons from inside the battle screen. The Fullscreen control is now positioned cleanly in the Replay Subbar alongside the game tabs and analysis modes (`🎬 Watch Replay`, `📊 Box Score & Stats`, `📜 Battle Log`), leaving trainer cards, battle sprites, and Pokémon HP bars 100% visible and unhindered.
  - **Unified Mobile Full-Width Responsive Scaling**: Solved the critical sizing bug where Showdown's internal `battle.js` resizing collided with iframe wrappers, which previously shrank the battle canvas into a tiny top-left corner box leaving a giant black void. The entire 640×468 Showdown player suite (battle field, turn controls, speed selectors, color scheme) now scales uniformly as a single cohesive unit to fill 100% of mobile phone screens edge-to-edge with zero side margins and zero dead space.
  - **PC & Mobile Controls Clearance & Zero Vertical Overlap**: Eliminated the vertical crowding where Showdown's playback buttons hovered right over the settings row; gave 12px clear vertical separation between turn buttons and speed/scheme controls. Streamlined selector widths so `Speed:` and `Music: On Off` fit comfortably centered within the 640px stage with 80px side margins, ensuring music options are 100% visible on screen without cutoffs.
  - **Auto-Fading Fullscreen Exit Pill**: In fullscreen mode, replaced persistent screen-cluttering buttons with a sleek top pill that appears smoothly on hover or tap and auto-fades during playback, paired with native Escape key and mobile swipe-back gestures.
  - **Multi-Game Replay Switcher & Synchronized Box Score Engine**: Instant tab switching between Game 1, Game 2, and Game 3 with auto-calculated box scores, MVP awards, damage charts, and complete turn-by-turn battle logs.
- **Universal Modal Backdrop Click Dismissal & Mobile Escape Key Support** — Upgraded all 55 modal views across the entire application shell to instantly dismiss when tapping or clicking the dark backdrop outside the dialog card or pressing the `Escape` key, standardizing modern web modal UX.
- **Tournament Playbooks & Mechanics Modernization** — Completely modernized and expanded the league's core analytical documentation:
  - **Overall (OVR) Rating Guide Overhaul**: Detailed formula breakdowns, metric weight explanations (Combat Win %, Match Win %, Differential Score, Strength of Schedule), Tier classification brackets (S+ to D), and dynamic coach rating previews.
  - **Elo System Guide Overhaul**: Deep dive into the league's dynamic K-factor rating mathematics, expected outcome probabilities, postseason multiplier logic, and rating progression ladders.
  - **Badges & Accolades Playbook Overhaul**: Comprehensive guide covering all coach badges, milestone tiers, rarity rings, and unlock criteria.
  - **Season Awards & Honors Playbook Overhaul**: In-depth criteria and historical tracking guide for MVP, Finals MVP, First-Team All-League, statistical crowns, and divisional trophies.

### Improved
- **Mobile Replay Tab Strips & Button Typography Spacing**: Added dedicated spacing and inline flex gaps between icons/emojis and text labels across all top bar tabs, game selector pills (`🎮 Game 1`), analysis modes (`🎬 Watch Replay`, `📊 Box Score & Stats`, `📜 Battle Log`), action buttons (`⬇ Download .html`), and playback controls (`▶ Play`, `↺ Reset`). Fluid horizontal scrollbars for round filters, division tabs, and game selection chips with responsive typography clamping.

---

## [v2.0.1] — 2026-10-04

### Improved
- **Home Page In-Season Showcase & Primetime Matchup Mobile Refinement** — Eliminated awkward vertical stacking and overlapping elements on the Home page on mobile devices:
  - **Structured Two-Tier Hero Button Grid**: Reorganized the ongoing tournament hero card action buttons into a clean two-tier layout—placing primary match and leaderboard links as full-width 50/50 split buttons on row 1, with commissioner editing controls neatly side-by-side on row 2.
  - **Fluid Hero Title Sizing**: Adjusted responsive title clamping (`clamp(26px, 7.5vw, 38px)`) and compact padding to keep the hero banner balanced without consuming excessive vertical space.
  - **De-Cluttered Primetime Header Subbar**: Re-architected the marquee matchup banner header on mobile screens to separate division titles and match status onto line 1, reserving line 2 for commissioner feature pinning and cover tools.
  - **Avatars & Carousel Arrow Clearance**: Provided dedicated 44px stage padding and 8px arrow anchoring so carousel navigation buttons (`‹` / `›`) never collide with or obscure coach avatars.
  - **Vertical Team & Coach Typographic Stacking**: Stacked team names above coach names cleanly in the clash arena to prevent text clipping and truncation on narrow screens.
- **Records Page Streamlined Mobile Leaderboard & Accolades Modal** — Overhauled the Hall of Fame Leaderboard for small screens to fit without horizontal scrolling:
  - **Zero-Scroll Mobile Table Layout**: Streamlined table columns on mobile (`<= 768px`) to fit cleanly within the viewport without horizontal scrolling, prioritizing Rank, Trainer / Team, OVR Rating, Career W-L, and Win %.
  - **Interactive Coach Badges Modal**: Replaced the overflowing vertical stack of badge pills with a compact tap-friendly pill counter (`🏅 N Badges`), opening a dedicated modal that showcases the coach's full collection of unlocked achievements, icons, tier badges, and requirement descriptions.
  - **Responsive Milestone Stat Cards**: Streamlined the top Hall of Fame record cards (`.hof-grid`) into a single-column card stack on mobile screens for comfortable vertical browsing.

---

## [v2.0.0] — 2026-10-04

### Added
- **Mobile Navigation Drawer & Ultra-Slim Responsive Header** — Completely modernized the global topbar navigation experience for mobile and tablet devices (`<= 900px`):
  - **Sleek Single-Row Mobile Header**: Transformed the topbar from a cramped 3-to-4 row wrapping banner (~180px tall) into a clean, uniform 56px sticky header, saving massive vertical screen real estate on mobile devices.
  - **Dedicated Mobile Hamburger Menu Trigger**: Introduced an animated, accessible hamburger menu button (`☰`) in the top-right header corner with keyboard support and touch-friendly tap targets.
  - **Slide-Out Mobile Drawer Canvas**: Integrated a native slide-out navigation drawer featuring a dark frosted glass backdrop blur overlay (`rgba(8, 8, 12, 0.75)` with `backdrop-filter: blur(6px)`), smooth cubic-bezier slide transitions, and full viewport height access.
  - **Synchronized Mobile Route Navigation**: Seamlessly renders all league tabs into full-width vertical navigation tiles with active route indicator states, automatically closing the drawer upon selecting any route or pressing `Escape`.
  - **Dedicated Mobile Action Panel**: Moved account access, Discord webhook alerts, and commissioner test lab tools into a dedicated footer module within the mobile drawer, preventing topbar clutter on smaller displays.

### Improved
- **Tournament Archives Mobile Native Cards** — Redesigned the tournament archive directory on mobile screens to eliminate horizontal screen overflow and awkward button cutoffs:
  - **Full-Width Single-Column Stack**: Converted the archive grid into a responsive single-column layout on screens `<= 900px`, allowing tournament cards to fill 100% of available mobile viewport width.
  - **Adaptive Fluid Card Height & Typography**: Replaced rigid aspect ratios with flexible card heights and fluid title sizing (`clamp(20px, 5.8vw, 26px)`), ensuring multi-line tournament titles wrap naturally without clipping.
  - **Contained Cover Management Button**: Anchored the commissioner cover editor trigger safely within the lower-right boundary of the card, preventing it from overflowing the right edge of mobile screens.
- **Team Sheets Responsive 5×2 Roster Grid** — Resolved roster slot cutoff issues on mobile screens where the 5th Pokémon in each row was clipped past the edge:
  - **Proportional Slot & Sprite Scaling**: Scaled roster slots down from 74px to 52px (and 46px on ultra-compact devices) with proportional 44px Pokémon sprite assets, ensuring all 10 Pokémon in the 5×2 grid fit seamlessly on mobile devices down to 320px width.
  - **Full-Width Card Architecture**: Reinforced `.teams-showcase-grid` and `.team-showcase-card` with strict `box-sizing: border-box` and zero-overflow containers, guaranteeing coach cards adapt fluidly across all phone screen sizes.
  - **Streamlined Card Header & Action Button**: Refined coach metadata, avatar badges, and draft count chips with compact padding and full-width view roster buttons.
- **Matches Section Responsive Mobile Layout & Horizontal Filter Bar** — Overhauled the match center for small screens to prevent coach filters and match cards from overflowing:
  - **Single-Row Horizontal Scroll Coach Filter Bar**: Transformed the multi-row wrapping coach chips into a sleek, touch-friendly horizontal scroll pill bar with smooth scrolling and hidden scrollbars, reducing vertical height by over 70%.
  - **Horizontal Scroll Stage Filter Tabs**: Converted tournament round and stage filter tabs into a smooth single-row horizontal scroll bar for swift touch navigation across divisions and weeks.
  - **Full-Width Responsive Match Cards**: Overrode desktop `minmax(390px, 1fr)` grid constraints on mobile (`<= 768px`) with `1fr` single-column cards, preventing fixture cards and score inputs from clipping past the screen edge.
  - **Adaptive Match Card Footers & Replay Pills**: Enabled natural flex-wrapping on score editing buttons, match submission controls, and Showdown replay pills so action buttons never overflow on narrow screens.
- **Universal Viewport Containment** — Hardened global layout rules across `html`, `body`, and the application shell with `overflow-x: hidden` and `max-width: 100vw`, eliminating rogue horizontal page jitter and ensuring a solid native app-like mobile experience.

---

## [v1.3.0] — 2026-10-04

### Added
- **Dedicated Postseason Tournament Progression & Accolades Showcase** — Overhauled the postseason progression presentation by removing the legacy rating progression table from the Standings view and creating a dedicated **Progression** tab in completed tournament archives positioned between Awards and Predictions:
  - **Dedicated Postseason Navigation Tab**: Seamlessly integrated the Progression tab into the tournament navigation suite for all completed tournaments, serving as a dedicated postseason conclusion recap alongside the Awards tab.
  - **TV Broadcast Showcase Cards**: Replaced the outdated rating table with sleek, full-width TV broadcast cards for each tournament coach, featuring team cover backdrop art, dark vignette overlays, and gold/silver/bronze prestige tier borders.
  - **Prestige Tier & Rank Badges**: Distinctive illuminated rank badges highlighting the tournament champion (`👑 1ST`), runner-up (`🥈 2ND`), 3rd place finisher (`🥉 3RD`), Top Cut playoff qualifiers (`⚔️ TOP 4` / `TOP 8`), and regular season competitors.
  - **Comprehensive Accolades Showcase**: Dynamically highlights all tournament accolades and honors earned by the coach and their Pokémon squad during the event, including tournament champion, runner-up, and playoff finish honors, Season MVP, Finals MVP, statistical leaders (Most KOs, Most Damage, Most Tanked), and All-Tournament 1st, 2nd, and 3rd Team selections.
  - **Postseason Rating Evolution Module**: Clear side-by-side progression badges comparing Group Stage OVR to Final Postseason OVR with glowing rating growth pills (`+X` emerald gain, `-X` crimson decline, `0` neutral, or `—` for regular season finishes).
  - **Responsive Mobile-First Two-Tier Architecture**: Re-engineered progression card layouts with responsive two-tier flex stacking, ensuring rank, coach names, accolades, and rating badges remain crystal clear without clipping or squishing on small screens.
  - **De-Cluttered Standings View**: Completely removed the outdated rating progression table from the base Standings view in both Swiss and Group Stage tournaments, keeping in-season standings clean and focused on active qualification races.

---

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