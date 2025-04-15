# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-04-14

### Added

- Initial release of the calculator library.
- Supports basic arithmetic operations.
- Handles nested parentheses for operator precedence.
- Converts infix expressions to postfix notation.
- Provides error handling for invalid expressions and division by zero.

## [1.1.0] - 2025-04-15

### Added

- Support for exponentiation (`^`) operator.
- Right-associativity for the `^` operator (e.g., `2^2^3` is evaluated as `2^(2^3)`).
- Support for negative numbers in expressions (e.g., `2^-2`).
- Enhanced error handling for invalid expressions, including:
  - Consecutive operators (e.g., `2^^3`).
  - Unsupported tokens.
- Improved `isNumber` function to handle both positive and negative numbers.
- Added test cases for exponentiation, negative numbers, and edge cases.
