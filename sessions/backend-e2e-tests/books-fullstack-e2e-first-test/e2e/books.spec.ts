import { expect, test } from "@playwright/test";

test("the page shows the heading and the form", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Reading List" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Add book" })).toBeVisible();
});
