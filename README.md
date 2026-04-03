# Quest Cards

**Turn over a card and start your adventure...**

A lightweight, magical single-page web app that helps parents quickly start imaginative role play games with their children. Built as a static site for GitHub Pages.

---

## ✨ Features

- 🎴 Beautiful card flip animations
- 🏖️ Habitat-based quest filtering (Beach, Forest, Park)
- 🎨 Dynamic theming per habitat
- 🔗 Shareable URLs with habitat state
- ♻️ Smart card shuffling (no repeats until pool exhausted)
- 📱 Mobile-first, responsive design
- ⌨️ Full keyboard accessibility
- 🚀 Zero dependencies, pure vanilla JS

---

## 📋 Setup Instructions

### 1. Add Your Card Content

Place your `quest-cards.json` file in the `data/` folder:

```bash
cp ~/Desktop/quest-cards.json quest-cards/data/
```

**Expected JSON structure:**

```json
[
  {
    "habitat": "beach",
    "title": "The Mysterious Shell",
    "body": "You find a shell that whispers secrets when you hold it to your ear..."
  },
  {
    "habitat": "forest",
    "title": "The Talking Tree",
    "body": "An ancient oak asks for your help finding its lost acorns..."
  },
  {
    "habitat": "park",
    "title": "The Flying Frisbee",
    "body": "A magical frisbee lands at your feet and refuses to stay still..."
  }
]
```

**Required fields:**
- `habitat` - one of: `"beach"`, `"forest"`, `"park"`
- `title` - card title (string)
- `body` - quest description, 2-3 lines recommended (string)

### 2. Add the Refraktury Font

Place your `Refraktury.woff2` file in the `fonts/` folder:

```bash
cp ~/path/to/Refraktury.woff2 quest-cards/fonts/
```

The font is used for the main title and card titles. The app will fall back to Georgia/serif if the font is missing.

**Font attribution:**
Refraktury by csyde, licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)

### 3. Run Locally

Simply open `index.html` in a web browser:

```bash
cd quest-cards
open index.html
```

Or use a local server (recommended for testing):

```bash
# Python 3
python3 -m http.server 8000

# Node.js (if you have npx)
npx serve

# Then visit: http://localhost:8000
```

---

## 🚀 Deploy to GitHub Pages

### Option 1: Quick Deploy

1. **Create a new GitHub repository**
2. **Push your code:**

```bash
cd quest-cards
git init
git add .
git commit -m "Initial commit: Quest Cards app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/quest-cards.git
git push -u origin main
```

3. **Enable GitHub Pages:**
   - Go to your repo settings
   - Navigate to **Pages** (in the sidebar)
   - Under **Source**, select `main` branch
   - Click **Save**

4. **Your app will be live at:**
   `https://YOUR-USERNAME.github.io/quest-cards/`

### Option 2: GitHub CLI

```bash
cd quest-cards
git init
gh repo create quest-cards --public --source=. --remote=origin
git add .
git commit -m "Initial commit: Quest Cards app"
git push -u origin main
gh api repos/YOUR-USERNAME/quest-cards/pages -X POST -f source[branch]=main -f source[path]=/
```

---

## 📝 Adding More Cards

To add new quests:

1. **Edit `data/quest-cards.json`**
2. **Add new card objects** following the structure above
3. **Commit and push** (if using GitHub Pages):

```bash
git add data/quest-cards.json
git commit -m "Add new quest cards"
git push
```

Your changes will be live within a few minutes!

**Tips:**
- Keep `body` text to 2-3 short lines for best visual presentation
- Distribute cards across habitats for variety
- Test new cards locally before deploying

---

## 🎨 Customizing Themes

Themes are controlled via CSS custom properties in `css/styles.css`.

**Current themes:**
- **Default** (all): Muted creams and browns (parchment-inspired)
- **Beach**: Soft blues
- **Forest**: Soft greens
- **Park**: Light orange

**To customize**, edit the CSS variables:

```css
/* Example: Beach theme */
body.theme-beach {
    --bg-color: #e8f2f7;
    --accent-color: #5a8ca8;
    --card-bg: #f8fcfe;
    /* ... */
}
```

---

## 🏗️ Project Structure

```
quest-cards/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles, themes, animations
├── js/
│   └── app.js          # Card logic, shuffle, URL state
├── data/
│   └── quest-cards.json  # Card content (you provide this)
├── fonts/
│   └── Refraktury.woff2  # Display font (you provide this)
└── README.md           # This file
```

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties for theming, 3D transforms for card flip
- **Vanilla JavaScript** - Zero dependencies
- **SVG** - Card back illustration and habitat icons

**Why no framework?**
The app is simple enough that vanilla JS keeps it fast, lightweight, and easy to maintain. The entire app is <5KB of JavaScript.

---

## ♿ Accessibility

- Semantic HTML with ARIA labels
- Keyboard navigation (Tab, Enter, Space)
- Focus indicators
- Touch-friendly button sizes (min 44×44px)
- High contrast color schemes

---

## 🎯 How It Works

### Card Draw Logic

1. **Habitat filtering** - Cards are filtered by selected habitat
2. **Shuffle on load** - Filtered cards are shuffled into a pool
3. **Draw without replacement** - Cards are drawn one by one
4. **Auto-reshuffle** - When pool is empty, cards are reshuffled
5. **No repeats** - You won't see the same card twice until all cards in the habitat have been shown

### URL State

The selected habitat is stored in the URL query parameter:
- `?habitat=beach` - Beach habitat selected
- `?habitat=forest` - Forest habitat selected
- `?habitat=park` - Park habitat selected
- No parameter = "All" selected

**Share a URL** and recipients will see the same habitat selection!

### Theme Switching

- Theme updates when you select a habitat
- Theme also updates when a card is revealed (matching the card's habitat)
- Smooth CSS transitions between themes

---

## 🐛 Troubleshooting

**Cards won't load:**
- Check that `quest-cards.json` is in the `data/` folder
- Verify JSON is valid (use a JSON validator)
- Check browser console for errors

**Font not loading:**
- Ensure `Refraktury.woff2` is in the `fonts/` folder
- Check that the font file isn't corrupted
- The app will fall back to system fonts if missing

**GitHub Pages not updating:**
- Changes can take 1-5 minutes to deploy
- Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)
- Check the Actions tab in your GitHub repo for build status

---

## 📄 License

**Code:** MIT (or your preferred license)

**Font Attribution:**
Refraktury by csyde, licensed under CC BY-SA 3.0
https://creativecommons.org/licenses/by-sa/3.0/

---

## 🎮 Usage Example

1. **Open the app**
2. **Select a habitat** (or keep "All")
3. **Click the card** to reveal your first quest
4. **Start playing!** Let your imagination run wild
5. **Click again** to draw the next card

**Perfect for:**
- Starting imaginative play sessions
- Long car journeys
- Rainy day inspiration
- Outdoor adventures

---

**Made with ✨ for magical moments**
