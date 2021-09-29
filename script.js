const diceRoll = function (diceType, diceNum, modifier) { //Calculates results
    let arr = [];

    for(let i = 1; i <= diceNum; i++ ) {                   // Simulates random rolls the desired number of times
        arr.push(Math.floor(Math.random()* diceType) + 1);
    }

    const unmodTotal = arr.reduce((accu, item) => accu + item); // Adds the results of the rolls together
    const modTotal = unmodTotal + modifier;                     // Adds the modifier inputed

    const result = {                                            // Assembles all our steps in an object for the handler functions to make a nice output message.
        arr: arr,
        unmodTotal: unmodTotal,
        modTotal: modTotal
    }

    return result;
}

//=============================================================Makes display of array pretty==============================================================

const beautifier = function (arr) {
    const lastItem = arr.pop();
    const arrString = arr.join(", ");
    return `${arrString}, ${lastItem}`
};

//=============================================================Handles the click event====================================================================

const handleClick = function () {

    document.getElementById('results').innerHTML = "";
    const diceNum = document.getElementById('number').value;         
    const modifier = parseInt(document.getElementById('mod').value);
    const diceType = document.getElementById('type').value;

    //Validation: All inputs are filled

    if (diceNum === "" || modifier === "" || diceType === "" ) {
        alert("All input fields need to be filled");
        document.getElementById('results').style = "display: hidden";
        return;
    }

    //Validation: diceRoll and diceNum do not equal 0

    if (diceNum === "0" || diceType === "0") {
        alert("The first two fields cannot be set to 0");
        document.getElementById('results').style = "display: hidden";
        return;
    }
    
    const regex = /[^0-9]/g;

    //Validation datalist input is a number
    
    if (regex.test(diceType) === true) {
        alert("The 'number of faces on the dice' field requires a number");
        return;
    }
    
    //Validation: The numbers aren't so big they crash the script

    if (diceNum.length >= 6 || modifier.length >= 6 || diceType.length >= 6 ) {
        alert("The input numbers must be between 0-1 and 99 999");
        return;
    }
    
    const result = diceRoll(diceType, diceNum, modifier);       // Calls diceRoll function 
    const rollArray =  beautifier(result.arr);

    // Gives result to the user
    
    document.getElementById('results').innerHTML = `Result = ${result.modTotal}, from ${diceNum} rolls who rolled: ${rollArray} with a modifier of ${modifier}.`;
    document.getElementById('results').style = "display: block";

    // Clears the input fields

    document.getElementById('number').value = "";
    document.getElementById('mod').value = "";
    document.getElementById('type').value = "";
  
}

const button = document.getElementById('button');                   //add event listener to appropriate button
button.addEventListener('click', handleClick);

