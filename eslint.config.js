import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import mochaPlugin from "eslint-plugin-mocha";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        describe: "readonly", // Define Mocha globals
        it: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    plugins: {
      prettier: prettierPlugin,
      mocha: mochaPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": ["warn"],
      "no-console": "off",
      "mocha/no-exclusive-tests": "error", // Prevent `.only` in tests
      "mocha/no-skipped-tests": "warn", // Warn about skipped tests
    },
  },
  prettierConfig,
];
