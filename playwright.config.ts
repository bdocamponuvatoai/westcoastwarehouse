import { defineConfig, devices } from '@playwright/test'

const CI = Boolean(process.env.CI)
// Locally, Windows Smart App Control can block Playwright's bundled Chromium.
// Set PW_CHANNEL=msedge (or chrome) to drive an installed browser instead.
const channel = process.env.PW_CHANNEL || undefined

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  fullyParallel: true,
  workers: CI ? 2 : undefined,
  retries: CI ? 1 : 0,
  reporter: CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:3210',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'pixel-7', use: { ...devices['Pixel 7'], channel } },
    { name: 'iphone-14', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: 'npm run start -- -p 3210',
    url: 'http://localhost:3210',
    reuseExistingServer: !CI,
    timeout: 120_000,
  },
})
