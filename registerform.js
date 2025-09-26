import { browser } from 'k6/browser';
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
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register', { waitUntil: 'load' });
page.locator('#input-firstname').clear.fill('test');
page.locator('#input-lastname').clear.fill('test');
page.locator('#input-email').clear.fill('test@gmail.com');
page.locator('#input-telephone').clear.fill('1234567890');
page.locator('#input-password').clear.fill('test@123');
page.locator('#input-confirm').clear.fill('test@123');
page.locator('input[name="agree"]').check();
const submit = page.locator('input[type="submit"]')
await Promise.all([
  page.waitForNavigation(),
  submit.click()
]);

page.screenshot({ fullPage:true,path: 'register.png' });
check(page, {
      'Text after submitting form': (p) => p.locator('h1').textContent() == "Your Account Has Been Created!"
    });
console.log(await page.title()); 
  /* try {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register', { waitUntil: 'load' });


    check(page, {
      'Page title contains Quick Pizza': (p) => p.title().then(t=> t.includes('QuickPizza'))
    });

  } catch (e) {
    console.error('Page load failed: ' + e.message);
  } finally {
    await page.close();
    await context.close();
  }

  sleep(1); */
}


