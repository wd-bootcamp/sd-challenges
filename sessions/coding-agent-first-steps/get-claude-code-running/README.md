# Coding Agent First Steps: Get Claude Code Running

In this challenge, you install Claude Code, log in and have your first short conversation with a coding agent. Tick off each step. If something doesn't work, check the troubleshooting tips at the end before asking a coach.

## Tasks

### 1. Check the Requirements

- [ ] You have a Claude account with a paid plan (Pro or higher). The free plan doesn't include Claude Code.
- [ ] `git --version` prints a version in your terminal.

### 2. Install Claude Code

Pick **one** of the following commands for your system.

macOS, Linux or WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows (PowerShell):

```powershell
irm https://claude.ai/install.ps1 | iex
```

Windows (Command Prompt):

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

- [ ] The installer finished without errors.
- [ ] Close your terminal and open a new one.
- [ ] `claude --version` prints a version number.

### 3. Run the Diagnostics

```bash
claude doctor
```

- [ ] Read the output. Which checks pass? Is there a warning? Write it down.

### 4. Log In

Go into the folder of this challenge (the one you downloaded with `ghcd`) and start Claude Code there:

```bash
cd get-claude-code-running
claude
```

- [ ] A browser window opens. Log in with your Claude account.
- [ ] Back in the terminal, Claude Code asks whether you trust this folder. Confirm.

### 5. Switch to Manual Mode

This week, we want to see and approve every action of the agent. Look at the bottom of the Claude Code window: it shows the current permission mode.

- [ ] Press `Shift+Tab` a few times and watch the mode change.
- [ ] Find out which mode is active when you start Claude Code. Write it down.
- [ ] Quit with `/exit` and restart in Manual mode:

```bash
claude --permission-mode default
```

### 6. Your First Conversation

- [ ] Ask: `What can you do in this folder? Answer in three bullet points.`
- [ ] Ask: `Create a file hello.md with a short greeting.` Claude asks for permission before writing the file. Read the prompt and allow it.
- [ ] Run `git status` with the `!` prefix inside Claude Code: `!git status`. The output lands in the conversation.

### 7. Explore the Controls

- [ ] Type `/` and scroll through the menu of commands.
- [ ] Run `/help`.
- [ ] Run `/model`. Which model is active? Close the menu with `Esc`.
- [ ] Run `/usage`. How much of your plan's usage limit is left?
- [ ] Quit with `/exit`.

## Troubleshooting

- **`claude: command not found`**: Close all terminal windows and open a new one. The installer adds `claude` to your `PATH`, but only new terminals see the change. `claude doctor` can't run in that case, so check the last lines of the installer output for the install location.
- **Windows**: Install from PowerShell or Command Prompt, then use `claude` in the terminal you work with (Git Bash, PowerShell or the VS Code terminal). Git for Windows is recommended.
- **The browser doesn't open on login**: Copy the URL that Claude Code prints and open it manually.
- **Wrong account or plan**: Run `/login` inside Claude Code to log in again.
- **Still stuck?** Paste the full output of `claude doctor` into the help channel or show it to a coach.

## Notes

- Don't install with `sudo npm install -g`. The native installer is the recommended way and updates itself.
- Install guide: [code.claude.com/docs/en/setup](https://code.claude.com/docs/en/setup)
