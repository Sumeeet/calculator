# Contributing to Calculator Project

Thank you for your interest in contributing to the Calculator project! This document outlines the guidelines for contributing, including the branching strategy and CI/CD process.

---

## Branching Strategy

We follow a structured branching model to ensure code quality and maintainability. Please adhere to the following conventions when creating branches:

### Branch Types and Naming Conventions

- **Feature branches**: `feature/<feature-name>`
  - For new features or enhancements.
  - Example: `feature/add-calculator-ui`
- **Bugfix branches**: `bugfix/<bug-name>`
  - For fixing bugs.
  - Example: `bugfix/fix-division-by-zero`
- **Hotfix branches**: `hotfix/<hotfix-name>`
  - For urgent fixes to production.
  - Example: `hotfix/fix-critical-error`
- **Release branches**: `release/<version>`
  - For preparing a release.
  - Example: `release/1.0.0`
- **Issue branches**: `issue-<issue-number>`
  - For branches created automatically from GitHub issues.
  - Example: `issue-123`

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
