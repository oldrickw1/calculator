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
const digitButtons = document.querySelectorAll("button.n");
const display = document.querySelector('.display')
let displayValue = '';

digitButtons.forEach( btn => {
    btn.addEventListener("click", (event) => displayText(event))
});

function displayText(event) {
    displayValue += event.target.innerHTML;
    display.innerHTML = displayValue;   
};

// 5. make the calculator work, and display answer when '=' is pressed. 
let result; 
const resultButton = document.querySelector('button.result');

resultButton.addEventListener('click', () => {
    result = displayValue.split(''); // step 1. string to array
    len = result.length;
    calculatedResult = 0; 
    // step 2. concat integers if next to another
    console.log(result);
    result = concat(result);
    //console.log(result)





    displayValue = '' // reset display value
    display.innerHTML = calculatedResult;
})

// clear display
const clearButton = document.querySelector('button.clear');

clearButton.addEventListener('click', () => {
    displayValue = '';
    display.innerHTML = '';
})

// delete one entry
const delButton = document.querySelector('button.del');

delButton.addEventListener('click', () => {
    const temp = displayValue.split('');
    temp.pop();
    displayValue = temp.join('');
    display.innerHTML = displayValue;
})

// concatenate number function
function concat(arr){
    let len = arr.length;
    // add extra element (used for iteration)
    len = arr.push('');
    let count = 0; 
    let joinedNumber = []
    console.log(arr)
    let newArr = []
    let bool = false;
    arr.forEach((i, index, arr) => {
        if (Number.isInteger((parseInt(i)))) // if the item is a number, the counter goes up for each consecutive int
        {
            count++;
        }
        else if (count != 0) // if current item is not a number, check if counter went up. If so, join the previous numbers together.
        {
            joinedNumber = arr.slice(index-count, index).join(''); // 
            console.log(joinedNumber);
            newArr.push(joinedNumber); // add combined number
            newArr.push(i); // add operator
            count = 0;
            console.log(newArr);
        }
    })
    newArr.pop();
    console.log(newArr);
}

