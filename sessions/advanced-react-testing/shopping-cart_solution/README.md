# Shopping Cart: Solution

The solution of the Shopping Cart challenge. The bug was in the total: `sum + item.price` ignores the quantity. The fix is `sum + item.price * item.quantity`.

The tests of `Cart` mock both children. The real `CartItem` has its own test file, because `Cart` tests with a mocked `CartItem` do not know whether the real one works.

Use `npm run test` to run the tests and `npm run check` to check the types (install the dependencies with `npm i` first).
