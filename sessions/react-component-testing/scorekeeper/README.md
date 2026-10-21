# React Component Testing: Scorekeeper

This Scorekeeper app offers opportunities for game freaks: keep track of your game stats and watch a history as well!

To give you a short overview:

On the start screen, you can create a new game with entering a name of the game and the names of the participating players.

After starting a game, you can increase, decrease or reset all scores. When you are finished, you can end the tracking of scores.

Every finished game is also visible in the history, which you can open with the navigation at the bottom.

## Tasks

### Discussion

Start the app and have a look at it in the browser: `npm run dev`

Discuss in the group:

- Which features should be tested?
- Which features should **not** be tested?

### Writing Component Tests

The app offers a test file for every component. Each of these files contain acceptance criteria defining what should be tested. The tests for the `HistoryEntry` component have already been implemented, but they fail. The implementation of the other tests is missing.

Your task is to run `npm run test`, write the test implementations and make the tests pass.

> 💡 Note that, at the beginning, all tests pass (except the two in `HistoryEntry` which are currently skipped) because the testing blocks are empty. This will change while you are implementing the tests.

#### Navigation

Now it's time to write the first test on your own!

Switch to `src/components/Navigation/Navigation.test.jsx` and check whether the navigation is rendered and whether it calls the callback.

- The `Navigation` receives the current `view` and an `onChangeView` callback as props.
- The exact acceptance criteria is also already defined inside of the test case. You just have to implement the test code inside the function of the `test()` call.
- An HTML `<button>` tag has the accessible role "button".
- To check the callback, remember that you have to mock it first with `vi.fn()` and that you have to `await` all user events.

#### Input

You can now go a step further and not only check for a component being rendered, but also for its callback function being called.

Switch to `src/components/Input/Input.test.jsx` and write the tests for all given acceptance criteria.

- To check for attributes like `placeholder` or `name`, you can use the matcher `toHaveAttribute(attributeName, value)`.
- The `Input` component receives an `onChange` callback; in order to test it, remember that you have to mock it first with `vi.fn()`.
- You can check how often a function has been called with `toHaveBeenCalledTimes(numberOfExpectedCalls)`.

#### Player

The `Player` component offers even more complexity, so let's dive deeper into testing and enhance your skills even more!

Switch to `src/components/Player/Player.test.jsx` and write the tests for all acceptance criteria.

- To find all buttons at once, there is `getAllByRole` which returns an array; you can then expect a specific `toHaveLength(expectedNumber)`.
- To check the callback functions of a component, remember to mock them first and then pass the mocked function to the rendered component.
- Your `user.click` does not call the mocked functions properly? Don't forget to use `await`.

#### GameForm

Your testing skills are awesome! Get ready for the final task: testing the form!

Switch to `src/components/GameForm/GameForm.test.jsx` and write the tests for all acceptance criteria.

- To check for the accessible name of the `GameForm` component, note that the accessible role of the HTML `form` component is "form".
- To check the submitted form data, make sure to
  - mock the submit handle function first;
  - `await` all `userEvent`s
  - expect the mocked submit function `toHaveBeenCalledWith(submittedDataObject)`.
- To find the correct form of the submitted data you are expecting, you might have to check the call of `onCreateGame` in the `src/components/GameForm/index.jsx` file.

#### HistoryEntry

After writing your first component tests, your task now is to read and understand existing tests. Afterwards you should be able to fix the bug in the tested component.

Check the `src/components/HistoryEntry/HistoryEntry.test.jsx`, it offers two test cases with their acceptance criteria:

- "renders name of game and 'show score' button only"
- "renders player names and scores after button click"

Note that both tests are currently skipped with the help of `test.skip(...)`.

Remove the `.skip` method and run `npm run test`.

You will notice that both tests fail. Read the error message carefully and fix the bug in `src/components/HistoryEntry/index.jsx` so that the test passes again. (The tests are correct, but there is something wrong with the component).

Congratulations, you have fixed your first bug according to a failing test! 🎉

## Development

To work locally, please install the dependencies using `npm i` first (Node.js 22.22 or newer is required).

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Use `npm run test` to run the tests.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm run build` to build the project
- `npm run serve` to preview the production build
- `npm run test` to run the tests with Vitest
