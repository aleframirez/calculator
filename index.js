const screen = document.querySelector("#screen");

const buttons = document.querySelectorAll(".btn");

const history = document.querySelector("#history");

const resetScreen = () => {
  screen.textContent = "0";
};

const deleteLastNumber = () => {
  if (
    screen.textContent.length === 1 ||
    screen.textContent === "SyntaxtError!" ||
    screen.textContent === "MathError!"
  ) {
    resetScreen();
  } else {
    screen.textContent = screen.textContent.slice(0, -1);
  }
};

const calculateOperation = () => {
  try {
    const result = Function(`'use strict'; return (${screen.textContent})`)();
    addToHistory(screen.textContent, result);
    screen.textContent = Number.isFinite(result) ? result : "MathError!";
  } catch {
    screen.textContent = "SyntaxtError!";
  }
};

const addToScreen = (num) => {
  if (screen.textContent === "0" || screen.textContent === "SyntaxtError!") {
    screen.textContent = num;
  } else {
    screen.textContent += num;
  }
};

const buttonClick = (button) => {
  const buttonClicked = button.textContent;

  switch (button.id) {
    case "c":
      resetScreen();
      break;
    case "delete":
      deleteLastNumber();
      break;
    case "equal":
      calculateOperation();
      break;
    case "delete-history":
      deleteHistory();
      break;
    default:
      addToScreen(buttonClicked);
      break;
  }
};

const addToHistory = (expression, result) => {
  if (
    screen.textContent === "0" ||
    screen.textContent === "MathError!" ||
    screen.textContent === "SyntaxtError!" ||
    result === Infinity
  ) {
    return;
  } else {
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.textContent = `${expression} = ${result}`;
    history.appendChild(historyItem);
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => buttonClick(button));
});

document.addEventListener("keydown", (event) => {
  const validKeys = "0123456789+-*/().";
  if (validKeys.includes(event.key)) {
    addToScreen(event.key);
  } else if (event.key === "Enter") {
    calculateOperation();
  } else if (event.key === "Backspace") {
    deleteLastNumber();
  } else if (event.key === "Escape") {
    resetScreen();
  }
});

const deleteHistory = () => {
  history.innerHTML = "";
};
