import { test, expect } from "@playwright/test";

test("registro page loads", async ({ page }) => {
  await page.goto("/registro");
  await expect(page.getByText("Registrar sesión")).toBeVisible();
});
