import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  '/',
  '/about',
  '/services',
  '/services/warehousing',
  '/services/trucking',
  '/services/e-commerce',
  '/process',
  '/rate-estimate',
  '/privacy',
  '/terms',
]

test.describe('every route', () => {
  for (const path of routes) {
    test(`${path} renders cleanly`, async ({ page }) => {
      const errors: string[] = []
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
      page.on('pageerror', (e) => errors.push(String(e)))

      const res = await page.goto(path, { waitUntil: 'networkidle' })
      expect(res?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)
      expect(errors).toEqual([])
    })
  }
})

test.describe('accessibility (axe, WCAG 2.2 AA)', () => {
  // Only Chromium runs axe; other engines skip before opening a page.
  test.skip(({ browserName }) => browserName !== 'chromium')

  for (const path of [...routes, '/does-not-exist']) {
    test(`${path} has no violations`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path, { waitUntil: 'networkidle' })
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()
      const summary = results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')),
      }))
      expect(summary).toEqual([])
    })
  }
})

test.describe('routing', () => {
  test('unknown routes return a real 404', async ({ request }) => {
    expect((await request.get('/nope')).status()).toBe(404)
    expect((await request.get('/services/teleportation')).status()).toBe(404)
  })

  test('legacy WordPress URLs redirect permanently', async ({ request }) => {
    const res = await request.get('/index.php/logistics-trucking', { maxRedirects: 0 })
    expect(res.status()).toBe(308)
    expect(res.headers()['location']).toBe('/services/trucking')
  })

  test('SEO files exist', async ({ request }) => {
    for (const p of [
      '/sitemap.xml',
      '/robots.txt',
      '/manifest.webmanifest',
      '/llms.txt',
      '/opengraph-image',
    ]) {
      expect((await request.get(p)).status(), p).toBe(200)
    }
  })
})

test.describe('mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile)

  test('opens, traps, closes on Escape and returns focus', async ({ page }) => {
    await page.goto('/')
    const opener = page.getByRole('button', { name: 'Menu' })
    await opener.click()
    const dialog = page.getByRole('dialog', { name: 'Menu' })
    await expect(dialog).toBeVisible()
    await expect(page.locator('html')).toHaveClass(/menu-open/)
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(opener).toBeFocused()
    await expect(page.locator('html')).not.toHaveClass(/menu-open/)
  })

  test('navigates and closes', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'About', exact: true }).click()
    await expect(page).toHaveURL(/\/about$/)
    await expect(page.getByRole('dialog')).toBeHidden()
  })
})

test.describe('rate estimate form', () => {
  test('steps validate, move focus, and fail honestly when email is not configured', async ({
    page,
  }) => {
    await page.goto('/rate-estimate', { waitUntil: 'networkidle' })
    const form = page.locator('form')

    // Step 1: nothing chosen → error, focus on the first checkbox
    await form.getByRole('button', { name: 'Continue' }).first().click()
    await expect(form.getByText('Choose at least one service.')).toBeVisible()
    await expect(form.getByRole('alert')).toContainText('Please check the highlighted fields.')

    await form.getByLabel('Trucking').check()
    await form.getByRole('button', { name: 'Continue' }).first().click()
    await expect(form.getByText('Step 2 of 3')).toBeVisible()
    await expect(form.getByRole('heading', { name: 'Tell us about your freight' })).toBeFocused()

    await form.getByLabel('Shipment details').fill('Two 40ft containers weekly from Long Beach.')
    await form.getByRole('button', { name: 'Continue' }).last().click()
    await expect(form.getByText('Step 3 of 3')).toBeVisible()

    await form.getByLabel('Name').fill('Sam Rivera')
    await form.getByLabel('Email').fill('not-an-email')
    await form.getByRole('button', { name: 'Request Estimate' }).click()
    await expect(form.getByLabel('Email')).toBeFocused()
    await expect(form.getByLabel('Email')).toHaveAttribute('aria-invalid', 'true')

    await form.getByLabel('Email').fill('sam@example.com')
    await form.getByRole('button', { name: 'Request Estimate' }).click()
    // No provider configured in tests: must never claim success.
    await expect(form.getByRole('alert')).toContainText('not connected yet')
    await expect(page.getByText('Request received')).toHaveCount(0)
    await expect(form.getByLabel('Name')).toHaveValue('Sam Rivera')
  })
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })
  test.skip(({ browserName }) => browserName !== 'chromium')

  test('the whole form shows and submits to the server', async ({ page }) => {
    await page.goto('/rate-estimate')
    const form = page.locator('form')
    await expect(form.getByLabel('Shipment details')).toBeVisible()
    await expect(form.getByLabel('Name')).toBeVisible()
    await expect(form.getByRole('button', { name: 'Continue' })).toHaveCount(0)

    await form.getByLabel('Warehousing').check()
    await form.getByLabel('Shipment details').fill('Short-term storage for 40 pallets of apparel.')
    await form.getByLabel('Name').fill('Sam Rivera')
    await form.getByLabel('Email').fill('sam@example.com')
    await form.getByRole('button', { name: 'Request Estimate' }).click()
    await expect(page.getByRole('alert')).toContainText('not connected yet')
    await expect(page.getByLabel('Name')).toHaveValue('Sam Rivera')
  })

  test('navigation works', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('navigation', { name: 'Footer' }).getByRole('link', { name: 'Process' }),
    ).toBeVisible()
  })
})

test.describe('opening intro', () => {
  test.use({ reducedMotion: 'no-preference' })

  test('a first visit renders the page immediately under the intro', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const state = await page.evaluate(() => ({
      flagged: document.documentElement.classList.contains('intro'),
      htmlDisplay: getComputedStyle(document.documentElement).display,
      bodyHeight: document.body.getBoundingClientRect().height,
    }))
    expect(state.flagged).toBe(true)
    expect(state.htmlDisplay).not.toBe('none')
    expect(state.bodyHeight).toBeGreaterThan(0)
    await expect(page.locator('.site-intro')).toBeVisible()
  })

  test('the loader reaches 100 and the curtain lifts by itself', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('#intro-count')).toHaveText('100', { timeout: 5000 })
    await expect(page.locator('html')).not.toHaveClass(/(^|\s)intro(\s|$)/, { timeout: 6000 })
    await expect(page.locator('.site-intro')).toBeHidden()
  })

  test('a second visit in the same session skips the intro', async ({ page }) => {
    await page.goto('/')
    await page.goto('/about')
    await expect(page.locator('html')).not.toHaveClass(/(^|\s)intro(\s|$)/)
  })
})

test.describe('responsive sweep', () => {
  // One engine is enough for layout maths; the phone projects cover touch devices.
  test.skip(({ browserName, isMobile }) => browserName !== 'chromium' || isMobile)

  for (const width of [320, 375, 768, 1024, 1280, 1920]) {
    test(`no sideways scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      for (const path of routes) {
        await page.goto(path, { waitUntil: 'networkidle' })
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(0)
      }
    })
  }
})
