# The First Turn - Project Skill

## Project Overview

**The First Turn** is a lightweight, magical single-page web app that helps parents quickly start imaginative role play games with their children. Turn over a card and start your adventure.

- **Live Site:** https://jonrichdesign.github.io/the-first-turn/
- **Repository:** https://github.com/jonrichdesign/the-first-turn
- **Type:** Static site for GitHub Pages
- **Designer/Developer:** jonri.ch

## Core Philosophy

**Design Principles:**
- Magical, tactile, calm, and frictionless
- No login, no backend, just beautifully crafted interaction
- Simplicity and warmth over complexity
- Minimalism that feels like "turn a card → instantly start playing"

**User Experience:**
- First load: card back is shown
- Click to reveal quest
- Click again for next card
- Habitat selector changes theme immediately
- Every interaction should feel crisp and satisfying

## Tech Stack & Architecture

### Core Technologies
- **HTML5** - Semantic structure
- **CSS3** - Custom properties for theming, 3D transforms for flip animation
- **Vanilla JavaScript** - Zero dependencies, <5KB total
- **SVG** - Card back illustration (no icons on card front)
- **Adobe Fonts** - BC Unciala and BC Parlament via Typekit

### Why No Framework?
The app is intentionally simple (one page, basic state, JSON loading, DOM updates). A framework would add 40-100KB+ for functionality that can be written in <5KB vanilla JS. This keeps it fast, lightweight, and easy to maintain.

## File Structure

```
the-first-turn/
├── index.html              # Main HTML (card structure, SVG card back)
├── css/
│   └── styles.css          # All styles, 4 themes, animations
├── js/
│   └── app.js              # Card logic, shuffle, URL state
├── data/
│   ├── quest-cards.json    # 40 quest cards (10 per habitat)
│   └── README.md           # Instructions for updating cards
├── social-card.png         # Open Graph preview image (1200×630)
├── social-card.html        # Template for generating social card
├── .claude/
│   └── skills/
│       └── the-first-turn-project.md  # This skill file
└── README.md               # Full documentation
```

**Note:** `fonts/` directory exists but is no longer used (fonts now loaded via Adobe Fonts CDN).

## Card System

### Habitats (Locations)
Four habitats, each with 10 quest cards:

1. **Home** - Indoor adventures (cushion mountains, lava floor, shadow puppets)
2. **Beach** - Seaside quests (tide pools, shell listeners, wave jumpers)
3. **Forest** - Woodland adventures (moss paths, tree whisperers, fairy rings)
4. **Park** - Outdoor play (cloud namers, shadow thieves, grass sigils)

**Total:** 40 quest cards

### Card Data Format
```json
{
  "habitat": "home",
  "title": "Cushion Mountain",
  "body": "The house giants have left their soft mountains scattered everywhere. Build the tallest peak you can, then plant a flag at the summit."
}
```

- **habitat:** Must be exactly `"home"`, `"beach"`, `"forest"`, or `"park"`
- **title:** Short, punchy (displays in BC Unciala)
- **body:** 2-3 lines recommended for best visual presentation (displays in BC Parlament)

### Shuffle Logic
- **No repeats** until the active habitat pool is exhausted
- Cards are shuffled into a pool on load and when changing habitat
- Cards are drawn one by one from the pool
- When pool is empty, reshuffle and repeat
- Each card has a unique ID (array index) for URL sharing

### URL State Management
- Habitat is stored in URL: `?habitat=home`
- Individual cards can be shared: `?habitat=beach&card=5`
- URLs are shareable - recipients see the exact same card
- Default habitat: `home`

## Typography

### Adobe Fonts Setup
Fonts are loaded via Typekit CDN:
```html
<link rel="stylesheet" href="https://use.typekit.net/ydp6htk.css">
```

### Font Usage
- **BC Unciala Regular** (display) - Main title, card titles, card back text
  - Font family: `'bc-unciala-regular', Georgia, serif`
  - Used for: `.title`, `.card-title`, `.card-back-title`
  - Weight: 400

- **BC Parlament** (body) - Card descriptions only
  - Font family: `'bc-parlament', Georgia, serif`
  - Used for: `.card-body`

- **System Sans-Serif** (UI) - Buttons, tags, labels, all other text
  - Font family: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`
  - Used for: Everything except titles and card descriptions

### Font Sizes
- Main title: 3.5rem (desktop), 2.5rem (tablet), 2rem (mobile)
- Card title: 1.75rem (desktop), 1.5rem (mobile)
- Card body: 1.1rem (desktop), 1rem (mobile)
- Card location: 0.75rem (uppercase, letterspaced)

### Font Attribution
Footer credits: "Typeset in BC Unciala and BC Parlament by Briefcase Type Foundry"
Link: https://www.briefcasetype.com/

## Theming System

### CSS Custom Properties
All themes use CSS custom properties for easy switching:

```css
--bg-color        /* Page background */
--text-color      /* Body text */
--accent-color    /* Titles, borders, icons */
--card-bg         /* Card background */
--card-border     /* Card outer border */
--button-bg       /* Button default */
--button-hover    /* Button hover state */
--button-active   /* Active/selected button */
```

### Theme Colors

**Home** (warm cream/brown - default):
- Background: `#f5f1e8`
- Accent: `#8b7355`

**Beach** (soft blue):
- Background: `#e8f2f7`
- Accent: `#5a8ca8`

**Forest** (soft green):
- Background: `#e8f2e8`
- Accent: `#5a8c5a`

**Park** (light orange):
- Background: `#fef5e8`
- Accent: `#d8955a`

### Theme Behavior
- Theme updates when you select a habitat via buttons
- Theme also updates when a card is revealed (matches the card's habitat)
- Smooth CSS transitions between themes (0.3s)
- Card title, location tag inherit habitat accent colors

## Card Design

### Card Dimensions
- Desktop: 300×400px
- Mobile (≤768px): 280×380px
- Mobile (≤400px): 260×360px

### Card Back
- Playing-card inspired design
- SVG illustration with single border (2.5px, using `--card-border`)
- Center circle contains "The First Turn" (3 lines, BC Unciala)
- Four corner icons: wand (top), cutlass (right), leaf (bottom), gemstone (left)
- Corner flourishes (small circles at each corner)

### Card Front
- **No habitat icon** (removed for cleaner design)
- Single outer border only (3px solid, using `--card-border`)
- Clean, minimal layout
- Card title (BC Unciala, 1.75rem)
- Card body text (BC Parlament, 1.1rem)
- Location label at bottom (uppercase, 0.75rem, system sans-serif)

### Card Flip Animation
- CSS 3D transform (rotateY 180deg)
- Flip duration: 0.6s
- Smooth easing
- backface-visibility: hidden for clean flip

### Card Layout & Spacing
```css
.card-content {
    padding: 0.9rem 1.35rem;        /* Reduced top/bottom, standard left/right */
    gap: 0.9rem;                     /* Space between elements */
    justify-content: space-evenly;   /* Even distribution */
}
```

**Key spacing decisions:**
- Top/bottom padding reduced to prevent overflow with longer text
- No margin-top on location tag (relies on space-evenly)
- Content vertically centered with even distribution
- Three elements: title, body, location

## Border Styling

**Important:** Both card front and back use matching borders for visual consistency.

- **Outer border:** 3px solid `var(--card-border)` on both `.card-front` and `.card-back`
- **Card back SVG border:** 2.5px stroke within the SVG (visually matches outer border)
- **No inner border on card front** (removed for cleaner look)

This unified approach ensures the card maintains the same visual weight when flipped.

## Habitat Selector

### Design
- Segmented button group (no gaps between buttons)
- Rounded corners only on outer edges (first: left, last: right)
- Order: Home | Beach | Forest | Park
- Overlapping borders (-2px margin-left)
- z-index management for hover/active/focus states

### Responsive Behavior
- Desktop: Horizontal row
- Mobile (≤768px): Width matches card width
- Mobile (≤400px): Vertical stack with appropriate corner rounding

### States
- Default: `var(--button-bg)`
- Hover: `var(--button-hover)` + z-index bump
- Active: `var(--button-active)` background, white text, z-index 2
- Focus: 3px solid outline, z-index 3

## JavaScript Architecture

### Class Structure
`QuestCards` class manages all app state and behavior:

**State:**
- `allCards` - Full deck loaded from JSON
- `currentHabitat` - Currently selected habitat (default: 'home')
- `cardPool` - Shuffled array of current habitat's cards
- `usedCards` - Cards already shown
- `currentCard` - Currently displayed card
- `isFlipped` - Whether card is currently flipped

**Key Methods:**
- `loadCards()` - Fetch and parse JSON, add unique IDs
- `resetCardPool()` - Filter by habitat, shuffle, reset
- `shuffle()` - Fisher-Yates shuffle algorithm
- `drawCard()` - Pop from pool, reshuffle if empty
- `revealCard()` - Display card, flip, update theme/URL
- `resetCard()` - Flip back, then reveal next card
- `selectHabitat()` - Change habitat, reset pool, update UI/URL
- `updateTheme()` - Add/remove theme classes on body
- `updateURL()` - Sync habitat and card ID to URL
- `loadStateFromURL()` - Restore state from URL params

**Note:** `updateHabitatIcon()` method removed as habitat icons are no longer displayed on card front.

## Git Workflow

### Branch Strategy
- Single branch: `main`
- Push directly to main
- GitHub Pages auto-deploys from main branch

### Commit Message Style
- Descriptive first line (50-72 chars)
- Blank line
- Body with details if needed
- Footer:
  ```
  🤖 Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

### Common Commands
```bash
# Make changes, then:
git add -A
git commit -m "Description of changes"
git push

# Changes live in ~1-2 minutes
```

## Social Meta Tags

### Open Graph (Facebook/LinkedIn)
- `og:type` - website
- `og:url` - Live site URL
- `og:title` - The First Turn
- `og:description` - Project description
- `og:image` - social-card.png (1200×630)

### Twitter Card
- `twitter:card` - summary_large_image
- Same title, description, image as OG

### Preview Image
- File: `social-card.png` (1200×630px)
- Screenshot of the app using Adobe Fonts
- Shows title, strapline, description

## Common Tasks

### Adding New Cards
1. Edit `~/Desktop/quest-cards.json` locally
2. Copy to project: `cp ~/Desktop/quest-cards.json data/quest-cards.json`
3. Commit and push
4. Live in ~1-2 minutes

### Updating Styles
1. Edit `css/styles.css`
2. Test locally: `open index.html`
3. Commit and push

### Changing Themes
- Edit CSS custom properties in `:root` and `body.theme-*` blocks
- Maintain consistent structure across all 4 themes
- Update individual card theming in `.card[data-card-habitat="*"]` blocks

### Testing Locally
```bash
# Option 1: Direct open
open index.html

# Option 2: Local server (recommended)
python3 -m http.server 8000
# Visit: http://localhost:8000
```

## Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation (Tab, Enter, Space)
- Focus indicators (3px outline)
- Touch-friendly button sizes (min 44×44px)
- High contrast color schemes
- `aria-live="polite"` on card container for screen readers

## Design Constraints

### What to Avoid
- ❌ Adding frameworks or dependencies
- ❌ Backend/database/login systems
- ❌ Complex state management
- ❌ Build tools or compilation steps
- ❌ Animations that require reduced-motion handling (keep simple)
- ❌ Emojis in code unless explicitly requested
- ❌ Habitat icons on card front (removed for cleaner design)
- ❌ Double/inner borders on card front (use single outer border only)

### What to Maintain
- ✅ Zero dependencies (vanilla JS only)
- ✅ Simple, lightweight architecture
- ✅ Fast load times (<100KB total + Adobe Fonts CDN)
- ✅ Mobile-first responsive design
- ✅ Calm, magical, tactile aesthetic
- ✅ Frictionless user experience
- ✅ Consistent border styling between card front and back
- ✅ Clean, minimal card design without icons

## Performance Budget

- **Total page weight:** <150KB (excluding Adobe Fonts CDN)
- **JavaScript:** <5KB (unminified)
- **CSS:** <15KB (unminified)
- **Adobe Fonts:** Loaded from CDN (not counted in budget)
- **Images:** social-card.png only (not loaded on main page)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid, Flexbox, Custom Properties required
- 3D transforms for card flip
- No IE11 support needed

## Recent Design Decisions

### Typography Migration (April 2026)
**From:** Refraktury (self-hosted WOFF2)
**To:** Adobe Fonts (BC Unciala + BC Parlament)

**Rationale:**
- BC Unciala provides beautiful, magical quality for titles
- BC Parlament offers excellent readability for quest descriptions
- Adobe Fonts CDN ensures reliable delivery
- Typefaces by Briefcase Type Foundry

### Card Front Simplification
**Removed:**
- Habitat icon at top of card
- Inner decorative border

**Why:**
- Cleaner, more balanced composition
- Content sits more evenly vertically
- Matches the minimalist aesthetic
- Reduces visual clutter

### Border Unification
**Decision:** Use consistent 3px outer border on both card front and back

**Implementation:**
- `.card-front` and `.card-back`: 3px solid `var(--card-border)`
- Card back SVG: 2.5px stroke (visually matches)
- No inner border on front

**Result:** Card maintains same visual weight when flipped

### Spacing Refinements
**Adjustments made:**
- Reduced top/bottom padding on `.card-content` to prevent text overflow
- Changed from `space-between` to `space-evenly` for better distribution
- Removed `margin-top: auto` from location tag
- Reduced header top padding for better balance

## Future Considerations

### Potential Enhancements (if requested)
- Add "share card" button with copy-to-clipboard
- Add "favorites" (localStorage only, no backend)
- Print stylesheet for physical card printing
- Dark mode toggle
- Animation preferences (prefers-reduced-motion)
- Additional habitats (garden, city, mountains, etc.)

### Things to Avoid Unless Explicitly Requested
- Analytics/tracking
- User accounts
- Backend services
- Complex animations
- Framework migrations
- Build pipelines
- Habitat icons on cards (already removed)

## Quick Reference

### Key Files for Common Changes
- **Add cards:** `data/quest-cards.json`
- **Change colors/themes:** `css/styles.css` (custom properties)
- **Update card logic:** `js/app.js` (QuestCards class)
- **Modify card layout:** `index.html` (card structure)
- **Social sharing preview:** `social-card.png`

### Important URLs
- Live site: https://jonrichdesign.github.io/the-first-turn/
- Repository: https://github.com/jonrichdesign/the-first-turn
- Designer portfolio: https://jonri.ch
- Font foundry: https://www.briefcasetype.com/
- Adobe Fonts project: https://use.typekit.net/ydp6htk.css

### Typography Quick Reference
```css
/* Titles (Unciala) */
--font-display: 'bc-unciala-regular', Georgia, serif;

/* Card descriptions (Parlament) */
.card-body {
    font-family: 'bc-parlament', Georgia, serif;
}

/* UI elements (System Sans) */
--font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...;
```

### Contact/Attribution
- Designed and built by jonri.ch
- Typefaces: BC Unciala and BC Parlament by Briefcase Type Foundry
- Built with Claude Code

---

**Last Updated:** April 2026 (post-Adobe Fonts migration)
**Version:** 1.1
