// DOM Elements
const result = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');

// Calculator state
let currentInput = '';
let previousInput = '';
let operator = null;

// Event Listener for Buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleInput(value);
  });
});

// Handle Button Input
function handleInput(value) {
  if (value === 'C') {
    clearDisplay();
  } else if (value === '=') {
    calculateResult();
  } else if (['+', '-', '*', '/'].includes(value)) {
    setOperator(value);
  } else {
    appendValue(value);
  }
}

// Append Numbers/Dot to the Current Input
function appendValue(value) {
  if (value === '.' && currentInput.includes('.')) return; // Prevent multiple dots
  currentInput += value;
  updateDisplay(currentInput);
}

// Set the Operator
function setOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') calculateResult(); // If already have a value, calculate
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

// Calculate the Result
function calculateResult() {
  if (previousInput === '' || currentInput === '' || !operator) return;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  let resultValue = 0;
  switch (operator) {
    case '+':
      resultValue = prev + curr;
      break;
    case '-':
      resultValue = prev - curr;
      break;
    case '*':
      resultValue = prev * curr;
      break;
    case '/':
      resultValue = curr === 0 ? 'Error' : prev / curr; // Handle division by zero
      break;
  }

  updateDisplay(resultValue);
  resetCalculator(resultValue);
}

// Clear the Display
function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay(0);
}

// Reset Calculator
function resetCalculator(value) {
  currentInput = value.toString();
  previousInput = '';
  operator = null;
}

// Update the Display
function updateDisplay(value) {
  result.value = value;
}
