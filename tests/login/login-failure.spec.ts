import { expect, test } from "@playwright/test";

import { SaucedemoLoginPage } from "../../pages/login-page";
import { SaucedemoCredentials, SaucedemoMessages, SaucedemoUrls } from "../../shared/constants";

test.describe("Saucedemo Login Page - Failed Login Scenarios", () => {
  let loginPage: SaucedemoLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SaucedemoLoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Should show error message for locked out user", async ({ page }) => {
    await test.step("Attempt login with locked out user", async () => {
      await loginPage.login(
        SaucedemoCredentials.LOCKED_OUT_USER.username,
        SaucedemoCredentials.LOCKED_OUT_USER.password
      );
    });

    await test.step("Verify error message is displayed", async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(SaucedemoMessages.LOCKED_OUT_ERROR);
    });

    await test.step("Verify user remains on login page", async () => {
      await expect(page).toHaveURL(SaucedemoUrls.BASE_URL);
    });
  });

  test("Should show error message for invalid username", async () => {
    await test.step("Login with invalid username", async () => {
      await loginPage.login("invalid_user", "secret_sauce");
    });

    await test.step("Verify error message for invalid credentials", async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(SaucedemoMessages.INVALID_CREDENTIALS_ERROR);
    });
  });

  test("Should show error message for invalid password", async () => {
    await test.step("Login with invalid password", async () => {
      await loginPage.login(SaucedemoCredentials.STANDARD_USER.username, "wrong_password");
    });

    await test.step("Verify error message is shown", async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(SaucedemoMessages.INVALID_CREDENTIALS_ERROR);
    });
  });

  test("Should show error when username is empty", async () => {
    await test.step("Attempt login with empty username", async () => {
      await loginPage.fillUsername("");
      await loginPage.fillPassword(SaucedemoCredentials.STANDARD_USER.password);
      await loginPage.clickLoginButton();
    });

    await test.step("Verify username required error message", async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(SaucedemoMessages.USERNAME_REQUIRED_ERROR);
    });
  });

  test("Should show error when password is empty", async () => {
    await test.step("Attempt login with empty password", async () => {
      await loginPage.fillUsername(SaucedemoCredentials.STANDARD_USER.username);
      await loginPage.fillPassword("");
      await loginPage.clickLoginButton();
    });

    await test.step("Verify password required error message", async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(SaucedemoMessages.PASSWORD_REQUIRED_ERROR);
    });
  });

  test("Should show error when both fields are empty", async () => {
    await test.step("Click login without filling any fields", async () => {
      await loginPage.clickLoginButton();
    });

    await test.step("Verify username required error is shown", async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(SaucedemoMessages.USERNAME_REQUIRED_ERROR);
    });
  });
});
