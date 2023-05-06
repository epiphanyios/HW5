const screenOutput = document.querySelector(".output");
const screenHistory = document.querySelector(".history");
const keys = document.querySelector(".keys");
const operators = ["+", "-", "×", "÷"];

keys.addEventListener("click", e => {
  if (e.target.matches("button.number")) {
    handleNumberInput(e.target.textContent);
  } else if (e.target.matches("button.decimal")) {
    handleDecimalInput();
  } else if (e.target.matches("button.clear")) {
    handleClear();
  } else if (e.target.matches("button.operator")) {
    handleOperatorInput(e.target.textContent);
  } else if (e.target.matches("button.equals")) {
    handleEquals();
  } else if (e.target.matches("button.square")) {
    handleSquare();
  } else if (e.target.matches("button.square-root")) {
    handleSquareRoot();
  }
});

let history = "";
let currentValue = "0";
let currentOperator = null;
let shouldResetScreen = false;

function handleNumberInput(number) {
  if (currentValue === "0" && !shouldResetScreen) {
    currentValue = "";
  }
  currentValue += number;
  updateScreen(currentValue);
}

function handleDecimalInput() {
  if (shouldResetScreen) {
    resetScreen();
  }
  if (!currentValue.includes(".")) {
    currentValue += ".";
    updateScreen(currentValue);
  }
}

function handleClear() {
  currentValue = "0";
  history = "";
  currentOperator = null;
  resetScreen();
}

function handleOperatorInput(operator) {
  if (currentOperator !== null) {
    handleEquals();
  }
  currentOperator = operator;
  if (history === "" && currentValue === "0") {
    history = "0" + operator;
  } else {
    history += currentValue + operator;
  }
  currentValue = "";
  resetScreen();
}


function handleEquals() {
  if (currentOperator === null) {
    return;
  }
  if (currentOperator === "÷" && currentValue === "0") {
    alert("Cannot divide by zero");
    handleClear();
    return;
  }
  history += currentValue;
  const expression = history.replaceAll("×", "*").replaceAll("÷", "/");
  const parts = expression.split(/(\+|\-|\*|\/)/g).filter(Boolean);
  let result = Number(parts[0]);
  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const operand = Number(parts[i + 1]);
    if (operator === "+") {
      result += operand;
    } else if (operator === "-") {
      result -= operand;
    } else if (operator === "*") {
      result *= operand;
    } else if (operator === "/") {
      result /= operand;
    }
  }
  currentValue = result.toString();
  history = "";
  currentOperator = null;
  updateScreen(currentValue);
  shouldResetScreen = true;
}

  
  
  

function handleSquare() {
  currentValue = Math.pow(Number(currentValue), 2).toString();
  updateScreen(currentValue);
}

function handleSquareRoot() {
  currentValue = Math.sqrt(Number(currentValue)).toString();
  updateScreen(currentValue);
}

function resetScreen() {
  screenOutput.textContent = "";
  shouldResetScreen = false;
}

function updateScreen(value) {
  screenOutput.textContent = value;
}
