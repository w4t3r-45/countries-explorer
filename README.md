# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

# Project Overview

This project is designed with high code quality, performance, and maintainability in mind. It incorporates modern patterns for API implementation and emphasizes clean, efficient code.

Continuous Integration (CI)

Our project uses a GitHub Actions CI workflow that leverages two powerful tools for code quality:

Oxlint – a fast and effective linter to ensure consistent code style and catch issues early.

Biome – provides both linting and formatting capabilities, helping keep the codebase clean and standardized.

The CI workflow automatically runs on pull requests and on manual triggers (workflow_dispatch), ensuring that all contributions adhere to the project’s quality standards before being merged.

Testing

The project includes a comprehensive test suite. To run the tests locally:

# Using npm

npm run test

# Using yarn

yarn test

Tests help maintain reliability and correctness of the application as it evolves.

Code Patterns & Performance

The project follows well-structured API patterns and best practices to ensure:

Efficient and maintainable code

Optimized performance

Clear separation of concerns

Consistent and readable code style

By combining good testing, CI checks, and modern development patterns, this project ensures high-quality output and a smooth development workflow.
