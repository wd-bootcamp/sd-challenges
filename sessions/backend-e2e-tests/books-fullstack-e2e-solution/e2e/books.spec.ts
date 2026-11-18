import { expect, test } from "@playwright/test";

test("the book list is visible", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Reading List" })
  ).toBeVisible();
  await expect(
    page.getByRole("list", { name: "Books" }).getByRole("listitem").first()
  ).toBeVisible();
});

test("add a book, then delete it", async ({ page }) => {
  const title = `E2E Book ${Date.now()}`; // unique: no clash with other data
  await page.goto("/");

  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Author").fill("Test Author");
  await page.getByRole("button", { name: "Add book" }).click();

  const item = page.getByRole("listitem").filter({ hasText: title });
  await expect(item).toBeVisible();

  // The page names the button "Delete <title>".
  await page.getByRole("button", { name: `Delete ${title}` }).click();
  await expect(item).toHaveCount(0);
});
