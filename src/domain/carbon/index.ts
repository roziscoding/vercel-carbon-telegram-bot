// import chromium from 'chrome-aws-lambda'
import playwright from 'playwright-core'

export async function getScreenshot (url: string) {
  const browser = await playwright.firefox.launch({
    // args: chromium.args,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
    // executablePath: await chromium.executablePath || undefined,
    headless: true 
  })
  
  console.log('browser ok')

  const page = await browser.newPage({
    viewport: {
      width: 2560,
      height: 1080,
    }
  })

  console.log('page ok')

  await page.goto(url, { waitUntil: 'load' })

  console.log('goto ok')

  const exportContainer = await page.waitForSelector('#export-container')

  console.log('exportContainer ok')

  const buffer = await exportContainer.screenshot()

  // Close browser
  await browser.close()

  return buffer
}
