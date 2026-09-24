# pixel.md agent plugin

Install the pixel.md skills into Codex or Claude Code. The plugin helps an agent choose and integrate the library's browser components and Node.js terminal helpers in a real application.

## Install in Codex

```bash
codex plugin marketplace add JJongyn/pixel.md
codex plugin add pixel-md@personal
```

## Install in Claude Code

```text
/plugin marketplace add JJongyn/pixel.md
/plugin install pixel-md@pixel-md
```

The plugin contains the general `pixel-md` catalog plus focused skills for agent indicators, chat effects, and workflow elements. The catalog also covers bot avatars and terminal components. Skills read the included component references and use `npm install pixel.md` when the application needs the runtime package.

## Local preview

From the repository root:

```bash
claude --plugin-dir ./plugins/pixel-md
```

For Codex, add the repository as a marketplace and install `pixel-md` from the Plugins directory. See the repository README for the package API and [live gallery](https://jjongyn.github.io/pixel.md/).
