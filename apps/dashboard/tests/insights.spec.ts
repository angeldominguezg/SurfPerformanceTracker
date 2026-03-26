import { test, expect } from "@playwright/test";

test("insights page loads", async ({ page }) => {
  await page.goto("/insights");
  await expect(page.getByText("Insights")).toBeVisible();
});
