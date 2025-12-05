export const SaucedemoUrls = {
  BASE_URL: "https://www.saucedemo.com/",
  INVENTORY_PAGE: "https://www.saucedemo.com/inventory.html",
  CART_PAGE: "https://www.saucedemo.com/cart.html",
} as const;

export const SaucedemoCredentials = {
  STANDARD_USER: {
    username: "standard_user",
    password: "secret_sauce",
  },
  LOCKED_OUT_USER: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
  PROBLEM_USER: {
    username: "problem_user",
    password: "secret_sauce",
  },
  PERFORMANCE_GLITCH_USER: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
  ERROR_USER: {
    username: "error_user",
    password: "secret_sauce",
  },
  VISUAL_USER: {
    username: "visual_user",
    password: "secret_sauce",
  },
} as const;

export const SaucedemoMessages = {
  LOCKED_OUT_ERROR: "Epic sadface: Sorry, this user has been locked out.",
  INVALID_CREDENTIALS_ERROR:
    "Epic sadface: Username and password do not match any user in this service",
  USERNAME_REQUIRED_ERROR: "Epic sadface: Username is required",
  PASSWORD_REQUIRED_ERROR: "Epic sadface: Password is required",
} as const;

export const SaucedemoProducts = {
  BACKPACK: {
    name: "Sauce Labs Backpack",
    description:
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    price: "$29.99",
  },
  BIKE_LIGHT: {
    name: "Sauce Labs Bike Light",
    description:
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    price: "$9.99",
  },
  BOLT_TSHIRT: {
    name: "Sauce Labs Bolt T-Shirt",
    description:
      "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
    price: "$15.99",
  },
  FLEECE_JACKET: {
    name: "Sauce Labs Fleece Jacket",
    description:
      "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    price: "$49.99",
  },
  ONESIE: {
    name: "Sauce Labs Onesie",
    description:
      "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    price: "$7.99",
  },
  TSHIRT_RED: {
    name: "Test.allTheThings() T-Shirt (Red)",
    description:
      "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
    price: "$15.99",
  },
} as const;

export const ALL_PRODUCTS = Object.values(SaucedemoProducts);

export const SaucedemoSortOptions = {
  NAME_A_TO_Z: "az",
  NAME_Z_TO_A: "za",
  PRICE_LOW_TO_HIGH: "lohi",
  PRICE_HIGH_TO_LOW: "hilo",
} as const;
