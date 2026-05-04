# Tarkov Low Pop Finder

> Real-time **Escape From Tarkov** server timezone tracker. Find your low-pop raid window in 3 seconds.

A lightweight web app that displays the current local time of every EFT server region around the world and highlights the ones that are most likely under-populated right now — so you can pick a raid window with fewer adversaries and more time to loot.

**Live demo:** *(deployed as a static site on Render)*

---

## Table of Contents

- [Why this exists](#why-this-exists)
- [How it works](#how-it-works)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Known issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

---

## Why this exists

Escape From Tarkov is a hardcore extraction shooter where playing against fewer opponents means **more loot, more breathing room, and a higher survival rate**. Player population on each server roughly follows the sleep schedule of the local population: when it's 3am in the server's region, that server is statistically far less crowded.

Knowing what time it is in *every* EFT region in your head is a pain — especially across DST changes and exotic timezones (Vladivostok, Yekaterinburg, Almaty, Sao Paulo…). This tool does the math for you, live, and tells you which servers are currently in the **low-pop window** (01:00–08:00 local server time).

**Open it. Read the answer. Close it.** That's the entire UX goal.

---

## How it works

The app is **100% client-side**. No backend, no tracking, no API calls.

1. The browser determines the current UTC time.
2. For every EFT server region (defined in [src/data/servers.js](src/data/servers.js)), the app computes the equivalent local time using the IANA timezone database via the standard `Intl.DateTimeFormat` API.
3. A server is flagged `LOW POP` when its local hour is between **01:00 and 08:00**, otherwise it is flagged `ACTIVE`.
4. A countdown shows either how long until the low-pop window opens, or how long until it closes if the server is already in low pop.
5. The clock ticks every second via a Vue composable ([src/composables/useLiveClock.js](src/composables/useLiveClock.js)).

The low-pop window thresholds live in [src/utils/timezone.js](src/utils/timezone.js#L1-L2):

```js
export const LOW_POP_START = 1
export const LOW_POP_END = 8
```

DST is handled transparently by the browser's `Intl` engine.

---

## Features

- **Live world clock** for every EFT server region
- **Automatic low-pop detection** based on each server's local time
- **`LOW POP` / `ACTIVE` status badge** per server
- **Countdown** until the next low-pop window opens or closes
- **Region filters** — toggle AF, ASI, EUR, ME, OCE, RUS, SAM, USA on/off
- **View toggle** — `ALL` servers vs `LOW POP ONLY`
- **Header summary** — number of servers currently in low pop + your local time and timezone
- **No backend, no cookies, no tracking** — fully static, instant load

### Supported regions

| Code | Region | Servers tracked |
|---|---|---|
| AF | Africa | Africa, AF-Nigeria |
| ASI | Asia | Korea, Japan, Asia Central, Singapore, China, Malaysia |
| EUR | Europe | West, North, Central, South, East |
| ME | Middle East | Middle East, ME Dubai |
| OCE | Oceania | Australia, New Zealand |
| RUS | Russia | West, Central, East |
| SAM | South America | South America, SA Colombia, Mexico |
| USA | North America | NE, SE, Central, South, West |

The full list is defined in [src/data/servers.js](src/data/servers.js).

---

## Tech stack

- **[Vue 3](https://vuejs.org/)** (Composition API, `<script setup>`)
- **[Vite 5](https://vitejs.dev/)** as the build tool and dev server
- **Native `Intl.DateTimeFormat`** for timezone math — no `moment`, no `date-fns`, no `luxon`
- **Plain CSS** with custom Tarkov-flavored theme variables (Share Tech Mono, Rajdhani, Barlow Condensed)
- Deployed as a **static site** on [Render](https://render.com/)

No state management library, no router — the app fits in a single page and a handful of components.

---

## Project structure

```
tarkov-low-pop/
├── docs/                       # Product & UX documentation (FR)
│   ├── README.md               # Docs index
│   └── ROADMAP.md              # Product roadmap & backlog
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AppHeader.vue       # Brand, local clock, low-pop counter, view toggle
│   │   ├── AppFooter.vue
│   │   ├── FilterBar.vue       # Region toggles
│   │   ├── RegionCard.vue      # One card per region
│   │   ├── ServerRow.vue       # One row per server inside a region
│   │   └── StatusBadge.vue     # LOW POP / ACTIVE pill
│   ├── composables/
│   │   └── useLiveClock.js     # Reactive 1s-tick clock
│   ├── data/
│   │   └── servers.js          # Static server → IANA timezone map
│   ├── utils/
│   │   └── timezone.js         # Status, countdown, formatting helpers
│   ├── App.vue                 # Root component
│   ├── main.js                 # Vue app bootstrap
│   └── style.css               # Global styles & theme
├── index.html
├── vite.config.js
├── render.yaml                 # Render static-site config
└── package.json
```

---

## Getting started

### Prerequisites

- **Node.js 18+** (any version that supports Vite 5)
- **npm** (or pnpm / yarn — adapt the commands accordingly)

### Install

```bash
git clone https://github.com/<your-user>/tarkov-low-pop.git
cd tarkov-low-pop
npm install
```

### Run locally

```bash
npm run dev
```

The app will be served at [http://localhost:5173](http://localhost:5173) with hot module reload.

### Build for production

```bash
npm run build
```

The static bundle is emitted to `dist/`.

### Preview the production build locally

```bash
npm run preview
```

---

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |

---

## Configuration

### Adjusting the low-pop window

Edit [src/utils/timezone.js](src/utils/timezone.js):

```js
export const LOW_POP_START = 1   // inclusive, 24h
export const LOW_POP_END   = 8   // exclusive, 24h
```

### Adding or editing a server

Edit [src/data/servers.js](src/data/servers.js) and add a server entry under the relevant region:

```js
{ name: 'My New Server', tz: 'Europe/Paris' }
```

The `tz` value must be a valid [IANA timezone identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

### Theming

Colors, fonts, and spacing live in CSS custom properties at the top of [src/style.css](src/style.css). Tweak them to taste.

---

## Deployment

The repo ships with a [render.yaml](render.yaml) blueprint for one-click deployment on **Render** as a static site:

```yaml
services:
  - type: web
    name: tarkov-low-pop
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

Because the app is fully client-side, it can also be deployed as-is to **Netlify**, **Vercel**, **Cloudflare Pages**, **GitHub Pages**, or any plain static host. Just publish the contents of `dist/` after `npm run build`.

---

## Roadmap

A detailed, prioritized roadmap (effort × impact) is maintained in [docs/ROADMAP.md](docs/ROADMAP.md). Highlights:

- **v1.1 — Quick wins**
  - Browser notifications when a server enters low pop
  - Persistent user preferences (region filters, view mode) via `localStorage`
  - Full mobile responsiveness
  - Visual progress bar for the active low-pop window
- **v1.2 — Intermediate features**
  - Estimated ping / latency per server
  - Light / dark theme toggle
  - 24h timeline view per server
  - Server name search
- **v2.0 — Long term / R&D**
  - Real population data if Battlestate Games ever publishes an API
  - Personal session history
  - Discord webhook & bot integration
  - Interactive world map with status heatmap

---

## Known issues

These are tracked in [docs/ROADMAP.md](docs/ROADMAP.md#bugs--dettes-techniques-connues):

- `NA North East` and `NA South East` currently share `America/New_York`. This is likely incorrect and needs to be verified against actual EFT server locations.
- DST handling relies on the browser's `Intl` engine — it works, but it isn't explicitly tested across edge cases.
- No unit tests cover [src/utils/timezone.js](src/utils/timezone.js), which is the critical logic of the app.
- The `dist/` build artifact is currently committed in the repo and should be added to `.gitignore`.

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Open a pull request against `master`

For larger changes, please open an issue first to discuss the approach. Product/UX discussions are tracked in [docs/](docs/).

---

## Disclaimer

This project is **not affiliated with Battlestate Games** or the *Escape From Tarkov* team. All trademarks belong to their respective owners. The low-pop window heuristic is based on player-behavior assumptions (regional sleep cycles), not on official population data.

---

## License

No license file is currently included. Until one is added, all rights are reserved by the author. If you'd like to reuse the code, please open an issue.
