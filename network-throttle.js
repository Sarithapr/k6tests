import { browser,networkProfiles} from 'k6/browser';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    browser_test: {
      executor: 'shared-iterations',
     vus: 1,
      iterations: 1,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://quickpizza.grafana.com/', { waitUntil: 'load' });
    page.throttleNetwork(networkProfiles['Fast 3G']);
    sleep(1);
    page.setViewportSize({ width: 700, height: 1000 });
    console.log(await page.title());
    check(page, {
      'Page title contains Quick Pizza': (p) => p.title === 'QuickPizza'
    });

  } catch (e) {
    console.error('Page load failed: ' + e.message);
  } finally {
    await page.close();
    await context.close();
  }

  sleep(1);
}
