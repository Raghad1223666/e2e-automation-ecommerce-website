import { type Locator, type Page } from "@playwright/test";

import { SaucedemoUrls } from "../shared/constants";

export class SaucedemoInventoryPage {
  readonly page: Page;

  // Header elements
  readonly appLogo: Locator;
  readonly burgerMenuButton: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  // Menu elements
  readonly menuItems: Locator;
  readonly logoutLink: Locator;
  readonly aboutLink: Locator;
  readonly resetAppLink: Locator;
  readonly closeMenuButton: Locator;

  // Inventory elements
  readonly inventoryContainer: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;

  // Footer elements
  readonly footer: Locator;
  readonly footerText: Locator;

  //Back here need to move them to related page - Cart page and Details page when i create them
  // Cart elements
  readonly continueShoppingButton: Locator;

  // Item details page
  readonly inventoryItemName: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header - Using semantic locators (getByRole, getByTestId, getByText)
    this.appLogo = page.getByText("Swag Labs");
    this.burgerMenuButton = page.getByRole("button", { name: "Open Menu" });
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");

    // Menu - Using getByRole for links
    this.menuItems = page.locator(".bm-item-list"); // Container has no semantic alternative
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.aboutLink = page.getByRole("link", { name: "About" });
    this.resetAppLink = page.getByRole("link", { name: "Reset App State" });
    this.closeMenuButton = page.getByRole("button", { name: "Close Menu" });

    this.inventoryContainer = page.getByTestId("inventory-container");
    this.inventoryList = page.getByTestId("inventory-list");
    this.inventoryItems = page.getByTestId("inventory-item");
    this.sortDropdown = page.getByTestId("product-sort-container");

    this.footer = page.getByTestId("footer");
    this.footerText = page.getByTestId("footer-copy");

    // Cart Page
    this.continueShoppingButton = page.getByTestId("continue-shopping");

    // Product details page
    this.inventoryItemName = page.getByTestId("inventory-item-name");
    this.backToProductsButton = page.getByTestId("back-to-products");
  }

  async navigateToInventoryPage() {
    await this.page.goto(SaucedemoUrls.INVENTORY_PAGE, {
      waitUntil: "domcontentloaded",
    });
  }

  getProductByName(productName: string): Locator {
    return this.inventoryItems.filter({ hasText: productName });
  }

  getProductTitle(productName: string): Locator {
    return this.getProductByName(productName).getByTestId(
      "inventory-item-name"
    );
  }

  getProductDescription(productName: string): Locator {
    return this.getProductByName(productName).getByTestId(
      "inventory-item-desc"
    );
  }

  getProductPrice(productName: string): Locator {
    return this.getProductByName(productName).getByTestId(
      "inventory-item-price"
    );
  }

  getProductImage(productName: string): Locator {
    return this.getProductByName(productName).locator(
      ".inventory_item_img img"
    );
  }

  getAddToCartButton(productName: string): Locator {
    return this.getProductByName(productName).getByRole("button", {
      name: /add to cart/i,
    });
  }

  getRemoveButton(productName: string): Locator {
    return this.getProductByName(productName).getByRole("button", {
      name: /remove/i,
    });
  }

  // Cart actions
  async addToCart(productName: string) {
    await this.getAddToCartButton(productName).click();
  }

  async removeFromCart(productName: string) {
    await this.getRemoveButton(productName).click();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  // Product navigation
  async clickProductTitle(productName: string) {
    await this.getProductTitle(productName).click();
  }

  async clickProductImage(productName: string) {
    await this.getProductImage(productName).click();
  }

  // Sorting
  async sortBy(sortOption: string) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getCurrentSortValue(): Promise<string> {
    return await this.sortDropdown.inputValue();
  }

  async getAllProductNames(): Promise<string[]> {
    const names = await this.inventoryItems
      .getByTestId("inventory-item-name")
      .allTextContents();

    return names;
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItems
      .getByTestId("inventory-item-price")
      .allTextContents();

    return priceTexts.map((price) => parseFloat(price.replace("$", "")));
  }

  // Menu actions
  async openMenu() {
    await this.burgerMenuButton.click();
    await this.menuItems.waitFor({ state: "visible" });
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async clickAbout() {
    await this.openMenu();
    await this.aboutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppLink.click();
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

  // Helper methods
  async getInventoryItemCount(): Promise<number> {
    await this.page.waitForURL(SaucedemoUrls.INVENTORY_PAGE, {
      waitUntil: "load",
    });

    return await this.inventoryItems.count();
  }

  // Get first product elements (for UI tests)
  getFirstProductImage(): Locator {
    return this.inventoryItems.first().locator(".inventory_item_img img");
  }

  getFirstProductName(): Locator {
    return this.inventoryItems.first().getByTestId("inventory-item-name");
  }

  getFirstProductDescription(): Locator {
    return this.inventoryItems.first().getByTestId("inventory-item-desc");
  }

  getFirstProductPrice(): Locator {
    return this.inventoryItems.first().getByTestId("inventory-item-price");
  }

  getFirstProductButton(): Locator {
    return this.inventoryItems.first().getByRole("button");
  }

  async getFirstProductNameText(): Promise<string | null> {
    return await this.getFirstProductName().textContent();
  }
}
