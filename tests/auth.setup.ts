import { test as setup, expect } from "./fixtures";
import { SaucedemoCredentials, SaucedemoUrls } from "../shared/constants";

const authFile = "./auth/user.json";

setup("authenticate", async ({ page, loginPage }) => {
  await loginPage.navigateToLoginPage();

  await loginPage.login(
    SaucedemoCredentials.STANDARD_USER.username,
    SaucedemoCredentials.STANDARD_USER.password
  );

  await expect(page).toHaveURL(SaucedemoUrls.INVENTORY_PAGE);

  // Save authentication state
  await page.context().storageState({ path: authFile });
});
