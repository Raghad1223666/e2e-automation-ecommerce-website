import { expect, test } from "../fixtures";
import { SaucedemoCredentials, SaucedemoUrls } from "../../shared/constants";

test.describe("Saucedemo Login Page - Successful Login Scenarios", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test("Should successfully login with standard user credentials", async ({ page, loginPage }) => {
    await test.step("Fill login form with standard user credentials", async () => {
      await loginPage.fillUsername(SaucedemoCredentials.STANDARD_USER.username);
      await loginPage.fillPassword(SaucedemoCredentials.STANDARD_USER.password);
    });

    await test.step("Click login button", async () => {
      await loginPage.clickLoginButton();
    });

    await test.step("Verify user is redirected to inventory page", async () => {
      await expect(page).toHaveURL(SaucedemoUrls.INVENTORY_PAGE);
    });
  });

  test("Should successfully login with problem user credentials", async ({ page, loginPage }) => {
    await test.step("Login with problem user", async () => {
      await loginPage.login(SaucedemoCredentials.PROBLEM_USER.username, SaucedemoCredentials.PROBLEM_USER.password);
    });

    await test.step("Verify navigation to inventory page", async () => {
      await expect(page).toHaveURL(SaucedemoUrls.INVENTORY_PAGE);
    });
  });

  test("Should successfully login with performance glitch user", async ({ page, loginPage }) => {
    await test.step("Login with performance glitch user", async () => {
      await loginPage.login(
        SaucedemoCredentials.PERFORMANCE_GLITCH_USER.username,
        SaucedemoCredentials.PERFORMANCE_GLITCH_USER.password
      );
    });

    await test.step("Verify successful login despite performance issues", async () => {
      await page.waitForURL(SaucedemoUrls.INVENTORY_PAGE, {
        timeout: 10000
      });
      await expect(page).toHaveURL(SaucedemoUrls.INVENTORY_PAGE);
    });
  });

  test("Should successfully login with error user credentials", async ({ page, loginPage }) => {
    await test.step("Login with error user", async () => {
      await loginPage.login(SaucedemoCredentials.ERROR_USER.username, SaucedemoCredentials.ERROR_USER.password);
    });

    await test.step("Verify user is on inventory page", async () => {
      await expect(page).toHaveURL(SaucedemoUrls.INVENTORY_PAGE);
    });
  });

  test("Should successfully login with visual user credentials", async ({ page, loginPage }) => {
    await test.step("Login with visual user", async () => {
      await loginPage.login(SaucedemoCredentials.VISUAL_USER.username, SaucedemoCredentials.VISUAL_USER.password);
    });

    await test.step("Verify successful navigation", async () => {
      await expect(page).toHaveURL(SaucedemoUrls.INVENTORY_PAGE);
    });
  });
});
