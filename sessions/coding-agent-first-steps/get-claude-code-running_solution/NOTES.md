# Notes: Get Claude Code Running

There is no code in this challenge. Here is what you should have seen at each step.

## Install and Diagnostics

- `claude --version` prints a version number.
- `claude doctor` lists the install type (native), the version, whether auto-updates work, and possible problems with your `PATH` or configuration. Warnings about a missing optional tool are fine. Errors about the `PATH` usually mean you need a new terminal window.

## Login and Trust

- The first start opens a browser for the login. After that, the session is stored on your computer. You only log in again if you switch accounts (`/login`).
- The trust dialog appears in every new folder. Claude Code asks because a project folder can contain configuration that changes how the agent behaves. Only trust folders you know.

## Permission Mode

- Recent versions start new sessions in **Auto mode**: a background check approves most actions without asking you. Older versions start in **Manual mode** (`default`).
- `Shift+Tab` cycles through the modes, for example Manual → Accept edits → Plan → Auto.
- `claude --permission-mode default` starts in Manual mode. In this mode, Claude asks before every file edit and every shell command.

## First Conversation

- Writing `hello.md` triggers a permission prompt that shows the file content. You can allow it once, allow similar actions for the session, or say no and tell Claude what to do instead.
- `!git status` runs the command directly, without a model turn. The output is now part of the conversation, so Claude can refer to it.

## Controls

- `/model` shows the active model and the alternatives your plan offers.
- `/usage` shows how much of your plan's limit you have used and when it resets. Long sessions and big tasks use up the limit faster.
