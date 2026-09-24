# Vite chat example

A small, runnable Vite app that installs `pixel.md` and adds an activity indicator and a chat effect around an existing message composer.

## Run it

Requires Node.js 20.19+ for the current Vite release.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, type a message, and send it. The demo shows `thinking` then `responding`; the simulated timer is only there to make the integration visible. Replace those state changes with your model's real events.

## Start from a new project

```bash
npm create vite@latest my-agent-ui -- --template vanilla
cd my-agent-ui
npm install pixel.md
```

Copy `index.html`, `src/main.js`, and `src/style.css` from this folder. The import belongs in the JavaScript entry; the custom elements go beside the UI you already own.

The custom elements don't make network or model calls. Your app still owns the conversation, model stream, and send behavior.
