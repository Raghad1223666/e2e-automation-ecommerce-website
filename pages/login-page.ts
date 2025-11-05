import { type Locator, type Page } from "@playwright/test";

import { SaucedemoUrls } from "../shared/constants";

export class SaucedemoLoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorButton: Locator;
  readonly appLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.getByTestId("error");
    this.errorButton = this.errorMessage.getByRole("button");
    this.appLogo = page.getByText("Swag Labs");
  }

  async navigateToLoginPage() {
    await this.page.goto(SaucedemoUrls.BASE_URL, {
      waitUntil: "domcontentloaded",
    });
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async clearUsername() {
    await this.usernameInput.clear();
  }

  async clearPassword() {
    await this.passwordInput.clear();
  }

  async closeErrorMessage() {
    await this.errorButton.click();
  }
}
