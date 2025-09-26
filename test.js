import { chromium } from 'k6/browser';

export default async function () {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://test.k6.io/');
  await page.screenshot({ path: 'test.png' });
  await browser.close();
}