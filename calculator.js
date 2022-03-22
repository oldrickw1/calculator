// operators ordered by order of operation
const operators = ['/','*','-','+'];
let remnant;

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
        console.log("Operate function--- a =, b =",a,b);
        return subtract(a,b)
    }
    else if (operator == '*')
    {
        return multiply(a,b)
    }
    else if (operator == '/'){
        return divide(a,b)
    }
    console.log("operate() executed")
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
    console.log("resultString >", displayValue);
    result = displayValue.split(''); // step 1. string to array
    console.log("resultArray >", result);
    result = concat(result); // step 2. concat integers if next to another
    result = minEval(result)// step 3. Evaluate for minus signs, -+ > -, if leading '-' in front of number > ,-number, 
    arrayWithRemnantAndResult = checkRemnant(result)// step 4. Check for trailing operator. Store it for next calculation
    remnant = arrayWithRemnantAndResult[0];
    result = arrayWithRemnantAndResult[1];
    finalResult = evaluate(result); 
    finalResultString = finalResult.toString();
    if (remnant) {
        finalResultString = finalResultString.concat(remnant);
    }
    displayValue = finalResultString;
    console.log('Answer:',finalResultString);
    display.innerHTML = finalResultString;
})


// concatenate number function -----------WORKS!--------------------------------------
function concat(arr){
    let len = arr.length;
    // add extra element (used for iteration)
    len = arr.push('');
    let count = 0; 
    let joinedNumber = []
    let newArr = []
    let bool = false;
    arr.forEach((item, index, arr) => {
        if (Number.isInteger(parseInt(item))){
            count++;
        }
        if (count > 1 && (!Number.isInteger(parseInt(item)))) // if current item is not a number, check if counter went up. If so, join the previous numbers together.
        {
            joinedNumber = arr.slice(index-count, index).join(''); // 
            newArr.push(joinedNumber); // add combined number
            count = 0;
            count = 0;
        }
        if (count == 1 && (!Number.isInteger(parseInt(item))))
        {
            newArr.push(arr[index-1]);
            count = 0; 
        }
        if ((!Number.isInteger(parseInt(item)))){
            newArr.push(item);
        }
    })
    len = newArr.length;
    if (newArr[len-1] == '')
    {
        newArr.pop();
    }
    console.log("concat:", newArr);
    return newArr;
}

function minEval(arr){ // ----------------------works--------------------
    let mincount =0;
    let tempArray = [];
    arr.push('');
    arr.forEach((item, index, arr) => {
        if (item == '-')
        {
            mincount++;
            return;
        }
        else {
            if (mincount > 0)
                {
                    if (mincount % 2 == 0){
                        tempArray.push('+');
                        } else {
                            tempArray.push('-');
                        }
                }
            tempArray.push(item);
            mincount = 0; 
        }
    })
    console.log("tempArray: ", tempArray);
    tempArray.pop();
    arr = tempArray;
    
    let newArr = [];
    let joinedNumber = ''
    let count = 0, fcount = 0;
    arr.forEach((item, index, arr) => {
        if (Number.isInteger(parseInt(item))){
            count++;
            fcount = 0; 
        }
        else {
            fcount++;
        }
        if (fcount > 2)
        {
            console.log("SYNTAX ERROR")
        }
        if (count == 0 && ((item == '-') || (item == '+')))
        {
            console.log(item)
            joinedNumber = (arr.slice(index, index+2)).join('');
            newArr.push(joinedNumber);
            count++
            arr.splice(index,1);
            return;
        }
        if (Number.isInteger(parseInt(item)))
        {
            newArr.push(item);
        }
        if (!Number.isInteger(parseInt(item)))
        {
            newArr.push(item);
            count = 0; 
        }
    });
    console.log("minEval:", newArr);
    return newArr;
}

function checkRemnant(arr){ //------------------------works----------
    let len = arr.length;
    let last = arr[len-1];
    if (!Number.isInteger(parseInt(last)))
    {
        arr.pop();
        return [last, arr];
    }
    else{
        return [undefined, arr];
    }
    
}

function evaluate(arr) {
    let partialAnswer = 0; // trusting on a valid input
    let tempArray = [];
    // check if just a number is entered:
    let len = arr.length;
    if (len == 1)
    {
        return arr[0];
    }
    console.log(arr);

    operators.forEach(symbol => {
        while (arr.includes(symbol)) {
            for(let i = 0; i < arr.length; i++){
                if (arr[i] ==  symbol) {
                    partialAnswer = operate(arr[i],parseFloat(arr[i - 1]), parseFloat(arr[i + 1]));
                    console.log('partialAnswer: ',partialAnswer);
                    tempArray.push(partialAnswer);
                    console.log('tempArray: ',tempArray);
                    arr.splice((i-1),3,partialAnswer);
                    console.log("new arr = -------",arr);
                    break;
                }
            }
        }
    });
    console.log(partialAnswer);
    let answer = Math.round(partialAnswer * 1000) / 1000;
    console.log("FINAL ANSWER: ", answer);
    return partialAnswer;
}


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
