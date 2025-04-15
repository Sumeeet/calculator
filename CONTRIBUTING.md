# Contributing to Calculator Project

Thank you for your interest in contributing to the Calculator project! This document outlines the guidelines for contributing, including the branching strategy and CI/CD process.

---

## Branching Strategy

We follow a structured branching model to ensure code quality and maintainability. Please adhere to the following conventions when creating branches:

### Branch Naming Conventions

When creating a new branch, follow these naming conventions:

- **master**: The production-ready branch.
- **develop**: The main development branch.
- **feature/<feature-name>**: For new features (e.g., `feature/add-login`).
- **bugfix/<issue-id>**: For bug fixes (e.g., `bugfix/123-fix-typo`).
- **hotfix/<description>**: For urgent fixes (e.g., `hotfix/fix-critical-bug`).
- **release/<version>**: For release preparation (e.g., `release/1.2.0`).
- **issue-<id>**: For issue-specific branches (e.g., `issue-456`).
- **dependabot/npm_and_yarn/<dependency-name>**: For Dependabot updates.

Branches that do not follow these conventions will fail the CI validation.

### Rules

- Branch names **must** follow the naming conventions above.
- Direct commits to `main` or `develop` are **not allowed**. All changes must go through a pull request.

---

## Pull Request Workflow

1. **Create a branch**:

   - Use the appropriate naming convention for your branch.
   - Ensure your branch is based on the latest `develop` branch.

2. **Make changes**:

   - Write clean, well-documented code.
   - Ensure your changes are covered by tests.

3. **Run tests locally**:

   - Run `npm install` to install dependencies.
   - Run `npm test` to ensure all tests pass.
   - Run `npm run lint` to check for linting issues.

4. **Submit a pull request**:

   - Open a pull request against the `develop` branch.
   - Provide a clear description of your changes.
   - Link any related issues in the pull request description.

5. **Review and approval**:
   - Your pull request will be reviewed by at least one team member.
   - All CI checks must pass before the pull request can be merged.

---

## CI/CD Process

Our CI/CD pipeline is automated using GitHub Actions. The following steps are performed for every branch and pull request:

1. **Branch Name Validation**:

   - Ensures the branch name follows the naming conventions.

2. **Dependency Installation**:

   - Installs all required dependencies using `npm install`.

3. **Build Validation**:

   - Runs `npm run build --if-present` to validate the build process.

4. **Code Quality Checks**:

   - Runs `npm run lint` to check for linting issues.

5. **Automated Tests**:

   - Runs `npm test` to execute all unit tests.

6. **Environment**:
   - The `CI=true` environment variable is set to ensure tests run in CI mode.

---

## Continuous Integration (CI)

This project uses GitHub Actions for CI. The following checks are performed automatically when you push changes or create a pull request:

1. **Branch Name Validation**:
   - Your branch name must follow the naming conventions listed above.
   - If the branch name is invalid, the CI workflow will fail.

2. **Node.js Version Matrix**:
   - The CI workflow tests the code on Node.js versions `16.x` and `18.x`.

3. **Linting**:
   - The code is checked for style and syntax issues using ESLint.

4. **Tests**:
   - All unit tests are run using Mocha.
   - Ensure all tests pass before submitting a pull request.

5. **Build (if applicable)**:
   - If a `build` script exists in `package.json`, it will be executed.

### Running Tests Locally

Before pushing your changes, run the following commands to ensure everything works:

```bash
npm install
npm run lint
npm test
```

---

## Deployment Process

- **Staging**:
  - Code merged into the `develop` branch is automatically deployed to the staging environment.
- **Production**:
  - Code merged into the `main` branch is automatically deployed to the production environment.

---

## Additional Guidelines

- Write meaningful commit messages.
- Ensure your code adheres to the project's coding standards.
- Avoid introducing breaking changes unless absolutely necessary.

Thank you for contributing to the Calculator project! If you have any questions, feel free to reach out to the maintainers.
