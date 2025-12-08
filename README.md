# E2E Automation - E-commerce Website

A comprehensive end-to-end testing framework for e-commerce applications built with Playwright and TypeScript, implementing industry best practices and scalable architecture.

## 🚀 Project Overview

This project provides a robust automated testing solution for e-commerce platforms, featuring organized test architecture with Page Object Model pattern, reusable components, and TypeScript type safety for maintainable and reliable test automation.

## ✨ Key Features

- **Page Object Model Architecture**: Organized page objects in dedicated `pages/` directory for better maintainability
- **Shared Components**: Reusable utilities and helpers in `shared/` folder for DRY principles
- **TypeScript Implementation**: Full TypeScript support for type-safe test development
- **Modular Test Structure**: Well-organized test suites in `tests/` directory
- **Scalable Framework**: Built to handle complex e-commerce workflows and scenarios

## 🏗️ Project Structure

```
e2e-automation-ecommerce-website/
├── pages/              # Page Object Models
├── shared/             # Shared utilities and helpers
├── tests/              # Test suites
├── playwright.config.ts
├── package.json
└── .gitignore
```

## 📋 Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Raghad1223666/e2e-automation-ecommerce-website.git
cd e2e-automation-ecommerce-website
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Run tests with UI mode
npx playwright test --ui
```

## 🛠️ Tech Stack

- **Playwright** - Modern end-to-end testing framework
- **TypeScript** - Type-safe test development
- **Node.js** - Runtime environment

## 🎯 Best Practices Implemented

- ✅ Page Object Model design pattern
- ✅ Reusable components and utilities
- ✅ TypeScript for type safety
- ✅ Modular and scalable architecture
- ✅ Clean code principles

## 📧 Contact

**Raghad** - [GitHub Profile](https://github.com/Raghad1223666)

---

**Built with Playwright & TypeScript** - Reliable E2E testing for modern e-commerce platforms
