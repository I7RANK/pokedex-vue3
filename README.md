# Pokedex Vue3

A simple Pokémon browser built with **Vue 3**, **TypeScript**, and **PokeAPI**.  
Includes **unit** and **end-to-end tests**, a clean modular architecture, and **LocalStorage persistence** for favorites.

---

## 🧩 Main Technologies

| Technology                  | Description                                                   |
| --------------------------- | ------------------------------------------------------------- |
| **Vue 3 (Composition API)** | UI foundation                                                 |
| **Vite**                    | Fast bundler and dev server                                   |
| **TypeScript**              | Static typing for safety and autocompletion                   |
| **Pinia**                   | Global state management                                       |
| **Tailwind CSS**            | Utility-first styling for a clean and consistent design       |
| **Vitest**                  | Basic unit tests included                                     |
| **Playwright**              | Basic end-to-end tests included                               |
| **PokeAPI**                 | Public data source → [https://pokeapi.co](https://pokeapi.co) |
| **LocalStorage**            | Simple persistence for favorites                              |

---

## ⚙️ Technical Decisions

### 🐾 Fetching All Pokémon Instead of Using Offset

I decided to fetch **all Pokémon at once** and store them in the global state.  
The reason behind this is that the **search feature** needed to look through every Pokémon, not just the ones currently displayed on screen.

After checking the API, I noticed there wasn’t an endpoint for searching directly by name or filtering results, so **loading everything upfront** made more sense for this use case.

Additionally, the **response time was fast enough**, so fetching them all at once didn’t negatively impact performance.

---

### ⭐ LocalStorage for Favorites

I implemented **favorites persistence** using **LocalStorage** to keep user preferences between sessions.  
This way, Pokémon marked as favorites remain stored even after a page reload — without needing any backend.

---

### 🧱 Folder Structure

I decided to organize the logic into folders such as **services**, **adapters**, and **utils** to keep the architecture modular and scalable.

- **services** → handle API requests
- **adapters** → transform data into a consistent app format
- **utils** → reusable helper functions

This approach improves **testability** and **long-term maintainability**.

---

## 🛠️ Project Setup

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
