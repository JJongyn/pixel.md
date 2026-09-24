# Pixel terminal components

Import the Node.js module `pixel.md/terminal` in a CLI program. It formats actual stdout and can collect input through stdin; its ANSI palette uses small square marks in muted green, with a plain-text fallback when color is disabled or output is piped. It has no runtime dependencies.

| Variant | Use for | Guide |
| --- | --- | --- |
| Prompt | Collect a command string using stdin. | [Command prompt](components/terminal/prompt.md) |
| Output | Format command output and exit status. | [Command output](components/terminal/output.md) |
| Progress | Render pixel bars and task states. | [Task progress](components/terminal/tasks.md) |
| Confirm | Ask an explicit yes/no question, defaulting to no. | [Run confirmation](components/terminal/confirm.md) |
| Diff | Render added and removed lines. | [Git diff](components/terminal/diff.md) |
| Session | Show a process, URL, and session state. | [Dev session](components/terminal/session.md) |
| Box | Frame a message with stepped pixel corners. | [Stepped panel](components/terminal/box.md) |
| Choices | Display or collect a numbered choice. | [Choice menu](components/terminal/choices.md) |
| Steps | Show a workflow using chunky nodes and a stepped rail. | [Workflow rail](components/terminal/steps.md) |
| Meter | Visualize tokens, context, or resource usage as a 2D grid. | [Pixel meter](components/terminal/meter.md) |
| Spinner | Animate a small square sprite while an async task runs. | [Activity sprite](components/terminal/spinner.md) |
| Wave | Show a pixel wave while tokens stream or a long task runs. | [Pixel wave](components/terminal/wave.md) |
| Agents | Scan parallel agent or worker states in a compact list. | [Agent fleet](components/terminal/agents.md) |
| Stream | Append a block cursor to partial model output. | [Stream cursor](components/terminal/stream.md) |

The helpers display and collect input; they never run shell commands. Validate the returned command and perform execution in the host CLI. For an embedded browser preview, use `pixel.md/terminal-preview` instead.
