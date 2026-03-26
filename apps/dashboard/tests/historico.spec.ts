import { test, expect } from "@playwright/test";

test("historico page loads", async ({ page }) => {
  await page.goto("/historico");
  await expect(page.getByText("Histórico")).toBeVisible();
});
