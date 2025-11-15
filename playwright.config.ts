import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT ?? "3100";
const devCommand =
  process.platform === "win32"
    ? `cmd /c "set PORT=${PORT} && npm run dev"`
    : `PORT=${PORT} npm run dev`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "on-first-retry",
    viewport: { width: 1280, height: 720 },
    colorScheme: "dark",
  },
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  webServer: {
    command: devCommand,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
