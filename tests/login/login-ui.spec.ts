import { expect, test } from "../fixtures";
import { SaucedemoUrls } from "../../shared/constants";

test.describe("Saucedemo Login Page - UI Elements", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test("Should display all login page elements correctly", async ({ loginPage }) => {
    await test.step("Verify app logo is visible", async () => {
      await expect(loginPage.appLogo).toBeVisible();
    });

    await test.step("Verify username input is visible", async () => {
      await expect(loginPage.usernameInput).toBeVisible();
    });

    await test.step("Verify password input is visible", async () => {
      await expect(loginPage.passwordInput).toBeVisible();
    });

    await test.step("Verify login button is visible and enabled", async () => {
      await expect(loginPage.loginButton).toBeVisible();
      await expect(loginPage.loginButton).toBeEnabled();
    });
  });

  test("Should have correct page URL", async ({ page }) => {
    await expect(page).toHaveURL(SaucedemoUrls.BASE_URL);
  });
});
