// 1. Add functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b; 
const multiply = (a, b) => a * b; 
const divide = (a, b) => a / b; 
// console.log(add(1,2), subtract(1,2), multiply(1,2), divide(1,2));
// works

// 2. create function 'operate'. Takes an operator and 2 numbers, calls function above.
const operate = (operator, a, b) => {
    if (operator == '+'){
        return add(a,b)
    }
    else if (operator == '-'){
        return subtract(a,b)
    }
    else if (operator == '*')
    {
        return multiply(a,b)
    }
    else if (operate == '/'){
        return divide(a,b)
    }
};
// console.log(operate('*', 5,2));
// works

// 3. create html buttons for digits and functions
// done

// 4. create functions that populate the display when numbers are clicked. use variable called 'display value';
const digitButtons = document.querySelectorAll("button");
const display = document.querySelector('.display')
let displayValue = '';

digitButtons.forEach(btn => {
    btn.addEventListener("click", (event) => displayText(event))
});

function displayText(event) {
    console.log("click!")
    displayValue += event.target.innerHTML;
    display.innerHTML = displayValue;   
};

// 5. make the calculator work, and display answer when '=' is pressed. 
