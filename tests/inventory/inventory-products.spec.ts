import { expect, test } from "../fixtures";

import { ALL_PRODUCTS } from "../../shared/constants";

test.describe("Saucedemo Inventory Page - Product Information", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await test.step("Navigate to inventory page", async () => {
      await inventoryPage.navigateToInventoryPage();
    });
  });

  test("Should display correct number of products", async ({
    inventoryPage,
  }) => {
    await test.step("Verify 6 products are displayed", async () => {
      const productCount = await inventoryPage.getInventoryItemCount();

      expect(productCount).toBe(6);
    });
  });

  // Parameterized test for all product information with soft assertions
  for (const product of ALL_PRODUCTS) {
    test(`Should verify all information for ${product.name}`, async ({
      inventoryPage,
    }) => {
      await test.step(`Verify ${product.name} product name`, async () => {
        await expect
          .soft(inventoryPage.getProductTitle(product.name))
          .toHaveText(product.name);
      });

      await test.step(`Verify ${product.name} price`, async () => {
        await expect
          .soft(inventoryPage.getProductPrice(product.name))
          .toHaveText(product.price);
      });

      await test.step(`Verify ${product.name} description`, async () => {
        await expect
          .soft(inventoryPage.getProductDescription(product.name))
          .toHaveText(product.description);
      });

      await test.step(`Verify ${product.name} image is loaded`, async () => {
        const image = inventoryPage.getProductImage(product.name);

        await expect.soft(image).toBeVisible();
        await expect
          .soft(image)
          .toHaveAttribute("src", /.*\/.*\.(jpg|png|webp)/);
      });
    });
  }
});
