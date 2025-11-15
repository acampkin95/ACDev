import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", name: "home" },
  { path: "/services", name: "services" },
  { path: "/solutions", name: "solutions" },
  { path: "/work", name: "work" },
  { path: "/contact", name: "contact" },
  { path: "/blog", name: "blog" },
];

test.describe("Visual snapshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({
      content: `
        *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
      `,
    });
  });

  for (const route of routes) {
    test(`${route.name} page`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${route.name}.png`, { fullPage: true });
    });
  }
});

