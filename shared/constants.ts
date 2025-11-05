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
