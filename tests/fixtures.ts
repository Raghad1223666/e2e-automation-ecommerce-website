import { test as base } from "@playwright/test";
import { SaucedemoLoginPage } from "../pages/login-page";
import { SaucedemoInventoryPage } from "../pages/inventory-page";

type SaucedemoFixtures = {
  loginPage: SaucedemoLoginPage;
  inventoryPage: SaucedemoInventoryPage;
};

export const test = base.extend<SaucedemoFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new SaucedemoLoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new SaucedemoInventoryPage(page));
  },
});

export { expect } from "@playwright/test";
