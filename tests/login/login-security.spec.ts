import { expect, test } from "../fixtures";
import { SaucedemoCredentials, SaucedemoUrls } from "../../shared/constants";

test.describe("Saucedemo Login Page - Security and Edge Cases", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test("Should mask password input", async ({ loginPage }) => {
    await test.step("Fill password field", async () => {
      await loginPage.fillPassword(SaucedemoCredentials.STANDARD_USER.password);
    });

    await test.step("Verify password input type is password", async () => {
      await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
    });
  });

  test("Should handle special characters in username", async ({ loginPage }) => {
    const usernameWithSpecialChars = "user#%@";

    await test.step("Fill username with special characters", async () => {
      await loginPage.fillUsername(usernameWithSpecialChars);
    });

    await test.step("Verify input field contains the special characters", async () => {
      await expect(loginPage.usernameInput).toHaveValue(usernameWithSpecialChars);
    });
  });

  test("Should handle SQL injection attempt in username", async ({ page, loginPage }) => {
    await test.step("Attempt SQL injection in username", async () => {
      await loginPage.login("admin OR '1'='1'", "secret_sauce");
    });

    await test.step("Verify login is rejected", async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(page).toHaveURL(SaucedemoUrls.BASE_URL);
    });
  });

  test("Should handle very long username input", async ({ loginPage }) => {
    const longUsername = "a".repeat(500);

    await test.step("Fill with very long username", async () => {
      await loginPage.fillUsername(longUsername);
    });

    await test.step("Verify input field contains the expected value", async () => {
      await expect(loginPage.usernameInput).toHaveValue(longUsername);
    });
  });

  test("Should handle whitespace in credentials", async ({ loginPage }) => {
    const usernameWithSpaces = " standard_user ";
    const passwordWithSpaces = " secret_sauce ";

    await test.step("Fill credentials with leading/trailing whitespace", async () => {
      await loginPage.fillUsername(usernameWithSpaces);
      await loginPage.fillPassword(passwordWithSpaces);
    });

    await test.step("Verify input fields contain the values with whitespace", async () => {
      await expect(loginPage.usernameInput).toHaveValue(usernameWithSpaces);
      await expect(loginPage.passwordInput).toHaveValue(passwordWithSpaces);
    });
  });
});
