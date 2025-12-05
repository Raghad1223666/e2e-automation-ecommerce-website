import { expect, test } from "../fixtures";
import { SaucedemoCredentials, SaucedemoUrls } from "../../shared/constants";

test.describe("Saucedemo Login Page - Form Field Interactions", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test("Should fill and retain username value", async ({ loginPage }) => {
    await test.step("Fill username field", async () => {
      await loginPage.fillUsername(SaucedemoCredentials.STANDARD_USER.username);
    });

    await test.step("Verify username value is retained", async () => {
      await expect(loginPage.usernameInput).toHaveValue(SaucedemoCredentials.STANDARD_USER.username);
    });
  });

  test("Should fill and retain password value", async ({ loginPage }) => {
    await test.step("Fill password field", async () => {
      await loginPage.fillPassword(SaucedemoCredentials.STANDARD_USER.password);
    });

    await test.step("Verify password value is retained", async () => {
      await expect(loginPage.passwordInput).toHaveValue(SaucedemoCredentials.STANDARD_USER.password);
    });
  });

  test("Should clear username field", async ({ loginPage }) => {
    await test.step("Fill and then clear username", async () => {
      await loginPage.fillUsername(SaucedemoCredentials.STANDARD_USER.username);
      await loginPage.clearUsername();
    });

    await test.step("Verify username field is empty", async () => {
      await expect(loginPage.usernameInput).toHaveValue("");
    });
  });

  test("Should clear password field", async ({ loginPage }) => {
    await test.step("Fill and then clear password", async () => {
      await loginPage.fillPassword(SaucedemoCredentials.STANDARD_USER.password);
      await loginPage.clearPassword();
    });

    await test.step("Verify password field is empty", async () => {
      await expect(loginPage.passwordInput).toHaveValue("");
    });
  });

  test("Should allow multiple login attempts", async ({ page, loginPage }) => {
    await test.step("First failed login attempt", async () => {
      await loginPage.login("invalid_user", "wrong_password");
    });

    await test.step("Close error message", async () => {
      await loginPage.closeErrorMessage();
    });

    await test.step("Second successful login attempt", async () => {
      await loginPage.clearUsername();
      await loginPage.clearPassword();
      await loginPage.login(SaucedemoCredentials.STANDARD_USER.username, SaucedemoCredentials.STANDARD_USER.password);
      await expect(page).toHaveURL(SaucedemoUrls.INVENTORY_PAGE);
    });
  });

  test("Should close error message when X button is clicked", async ({ loginPage }) => {
    await test.step("Trigger error message", async () => {
      await loginPage.clickLoginButton();
      await expect(loginPage.errorMessage).toBeVisible();
    });

    await test.step("Close error message", async () => {
      await loginPage.closeErrorMessage();
    });

    await test.step("Verify error message is hidden", async () => {
      await expect(loginPage.errorMessage).not.toBeVisible();
    });
  });
});
