import { expect, test } from "../fixtures";

import { SaucedemoSortOptions } from "../../shared/constants";

test.describe("Saucedemo Inventory Page - Sorting Functionality", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await test.step("Navigate to inventory page", async () => {
      await inventoryPage.navigateToInventoryPage();
    });
  });

  test("Should have default sort order as Name (A to Z)", async ({ inventoryPage }) => {
    await test.step("Verify default sort value", async () => {
      const currentSort = await inventoryPage.getCurrentSortValue();

      expect(currentSort).toBe(SaucedemoSortOptions.NAME_A_TO_Z);
    });
  });

  test("Should sort products by Name (A to Z)", async ({ inventoryPage }) => {
    await test.step("Select sort by Name A to Z", async () => {
      await inventoryPage.sortBy(SaucedemoSortOptions.NAME_A_TO_Z);
    });

    await test.step("Verify products are sorted alphabetically A to Z", async () => {
      const productNames = await inventoryPage.getAllProductNames();
      const sortedNames = [...productNames].sort();

      expect(productNames).toEqual(sortedNames);
    });
  });

  test("Should sort products by Name (Z to A)", async ({ inventoryPage }) => {
    await test.step("Select sort by Name Z to A", async () => {
      await inventoryPage.sortBy(SaucedemoSortOptions.NAME_Z_TO_A);
    });

    await test.step("Verify products are sorted alphabetically Z to A", async () => {
      const productNames = await inventoryPage.getAllProductNames();
      const sortedNames = [...productNames].sort().reverse();

      expect(productNames).toEqual(sortedNames);
    });
  });

  test("Should sort products by Price (Low to High)", async ({ inventoryPage }) => {
    await test.step("Select sort by Price Low to High", async () => {
      await inventoryPage.sortBy(SaucedemoSortOptions.PRICE_LOW_TO_HIGH);
    });

    await test.step("Verify products are sorted by price ascending", async () => {
      const productPrices = await inventoryPage.getAllProductPrices();
      const sortedPrices = [...productPrices].sort((a, b) => a - b);

      expect(productPrices).toEqual(sortedPrices);
    });
  });

  test("Should sort products by Price (High to Low)", async ({ inventoryPage }) => {
    await test.step("Select sort by Price High to Low", async () => {
      await inventoryPage.sortBy(SaucedemoSortOptions.PRICE_HIGH_TO_LOW);
    });

    await test.step("Verify products are sorted by price descending", async () => {
      const productPrices = await inventoryPage.getAllProductPrices();
      const sortedPrices = [...productPrices].sort((a, b) => b - a);

      expect(productPrices).toEqual(sortedPrices);
    });
  });

  test("Should maintain sort order after adding item to cart", async ({ inventoryPage }) => {
    await test.step("Sort by price low to high", async () => {
      await inventoryPage.sortBy(SaucedemoSortOptions.PRICE_LOW_TO_HIGH);
    });

    await test.step("Get initial product order", async () => {
      const initialPrices = await inventoryPage.getAllProductPrices();

      await test.step("Add first product to cart", async () => {
        const firstProductName = await inventoryPage.getFirstProductNameText();

        if (firstProductName) {
          await inventoryPage.addToCart(firstProductName);
        }
      });

      await test.step("Verify sort order is maintained", async () => {
        const currentPrices = await inventoryPage.getAllProductPrices();

        expect(currentPrices).toEqual(initialPrices);
      });
    });
  });

  test("Should update sort order when changing sort option multiple times", async ({ inventoryPage }) => {
    await test.step("Sort by name Z to A", async () => {
      await inventoryPage.sortBy(SaucedemoSortOptions.NAME_Z_TO_A);
      const names = await inventoryPage.getAllProductNames();
      const sortedNames = [...names].sort().reverse();

      expect(names).toEqual(sortedNames);
    });

    await test.step("Change to sort by price low to high", async () => {
      await inventoryPage.sortBy(SaucedemoSortOptions.PRICE_LOW_TO_HIGH);
      const prices = await inventoryPage.getAllProductPrices();
      const sortedPrices = [...prices].sort((a, b) => a - b);

      expect(prices).toEqual(sortedPrices);
    });

    await test.step("Change to sort by name A to Z", async () => {
      await inventoryPage.sortBy(SaucedemoSortOptions.NAME_A_TO_Z);
      const names = await inventoryPage.getAllProductNames();
      const sortedNames = [...names].sort();

      expect(names).toEqual(sortedNames);
    });
  });
});
