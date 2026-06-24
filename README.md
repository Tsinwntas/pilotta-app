# 🃏 Πιλόττα/Pilotta Scorer

A scorekeeper for **Cypriot Pilotta** (also known as Belote), built as a Progressive Web App. Supports both **English** and **Cypriot Greek**, and can be installed to the home screen on iOS and Android like a native app.

---

## Features

- Track scores across multiple rounds
- Supports all game mechanics:
  - Standard bidding and trick scoring
  - Declarations (Πιλόττα, sequences, squares)
  - Καπό (Capot) — bidding team wins every trick
  - Ανάποδο (Reverse) — defending team wins every trick, with a taunt popup
  - Κλειστό (Closed ×2) and Ανοικτό (Open ×4) doubling
- Automatic trick point rounding — prompts the user when both teams are equidistant
- Auto-saves game in progress; resume after closing the browser
- English 🇬🇧 and Cypriot Greek 🇨🇾 UI (switchable mid-game)
- Installable as a PWA on iOS, Android, and desktop

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- npm (comes with Node.js)

### Install and run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

---

## Deploy to GitHub Pages

### 1. Create a GitHub repository

Go to [github.com/new](https://github.com/new) and create a new repository (e.g. `pilotta-scorer`).

### 2. Update the base path

In `vite.config.js`, set `base` to match your repository name:

```js
base: "/pilotta-scorer/",
```

### 3. Push the code

```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/pilotta-scorer.git
git add .
git commit -m "🃏 Pilotta Scorer v1"
git push -u origin main
```

### 4. Deploy

```bash
npm run deploy
```

This builds the app and pushes it to a `gh-pages` branch automatically.

### 5. Enable GitHub Pages

In your GitHub repo go to **Settings → Pages** and set the source branch to `gh-pages`.

Your app will be live at:
```
https://YOUR_USERNAME.github.io/pilotta-scorer/
```

---

## PWA — Install to home screen

The app includes a PWA manifest so users can install it to their home screen on iOS and Android, where it will open fullscreen like a native app.

To complete the setup, add two icon files to `public/icons/`:

| File | Size |
|---|---|
| `icon-192.png` | 192×192px |
| `icon-512.png` | 512×512px |

A dark green background (#1B3A2F) with a white card suit works well. You can generate these at [favicon.io](https://favicon.io) or any image editor.

---

## Scoring rules implemented

| Situation | Scoring |
|---|---|
| Bidder wins (normal) | Bidder: tricks + declarations + bid ÷ 10. Defender: tricks + declarations ÷ 10. Rounding goes to the team closer to the next multiple of 10. |
| Bidder fails (normal) | Bidder: own declarations ÷ 10. Defender: (160 + bid + own declarations) ÷ 10. |
| Καπό | Bidder credited 250 trick points. Must still clear the bid. |
| Ανάποδο | Bidder scores 0. Defender: (bid + 250 + own declarations) ÷ 10. |
| Κλειστό ×2 / Ανοικτό ×4 | Winner takes all: (160 + bid × multiplier + all declarations) ÷ 10. Loser scores 0. |

---

## Project structure

```
pilotta-scorer/
├── index.html                  HTML entry point + Google Fonts
├── vite.config.js              Vite config (set base path here)
├── package.json
├── public/
│   ├── manifest.json           PWA manifest
│   └── icons/                  Add icon-192.png and icon-512.png here
└── src/
    ├── main.jsx                React entry point
    ├── PilottaScorer.jsx       All state, logic, and screen routing
    ├── translations.js         All UI strings in EN and Cypriot Greek
    ├── constants.js            Suits, declaration types, storage key
    ├── utils.js                Pure helper functions (scoring utils)
    ├── styles.js               All inline styles
    ├── storage.js              localStorage abstraction
    ├── screens/
    │   ├── SetupScreen.jsx     Game setup + language switcher
    │   ├── PlayingScreen.jsx   Round entry form + overlays
    │   └── FinishedScreen.jsx  Game over + round history
    └── components/
        ├── AnapodoTaunt.jsx    Reverse shame popup
        ├── DeclarationsEditor.jsx  Declaration rows per team
        ├── RoundHistory.jsx    Past rounds table
        └── SuitGlyphs.jsx      ♥ ♦ ♣ ♠ header decoration
```

---

## Adding a new language

1. Add a new entry to the `TRANSLATIONS` object in `src/translations.js`, following the structure of `en` or `cy`.
2. Add a flag button for it in the `LanguageSwitcher` component in `src/screens/SetupScreen.jsx`.
3. Add a default team name entry (`defaultTeamA`, `defaultTeamB`) to the new translation.

---

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [gh-pages](https://github.com/tschaub/gh-pages) for deployment
- [EB Garamond](https://fonts.google.com/specimen/EB+Garamond) + [Courier Prime](https://fonts.google.com/specimen/Courier+Prime) via Google Fonts
- [flagcdn.com](https://flagcdn.com) for flag images