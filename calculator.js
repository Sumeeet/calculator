/* eslint-disable no-restricted-syntax */
/* eslint-disable brace-style */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

function parseExpr(expr) {
  // minus in the begining of expression fails i.e. -2 + 3 gives 5 instead of 1
  if (expr === "") {
    console.error("Emtpy expression. Please provide valid expression");
    return expr;
  }
  const postfixExprArray = convertToRpn(expr);
  const result = evaluateExpr(postfixExprArray);
  console.log(`RPN expression : ${postfixExprArray} evaluates to ${result}`);
  return result;
}

function convertToRpn(expr) {
  const opPrecedence = {
    "*": 3, "/": 3, "+": 2, "-": 2, "(": 1,
  };

  const opStack = [];
  const outQueue = [];
  let tokenizer = [];

  for (const char of expr) {
    if (isOperand(char)) {
      tokenizer.push(char);
    }
    else if (isOperator(char)) {
      if (tokenizer.length > 0) {
        outQueue.push(tokenizer.reduce((accum, curValue) => accum + curValue));
        tokenizer = [];
      }
      while (opStack.length !== 0
        && opPrecedence[opStack[opStack.length - 1]] >= opPrecedence[char]) {
        outQueue.push(opStack.pop());
      }
      opStack.push(char);
    }
    /*
    else if (char.match(/\(/)) {
      opStack.push(char);
    }
    else if (char.match(/\)/)) {
      char top = opStack.pop();
      while()
      opStack.push(char);
    }
    */
  }

  if (tokenizer.length > 0) {
    outQueue.push(tokenizer.reduce((accum, curValue) => accum + curValue));
    tokenizer = [];
  }

  while (opStack.length !== 0) {
    outQueue.push(opStack.pop());
  }
  return outQueue;
}

function evaluateExpr(postfixExprArray) {
  const operandStack = [];
  postfixExprArray.forEach((element) => {
    if (isOperand(element)) {
      operandStack.push(element);
    }
    else if (isOperator(element)) {
      if (operandStack.length <= 1) {
        console.error(`Operation : ${element} requires two operand. Second Operand is missing`);
        return operandStack.toString();
      }
      switch (element) {
        case "*":
          operandStack.push(Number(operandStack.pop()) * Number(operandStack.pop()));
          break;
        case "/":
          operandStack.push(Number(operandStack.pop()) / Number(operandStack.pop()));
          break;
        case "+":
          operandStack.push(Number(operandStack.pop()) + Number(operandStack.pop()));
          break;
        case "-":
          operandStack.push(Number(operandStack.pop()) - Number(operandStack.pop()));
          break;
        default:
          console.error(`operation not supported: ${element}`);
      }
    }
  });
  return operandStack.toString();
}

function isOperand(char) {
  return /[0-9]+/.test(char);
}

function isOperator(char) {
  return /\*|\/|\+|-/.test(char);
}
