# Product Card: Solution

The solution of the Product Card challenge. The bug was in the price calculation: `price * discount / 100` is the amount of the discount, not the discounted price. The fix is `price * (1 - discount / 100)`.

The snapshot test of the product on sale was only written after the fix. A snapshot written with the bug would have saved `20.00 €` as the expected price.

Use `npm run test` to run the tests and `npm run check` to check the types (install the dependencies with `npm i` first).
