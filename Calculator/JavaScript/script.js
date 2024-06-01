const screen = document.getElementById('screen');
const expressionDisplay = document.getElementById('expression');
const buttons = document.querySelectorAll('.button');
let currentInput = '';
let operator = '';
let firstOperand = '';
let shouldResetScreen = false;
let expression = '';
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'AC') {
            resetCalculator();
        } else if (value === 'DE') {
            deleteLastCharacter();
        } else if (value === '=') {
            handleEqual();
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    });
});

function resetCalculator() {
    currentInput = '';
    operator = '';
    firstOperand = '';
    expression = '';
    screen.textContent = '0';
    expressionDisplay.textContent = '';
    resultDisplayed = false;
}

function deleteLastCharacter() {
    currentInput = currentInput.slice(0, -1) || '';
    if (currentInput === '') {
        screen.textContent = '0';
    } else {
        screen.textContent = currentInput;
    }
    expression = expression.slice(0, -1);
}

function handleEqual() {
    if (currentInput !== '' && operator !== '' && firstOperand !== '') {
        const result = calculate(parseFloat(firstOperand), parseFloat(currentInput), operator);
        expressionDisplay.textContent = expression + ` ${currentInput}`;
        screen.textContent = result;
        currentInput = result.toString();
        operator = '';
        firstOperand = '';
        shouldResetScreen = true;
        resultDisplayed = true;
    }
}

function handleOperator(value) {
    if (resultDisplayed) {
        firstOperand = currentInput;
        operator = value;
        expression = `${currentInput} ${operator}`;
        screen.textContent = expression;
        currentInput = '';
        resultDisplayed = false;
    } else if (currentInput !== '') {
        if (operator !== '') {
            firstOperand = calculate(parseFloat(firstOperand), parseFloat(currentInput), operator);
        } else {
            firstOperand = currentInput;
        }
        operator = value;
        expression += ` ${currentInput} ${operator}`;
        screen.textContent = expression;
        currentInput = '';
    }
}

function handleNumber(value) {
    if (resultDisplayed) {
        resetForNewInput(value);
    } else if (shouldResetScreen) {
        currentInput = value;
        shouldResetScreen = false;
    } else {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }
    screen.textContent = expression + ` ${currentInput}`;
}

function resetForNewInput(value) {
    currentInput = value;
    expression = '';
    screen.textContent = currentInput;
    expressionDisplay.textContent = '';
    resultDisplayed = false;
}

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        case '%':
            return firstOperand % secondOperand;
        default:
            return secondOperand;
    }
}


