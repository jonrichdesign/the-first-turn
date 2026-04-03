# Card Data

## Replace Sample Content

The `quest-cards.json` file currently contains **sample cards for testing**.

**To use your own content:**

```bash
cp ~/Desktop/quest-cards.json quest-cards/data/quest-cards.json
```

This will replace the sample cards with your custom quest cards.

---

## JSON Structure

Each card must have these fields:

```json
{
  "habitat": "beach",     // Must be: "beach", "forest", or "park"
  "title": "Card Title",  // Short, punchy title
  "body": "Quest text..." // 2-3 lines recommended
}
```

---

## Tips

- Keep body text concise (2-3 short lines)
- Distribute cards across all three habitats
- Use vivid, imaginative language
- Test locally before deploying
