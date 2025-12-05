import { expect, test } from "../fixtures";

import { SaucedemoProducts, SaucedemoUrls } from "../../shared/constants";

test.describe("Saucedemo Inventory Page - Navigation", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await test.step("Navigate to inventory page", async () => {
      await inventoryPage.navigateToInventoryPage();
    });
  });

  test("Should navigate to product detail page when clicking product title", async ({
    page,
    inventoryPage,
  }) => {
    await test.step("Click on backpack product title", async () => {
      await inventoryPage.clickProductTitle(SaucedemoProducts.BACKPACK.name);
    });

    await test.step("Verify navigation to product detail page", async () => {
      await expect(page).toHaveURL(/.*inventory-item\.html\?id=\d+/);
    });

    await test.step("Verify product detail page shows correct product", async () => {
      await expect(inventoryPage.inventoryItemName).toHaveText(
        SaucedemoProducts.BACKPACK.name
      );
    });
  });

  test("Should navigate to product detail page when clicking product image", async ({
    page,
    inventoryPage,
  }) => {
    await test.step("Click on bike light product image", async () => {
      await inventoryPage.clickProductImage(SaucedemoProducts.BIKE_LIGHT.name);
    });

    await test.step("Verify navigation to product detail page", async () => {
      await expect(page).toHaveURL(/.*inventory-item\.html\?id=\d+/);
    });

    await test.step("Verify product detail page shows correct product", async () => {
      await expect(inventoryPage.inventoryItemName).toHaveText(
        SaucedemoProducts.BIKE_LIGHT.name
      );
    });
  });

  test("Should navigate back to inventory page from product detail", async ({
    page,
    inventoryPage,
  }) => {
    await test.step("Navigate to product detail page", async () => {
      await inventoryPage.clickProductTitle(SaucedemoProducts.BOLT_TSHIRT.name);
    });

    await test.step("Click back to products button", async () => {
      await inventoryPage.backToProductsButton.click();
    });

    await test.step("Verify navigation back to inventory page", async () => {
      await expect(page).toHaveURL(SaucedemoUrls.INVENTORY_PAGE);
    });
  });

  test("Should navigate to cart page when clicking cart icon", async ({
    page,
    inventoryPage,
  }) => {
    await test.step("Click shopping cart link", async () => {
      await inventoryPage.goToCart();
    });

    await test.step("Verify navigation to cart page", async () => {
      await expect(page).toHaveURL(SaucedemoUrls.CART_PAGE);
    });
  });

  test("Should open and close burger menu", async ({ inventoryPage }) => {
    await test.step("Open burger menu", async () => {
      await inventoryPage.openMenu();
    });

    await test.step("Verify menu is visible", async () => {
      await expect(inventoryPage.menuItems).toBeVisible();
    });

    await test.step("Close burger menu", async () => {
      await inventoryPage.closeMenu();
    });

    await test.step("Verify menu is hidden", async () => {
      await expect(inventoryPage.menuItems).not.toBeVisible();
    });
  });

  test("Should logout successfully via burger menu", async ({
    page,
    inventoryPage,
    loginPage,
  }) => {
    await test.step("Logout via burger menu", async () => {
      await inventoryPage.logout();
    });

    await test.step("Verify navigation back to login page", async () => {
      await expect(page).toHaveURL(SaucedemoUrls.BASE_URL);
    });

    await test.step("Verify login page elements are visible", async () => {
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
    });
  });

  test("Should navigate to About page from burger menu", async ({
    page,
    inventoryPage,
  }) => {
    await test.step("Click About link and navigate", async () => {
      await inventoryPage.clickAbout();
      await page.waitForLoadState("domcontentloaded");
    });

    await test.step("Verify navigation to Sauce Labs website", async () => {
      expect(page.url()).toContain("saucelabs.com");
    });

    await test.step("Navigate back to inventory page", async () => {
      await inventoryPage.navigateToInventoryPage();
    });
  });

  test("Should reset app state via burger menu", async ({
    page,
    inventoryPage,
  }) => {
    await test.step("Add items to cart", async () => {
      await inventoryPage.addToCart(SaucedemoProducts.BACKPACK.name);
      await inventoryPage.addToCart(SaucedemoProducts.BIKE_LIGHT.name);
    });

    await test.step("Reset app state and reload", async () => {
      await inventoryPage.resetAppState();
      await inventoryPage.closeMenu();
      await page.reload();
    });

    await test.step("Verify cart is empty after reset", async () => {
      await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
    });

    await test.step("Verify Add to cart buttons are visible", async () => {
      await expect(
        inventoryPage.getAddToCartButton(SaucedemoProducts.BACKPACK.name)
      ).toBeVisible();
      await expect(
        inventoryPage.getAddToCartButton(SaucedemoProducts.BIKE_LIGHT.name)
      ).toBeVisible();
    });
  });

  test("Should maintain cart items when navigating to cart and back", async ({
    page,
    inventoryPage,
  }) => {
    await test.step("Add items to cart", async () => {
      await inventoryPage.addToCart(SaucedemoProducts.FLEECE_JACKET.name);
      await inventoryPage.addToCart(SaucedemoProducts.ONESIE.name);
    });

    await test.step("Navigate to cart page", async () => {
      await inventoryPage.goToCart();
      await expect(page).toHaveURL(SaucedemoUrls.CART_PAGE);
    });

    await test.step("Navigate back to inventory", async () => {
      await inventoryPage.clickContinueShoppingButton();
      await expect(page).toHaveURL(SaucedemoUrls.INVENTORY_PAGE);
    });

    await test.step("Verify cart still has 2 items", async () => {
      await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
      await expect(
        inventoryPage.getRemoveButton(SaucedemoProducts.FLEECE_JACKET.name)
      ).toBeVisible();
      await expect(
        inventoryPage.getRemoveButton(SaucedemoProducts.ONESIE.name)
      ).toBeVisible();
    });
  });

  test("Should prevent direct access to inventory without login", async ({
    page,
    inventoryPage,
    loginPage,
  }) => {
    await test.step("Logout first", async () => {
      await inventoryPage.logout();
      await expect(page).toHaveURL(SaucedemoUrls.BASE_URL);
    });

    await test.step("Try to access inventory page directly", async () => {
      await page.goto(SaucedemoUrls.INVENTORY_PAGE);
    });

    await test.step("Verify redirect to login page with error", async () => {
      await expect(page).toHaveURL(SaucedemoUrls.BASE_URL);
      await expect(loginPage.errorMessage).toBeVisible();
    });
  });
});
