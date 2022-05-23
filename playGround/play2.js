const helperFunctions = require('./play.js');
const fs = require('fs');
var num1 = 2;
var num2 = 3;

console.log(helperFunctions.add(num1,num2));
console.log(helperFunctions.subtract(num2,num1));

fs.writeFile('./dogs.txt',"meow!",err => {
    if(err) {
        console.error(err); 
        return "Not Found";
    } else {
        console.log('it worked');
    }
});

fs.appendFile('./dogs.txt',"also woof!",err => {
    if(err) {
        console.error(err); 
        return "Not Found";
    } else {
        console.log('it worked');
    }
});