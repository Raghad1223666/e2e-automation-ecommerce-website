import { expect, test } from "../fixtures";
import { ALL_PRODUCTS } from "../../shared/constants";

const THREE_PRODUCTS = ALL_PRODUCTS.slice(0, 3);
const TWO_PRODUCTS = ALL_PRODUCTS.slice(0, 2);

test.describe("Saucedemo Inventory Page - Cart Functionality", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await test.step("Navigate to inventory page", async () => {
      await inventoryPage.navigateToInventoryPage();
    });
  });

  test("Should not display cart badge when cart is empty", async ({
    inventoryPage,
  }) => {
    await test.step("Verify cart badge is not visible", async () => {
      await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
    });
  });

  test("Should add single item to cart", async ({ inventoryPage }) => {
    await test.step("Add item to cart", async () => {
      await inventoryPage.addToCart(ALL_PRODUCTS[0].name);
    });

    await test.step("Verify cart badge shows 1 item", async () => {
      await expect(inventoryPage.shoppingCartBadge).toBeVisible();
      await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    });

    await test.step("Verify button text changes to Remove", async () => {
      await expect(
        inventoryPage.getRemoveButton(ALL_PRODUCTS[0].name)
      ).toBeVisible();
    });
  });

  test("Should add multiple items to cart", async ({ inventoryPage }) => {
    await test.step("Add 3 items to cart", async () => {
      for (const product of THREE_PRODUCTS) {
        await inventoryPage.addToCart(product.name);
      }
    });

    await test.step("Verify cart badge shows 3 items", async () => {
      await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
    });

    await test.step("Verify all items show Remove button", async () => {
      for (const product of THREE_PRODUCTS) {
        await expect(inventoryPage.getRemoveButton(product.name)).toBeVisible();
      }
    });
  });

  test("Should remove item from cart via inventory page", async ({
    inventoryPage,
  }) => {
    await test.step("Add item to cart", async () => {
      await inventoryPage.addToCart(ALL_PRODUCTS[0].name);
    });

    await test.step("Verify cart has 1 item", async () => {
      await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    });

    await test.step("Remove item from cart", async () => {
      await inventoryPage.removeFromCart(ALL_PRODUCTS[0].name);
    });

    await test.step("Verify cart badge is not visible", async () => {
      await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
    });

    await test.step("Verify button text changes back to Add to cart", async () => {
      await expect(
        inventoryPage.getAddToCartButton(ALL_PRODUCTS[0].name)
      ).toBeVisible();
    });
  });

  test("Should update cart count correctly when adding and removing items", async ({
    inventoryPage,
  }) => {
    await test.step("Add 3 items to cart", async () => {
      for (const product of THREE_PRODUCTS) {
        await inventoryPage.addToCart(product.name);
      }
      await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
    });

    await test.step("Remove 1 item", async () => {
      await inventoryPage.removeFromCart(THREE_PRODUCTS[1].name);
      await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
    });

    await test.step("Add 1 more item", async () => {
      await inventoryPage.addToCart(ALL_PRODUCTS[3].name);
      await expect(inventoryPage.shoppingCartBadge).toHaveText("3");
    });

    await test.step("Remove all items", async () => {
      await inventoryPage.removeFromCart(THREE_PRODUCTS[0].name);
      await inventoryPage.removeFromCart(THREE_PRODUCTS[2].name);
      await inventoryPage.removeFromCart(ALL_PRODUCTS[3].name);
      await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
    });
  });

  test("Should add all products to cart", async ({ inventoryPage }) => {
    await test.step("Add all 6 products to cart", async () => {
      for (const product of ALL_PRODUCTS) {
        await inventoryPage.addToCart(product.name);
      }
    });

    await test.step("Verify cart badge shows 6 items", async () => {
      await expect(inventoryPage.shoppingCartBadge).toHaveText("6");
    });

    await test.step("Verify all products show Remove button", async () => {
      const itemCount = await inventoryPage.getInventoryItemCount();

      expect(itemCount).toBe(6);

      for (const product of ALL_PRODUCTS) {
        await expect(inventoryPage.getRemoveButton(product.name)).toBeVisible();
      }
    });
  });

  test("Should maintain cart state after page refresh", async ({
    page,
    inventoryPage,
  }) => {
    await test.step("Add items to cart", async () => {
      for (const product of TWO_PRODUCTS) {
        await inventoryPage.addToCart(product.name);
      }
    });

    await test.step("Refresh the page", async () => {
      await page.reload();
    });

    await test.step("Verify cart still has 2 items", async () => {
      await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
      for (const product of TWO_PRODUCTS) {
        await expect(inventoryPage.getRemoveButton(product.name)).toBeVisible();
      }
    });
  });

  test("Should handle rapid add and remove actions", async ({
    inventoryPage,
  }) => {
    await test.step("Rapidly add and remove the same item", async () => {
      await inventoryPage.addToCart(ALL_PRODUCTS[0].name);
      await inventoryPage.removeFromCart(ALL_PRODUCTS[0].name);
      await inventoryPage.addToCart(ALL_PRODUCTS[0].name);
      await inventoryPage.removeFromCart(ALL_PRODUCTS[0].name);
      await inventoryPage.addToCart(ALL_PRODUCTS[0].name);
    });

    await test.step("Verify final cart state is correct", async () => {
      await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
      await expect(
        inventoryPage.getRemoveButton(ALL_PRODUCTS[0].name)
      ).toBeVisible();
    });
  });
});
