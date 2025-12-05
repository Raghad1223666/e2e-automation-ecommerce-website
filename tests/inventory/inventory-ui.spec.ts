import { expect, test } from "../fixtures";

test.describe("Saucedemo Inventory Page - UI Elements", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await test.step("Navigate to inventory page", async () => {
      await inventoryPage.navigateToInventoryPage();
    });
  });

  test("Should display all header elements correctly", async ({ inventoryPage }) => {
    await test.step("Verify app logo is visible", async () => {
      await expect(inventoryPage.appLogo).toBeVisible();
      await expect(inventoryPage.appLogo).toHaveText("Swag Labs");
    });

    await test.step("Verify burger menu button is visible", async () => {
      await expect(inventoryPage.burgerMenuButton).toBeVisible();
    });

    await test.step("Verify shopping cart link is visible", async () => {
      await expect(inventoryPage.shoppingCartLink).toBeVisible();
    });
  });

  test("Should display inventory container and list", async ({ inventoryPage }) => {
    await test.step("Verify inventory container is visible", async () => {
      await expect(inventoryPage.inventoryContainer).toBeVisible();
    });

    await test.step("Verify inventory list is visible", async () => {
      await expect(inventoryPage.inventoryList).toBeVisible();
    });

    await test.step("Verify inventory items are visible", async () => {
      await expect(inventoryPage.inventoryItems.first()).toBeVisible();
    });
  });

  test("Should display sort dropdown", async ({ inventoryPage }) => {
    await test.step("Verify sort dropdown is visible", async () => {
      await expect(inventoryPage.sortDropdown).toBeVisible();
    });

    await test.step("Verify sort dropdown is enabled", async () => {
      await expect(inventoryPage.sortDropdown).toBeEnabled();
    });
  });

  test("Should display footer elements", async ({ inventoryPage }) => {
    await test.step("Verify footer is visible", async () => {
      await expect(inventoryPage.footer).toBeVisible();
    });

    await test.step("Verify footer text is visible", async () => {
      await expect(inventoryPage.footerText).toBeVisible();
    });
  });

  test("Should display product card elements correctly", async ({ inventoryPage }) => {
    await test.step("Verify product image is visible", async () => {
      await expect(inventoryPage.getFirstProductImage()).toBeVisible();
    });

    await test.step("Verify product name is visible", async () => {
      await expect(inventoryPage.getFirstProductName()).toBeVisible();
    });

    await test.step("Verify product description is visible", async () => {
      await expect(inventoryPage.getFirstProductDescription()).toBeVisible();
    });

    await test.step("Verify product price is visible", async () => {
      await expect(inventoryPage.getFirstProductPrice()).toBeVisible();
    });

    await test.step("Verify add to cart button is visible and enabled", async () => {
      await expect(inventoryPage.getFirstProductButton()).toBeVisible();
      await expect(inventoryPage.getFirstProductButton()).toBeEnabled();
    });
  });

  test("Should display burger menu when clicked", async ({ inventoryPage }) => {
    await test.step("Click burger menu button", async () => {
      await inventoryPage.openMenu();
    });

    await test.step("Verify menu items are visible", async () => {
      await expect(inventoryPage.menuItems).toBeVisible();
    });

    await test.step("Verify logout link is visible", async () => {
      await expect(inventoryPage.logoutLink).toBeVisible();
    });

    await test.step("Verify about link is visible", async () => {
      await expect(inventoryPage.aboutLink).toBeVisible();
    });

    await test.step("Verify reset app link is visible", async () => {
      await expect(inventoryPage.resetAppLink).toBeVisible();
    });

    await test.step("Verify close menu button is visible", async () => {
      await expect(inventoryPage.closeMenuButton).toBeVisible();
    });
  });
});
