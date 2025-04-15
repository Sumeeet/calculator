const OPERATOR_PRECEDENCE = {
  "^": 4, // Add exponentiation with the highest precedence
  "*": 3,
  "/": 3,
  "+": 2,
  "-": 2,
};

const SUPPORTED_OPERATORS = /[*/+\-^]/; // Add '^' to supported operators
const SUPPORTED_PARENS = /[()]/;

const ERRORS = {
  INVALID_POSTFIX: "Postfix array is empty or invalid.",
  INVALID_OPERATOR: (expr, token) =>
    `Invalid expression: ${expr}. Operator '${token}' requires two operands.`,
  UNSUPPORTED_TOKEN: (token) => `Unsupported token encountered: '${token}'`,
  INVALID_EXPRESSION: (postFixArr) =>
    `Invalid postfix expression: ${postFixArr.join(" ")}`,
  MISMATCHED_PARENS: "Mismatched parentheses in the expression.",
};

const ASSOCIATIVITY = {
  "^": "right", // Exponentiation is right-associative
  "*": "left", // Multiplication is left-associative
  "/": "left", // Division is left-associative
  "+": "left", // Addition is left-associative
  "-": "left", // Subtraction is left-associative
};

/**
 * Checks if a string is a valid number.
 * Example:
 *   isNumber("123") -> true
 *   isNumber("-123") -> true
 *   isNumber("+123") -> true
 *   isNumber("12.34") -> true
 *   isNumber("-12.34") -> true
 *   isNumber("abc") -> false
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is a valid number, false otherwise.
 */
function isNumber(str) {
  return /^[-+]?\d+(\.\d+)?$/.test(str);
}

/**
 * Checks if a string is a valid operator.
 * Example:
 *   isOperator("+") -> true
 *   isOperator("-") -> true
 *   isOperator("x") -> false
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is a supported operator, false otherwise.
 */
function isOperator(str) {
  return SUPPORTED_OPERATORS.test(str);
}

/**
 * Checks if a string is a valid parenthesis.
 * Example:
 *   isParen("(") -> true
 *   isParen(")") -> true
 *   isParen("{") -> false
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is a supported parenthesis, false otherwise.
 */
function isParen(str) {
  return SUPPORTED_PARENS.test(str);
}

/**
 * Tokenizes an infix expression into an array of string tokens.
 * Example:
 *   tokenizeExpression("3+5*(2-8)") -> ["3", "+", "5", "*", "(", "2", "-", "8", ")"]
 *   tokenizeExpression("12.5 + 3") -> ["12.5", "+", "3"]
 * @param {string} expr - A valid infix expression (e.g., "2+3*4+(8+2)").
 * @returns {string[]} - Array of tokens (numbers, operators, parentheses).
 * @throws {Error} - Throws an error if unsupported characters are encountered.
 */
function tokenizeExpression(expr) {
  const tokens = [];
  let currentNumber = "";

  expr.split("").forEach((char, index) => {
    if (char === " ") {
      // Skip spaces
    } else if (isNumber(char) || char === ".") {
      currentNumber += char;
    } else if (isOperator(char) || isParen(char)) {
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = "";
      }

      // Handle negative numbers
      if (
        char === "-" &&
        (index === 0 || isOperator(expr[index - 1]) || expr[index - 1] === "(")
      ) {
        currentNumber = "-"; // Start a negative number
      } else {
        tokens.push(char);
      }
    } else {
      throw new Error(ERRORS.UNSUPPORTED_TOKEN(char));
    }
  });

  if (currentNumber) {
    tokens.push(currentNumber);
  }

  return tokens;
}

/**
 * Converts an infix expression array to a postfix expression array.
 * This uses the Shunting Yard algorithm.
 * Example:
 *   convertToPostfix(
 *     ["3", "+", "5", "*", "(", "2", "-", "8", ")"]
 *   ) -> ["3", "5", "2", "8", "-", "*", "+"]
 *   convertToPostfix(["12.5", "+", "3"]) -> ["12.5", "3", "+"]
 * @param {string[]} infixTokens - Array of tokens in infix notation.
 * @returns {string[]} - Array of tokens in postfix notation.
 * @throws {Error} - Throws an error if the input is invalid or contains unsupported tokens.
 */
function convertToPostfix(infixTokens) {
  if (!Array.isArray(infixTokens) || infixTokens.length === 0) {
    throw new Error("Input must be a non-empty array of tokens.");
  }

  const operatorStack = [];
  const outputQueue = [];

  infixTokens.forEach((token, index) => {
    if (isNumber(token)) {
      outputQueue.push(token);
    } else if (isOperator(token)) {
      // Check for consecutive operators
      if (
        index > 0 &&
        isOperator(infixTokens[index - 1]) &&
        !(infixTokens[index - 1] === "^" && token === "-")
      ) {
        throw new Error(
          `Invalid expression: Consecutive operators '${infixTokens[index - 1]}' and '${token}' are not allowed.`,
        );
      }

      // Handle operator precedence and associativity
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "(" &&
        // For left-associative operators, pop if precedence is greater or equal
        ((OPERATOR_PRECEDENCE[token] <=
          OPERATOR_PRECEDENCE[operatorStack[operatorStack.length - 1]] &&
          ASSOCIATIVITY[token] === "left") ||
          // For right-associative operators, pop only if precedence is greater
          (OPERATOR_PRECEDENCE[token] <
            OPERATOR_PRECEDENCE[operatorStack[operatorStack.length - 1]] &&
            ASSOCIATIVITY[token] === "right"))
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop());
      }
      if (operatorStack.length === 0) {
        throw new Error(ERRORS.MISMATCHED_PARENS);
      }
      operatorStack.pop(); // Remove the opening parenthesis.
    } else {
      throw new Error(ERRORS.UNSUPPORTED_TOKEN(token));
    }
  });

  // Check for unmatched opening parentheses.
  while (operatorStack.length > 0) {
    const top = operatorStack.pop();
    if (top === "(" || top === ")") {
      throw new Error(ERRORS.MISMATCHED_PARENS);
    }
    outputQueue.push(top);
  }

  return outputQueue;
}

/**
 * Performs a mathematical operation on two operands.
 * Example:
 *   performOperation("+", 3, 5) -> 8
 *   performOperation("/", 10, 2) -> 5
 *   performOperation("/", 1, 0) -> Infinity
 * @param {string} operator - The operator to apply (e.g., "+", "-", "*", "/").
 * @param {number} first - The first operand.
 * @param {number} second - The second operand.
 * @returns {number} - The result of the operation.
 * @throws {Error} - Throws an error if the operator is unsupported or division by zero occurs.
 */
function performOperation(operator, first, second) {
  const OPERATIONS = {
    "^": (a, b) => Math.pow(a, b), // Add exponentiation logic
    "*": (a, b) => a * b,
    "/": (a, b) => {
      if (b === 0) {
        if (a === 0) {
          throw new Error("Division by zero is undefined (0 / 0).");
        }
        return Infinity; // Handle division by zero for non-zero numerator.
      }
      return a / b;
    },
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };

  if (!OPERATIONS[operator]) {
    throw new Error(`Unsupported operator: ${operator}`);
  }

  return OPERATIONS[operator](first, second);
}

/**
 * Evaluates a postfix expression to a valid numerical result.
 * Example:
 *   evaluatePostfixExpression("3+5", ["3", "5", "+"]) -> 8
 *   evaluatePostfixExpression("3+5*2", ["3", "5", "2", "*", "+"]) -> 13
 * @param {string} infixExpr - The original infix expression (used for error context).
 * @param {string[]} postfixTokens - Array of tokens in postfix notation.
 * @returns {number} - The evaluated result of the postfix expression.
 * @throws {Error} - Throws an error if the postfix expression is invalid.
 */
function evaluatePostfixExpression(infixExpr, postfixTokens) {
  if (!Array.isArray(postfixTokens) || postfixTokens.length === 0) {
    throw new Error(ERRORS.INVALID_POSTFIX);
  }

  const operandStack = [];

  postfixTokens.forEach((token) => {
    if (isNumber(token)) {
      operandStack.push(Number(token));
    } else if (isOperator(token)) {
      if (operandStack.length < 2) {
        throw new Error(ERRORS.INVALID_OPERATOR(infixExpr, token));
      }
      const second = operandStack.pop();
      const first = operandStack.pop();
      operandStack.push(performOperation(token, first, second));
    } else {
      throw new Error(ERRORS.UNSUPPORTED_TOKEN(token));
    }
  });

  if (operandStack.length !== 1) {
    throw new Error(ERRORS.INVALID_EXPRESSION(postfixTokens));
  }

  return operandStack.pop();
}

/**
 * Parses an infix algebraic expression, converts it to postfix notation,
 * and evaluates the result.
 * Example:
 *   parseExpr("3+5") -> 8
 *   parseExpr("3+5*2") -> 13
 *   parseExpr("(3+5)*2") -> 16
 * @param {string} expr - A valid infix expression (e.g., "3+4*5").
 * @returns {number} - The evaluated result of the expression.
 * @throws {Error} - Throws an error if the input is invalid or unsupported.
 */
export const parseExpr = (expr) => {
  if (typeof expr !== "string" || expr.trim() === "") {
    throw new Error(
      "Invalid expression: Expression must be a non-empty string.",
    );
  }

  const infixTokens = tokenizeExpression(expr);
  const postfixTokens = convertToPostfix(infixTokens);
  return evaluatePostfixExpression(expr, postfixTokens);
};
