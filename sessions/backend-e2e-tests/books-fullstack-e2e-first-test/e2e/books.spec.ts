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
