# Prompting within an Agent & Agent Workflows: Prompt Makeover

A coding agent does what you ask, not what you mean. In this challenge you rewrite weak prompts and see how much the result changes.

## Tasks

### Part 1: Rewrite the prompts

Open `PROMPTS.md`. It contains eight weak prompts about this Bookshelf app.

- For each prompt, write down what is missing.
- Write a better version. Use what you know about the app: open the files, run it with `npm run dev` and look at it.
- You don't need Claude Code for this part.

### Part 2: Compare the plans

Pick **two** of your rewritten prompts (we recommend prompt 4 and prompt 7) and test them in Plan mode. Plan mode only reads and plans, so nothing in your project changes.

For each of the two prompts:

1. Start Claude Code in Plan mode:

   ```bash
   claude --permission-mode plan
   ```

2. Send the **weak** prompt. Read the plan. Don't accept it.
3. Run `/clear` to start with an empty conversation.
4. Send your **better** prompt. Read the plan again.
5. Write down in `PROMPTS.md` below the prompt:
   - Which assumptions did the agent make with the weak prompt?
   - Did it ask you questions? Which ones?
   - What is different in the second plan?

### Part 3: Discuss

Compare your rewrites with a partner. Which of your prompts would you still improve after seeing the plans?

## Notes

- You don't have to implement any of the plans. If you want to, pick one and go through the full workflow from the handout: Explore, Plan, Implement, Verify, Commit.
- Plan mode still uses your subscription's usage. Two prompts per comparison are enough.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm test` to run the tests
- `npm run check` to type-check the project
