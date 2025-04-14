/* eslint-env mocha */
import assert from "assert";
import { parseExpr } from "../calculator.js";

describe("Calculator", () => {
  describe("Addition Tests", () => {
    it("should return 10 when the expression is 5 + 5", () => {
      assert.strictEqual(parseExpr("5+5"), 10);
    });

    it("should return 0 when the expression is 0 + 0", () => {
      assert.strictEqual(parseExpr("0+0"), 0);
    });

    it("should return 2000000 when the expression is 1000000 + 1000000", () => {
      assert.strictEqual(parseExpr("1000000+1000000"), 2000000);
    });

    it("should return 23.23 when the expression is 23 + 0.23", () => {
      assert.strictEqual(parseExpr("23+0.23").toFixed(2), "23.23");
    });

    it("should return 30 when the expression is 10 + 10 + 5 + 5", () => {
      assert.strictEqual(parseExpr("10+10+5+5"), 30);
    });

    it("should return 30 when the expression has extra spaces (e.g., ' 10 + 10 + 5 + 5 ')", () => {
      assert.strictEqual(parseExpr("  10 + 10 + 5 + 5  "), 30);
    });

    it("should return 0.3 when the expression is 0.1 + 0.2", () => {
      assert.strictEqual(Number(parseExpr("0.1+0.2").toFixed(2)), 0.3);
    });
  });

  describe("Subtraction Tests", () => {
    it("should return 0 when the expression is 5 - 5", () => {
      assert.strictEqual(parseExpr("5-5"), 0);
    });

    it("should return 1 when the expression is 1 - 0", () => {
      assert.strictEqual(parseExpr("1-0"), 1);
    });

    it("should return 0.3 when the expression is 0.5 - 0.2", () => {
      assert.strictEqual(parseExpr("0.5-0.2"), 0.3);
    });
  });

  describe("Multiplication Tests", () => {
    it("should return 25 when the expression is 5 * 5", () => {
      assert.strictEqual(parseExpr("5*5"), 25);
    });

    it("should return 0 when the expression is 5 * 0", () => {
      assert.strictEqual(parseExpr("5*0"), 0);
    });

    it("should return 0.25 when the expression is 0.5 * 0.5", () => {
      assert.strictEqual(parseExpr("0.5*0.5"), 0.25);
    });
  });

  describe("Division Tests", () => {
    it("should return 0 when the expression is 0 / 5", () => {
      assert.strictEqual(parseExpr("0/5"), 0);
    });

    it("should throw an error when the expression is 0 / 0", () => {
      assert.throws(() => parseExpr("0/0"), /Division by zero is undefined/);
    });

    it("should return Infinity when the expression is 1 / 0", () => {
      assert.strictEqual(parseExpr("1/0"), Infinity);
    });

    it("should return 0.33333 when the expression is 1 / 3", () => {
      assert.strictEqual(parseExpr("1/3").toFixed(5), "0.33333");
    });

    it("should return 2 when the expression is 6 / 3", () => {
      assert.strictEqual(parseExpr("6/3"), 2);
    });
  });

  describe("Complex Expressions", () => {
    it("should return 11 when the expression is 2 + 3 * 3 / (4 - 3)", () => {
      assert.strictEqual(parseExpr("2+3*3/(4-3)"), 11);
    });

    it("should return 19 when the expression is 3 + 8 / 2 * 4", () => {
      assert.strictEqual(parseExpr("3+8/2*4"), 19);
    });

    it("should return 4 when the expression is 3 + 8 / (2 * 4)", () => {
      assert.strictEqual(parseExpr("3+8/(2*4)"), 4);
    });

    it("should return 1 when the expression is (3 + 5) / (2 * 4)", () => {
      assert.strictEqual(parseExpr("(3+5)/(2*4)"), 1);
    });

    it("should return 5 when the expression is 1 + ((3 + 5) * 4 / (2 * 4))", () => {
      assert.strictEqual(parseExpr("1+((3+5)*4/(2*4))"), 5);
    });

    it("should return 5 when the expression is 1 + ((3 + 5) * (4 / (2 * 4)))", () => {
      assert.strictEqual(parseExpr("1+((3+5)*(4/(2*4)))"), 5);
    });
  });

  describe("Invalid Expressions", () => {
    it("should throw an error for invalid characters in the expression", () => {
      assert.throws(() => parseExpr("2^3"), /Unsupported token encountered/);
    });

    it("should throw an error for incomplete expressions like '3+'", () => {
      assert.throws(() => parseExpr("3+"), /Invalid expression/);
    });

    it("should throw an error for consecutive operators like '+*3'", () => {
      assert.throws(
        () => parseExpr("+*3"),
        /Invalid expression: Consecutive operators '\+' and '\*' are not allowed./,
      );
    });

    it("should throw an error for mismatched parentheses", () => {
      assert.throws(
        () => parseExpr("(3+5)*4/(2*4"),
        /Mismatched parentheses in the expression/,
      );
    });

    it("should throw an error for extra closing parentheses", () => {
      assert.throws(
        () => parseExpr("3+5)*4"),
        /Mismatched parentheses in the expression/,
      );
    });

    it("should throw an error for empty expressions", () => {
      assert.throws(
        () => parseExpr(""),
        /Invalid expression: Expression must be a non-empty string/,
      );
    });

    it("should throw an error for invalid characters in the expression", () => {
      assert.throws(
        () => parseExpr("3a+5"),
        /Unsupported token encountered: 'a'/,
      );
    });
  });

  describe("Valid Expressions", () => {
    it("should correctly evaluate a simple addition", () => {
      assert.strictEqual(parseExpr("3+5"), 8);
    });

    it("should correctly evaluate a complex expression with nested parentheses", () => {
      assert.strictEqual(parseExpr("1 + ((3 + 5) * 4 / (2 * 4))"), 5);
    });

    it("should correctly evaluate an expression with multiple operators", () => {
      assert.strictEqual(parseExpr("3 + 4 * 2 / (1 - 5)"), 1);
    });
  });
});
