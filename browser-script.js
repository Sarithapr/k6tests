import http from "k6/http";
import { browser } from "k6/browser";
import { check } from 'k6';
import { sleep, fail } from 'k6';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";

const BASE_URL = __ENV.BASE_URL || "https://quickpizza.grafana.com";

export const options = {
  scenarios: {
    ui: {
      executor: "shared-iterations",
      vus: 1,
      iterations: 1,
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
};

export default async function() {
  const response= http.get(BASE_URL);
  check(response, {
  'status is 200': (r) => r.status === 200
  });
  const page = await browser.newPage();
  page.setViewportSize({ width: 1000, height: 3000 });

  try {
    await page.goto(BASE_URL);
    await expect.soft(page.locator("h1")).toHaveText("Looking to break out of your pizza routine?");

    await page.locator('//button[. = "Pizza, Please!"]').click();
    await page.waitForTimeout(500);

    await page.screenshot({ path: "screenshot.png" });
    await expect.soft(page.locator("div#recommendations")).not.toHaveText("");
  } catch (error) {
    fail(`Browser iteration failed: ${error.message}`);
  } finally {
    await page.close();
  }
  

  sleep(1);
}

