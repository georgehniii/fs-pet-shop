// function subtract(a,b){
//     return a - b;
// }

// function add(a,b){
//     return a + b;
// }

// module.exports = { subtract, add }

const express = require('express');
const req = require('express/lib/request');
const fs = require('fs');
const app = express();
const port = process.env.Port || 4000;

app.listen(port, function(){
    console.log('Listining on port 4000');
});

app.get('/donuts', (req,res) =>{
    res.send("yum");
});

app.post('/donuts', (req,res) =>{
    res.send("yum");
});

app.get('/animals', (req, res) => {
    // YOUR CODE HERE
    res.send(getAnimals());
});

function getAnimals(){
        var data = fs.readFileSync('animals.txt');
        console.log(data);
        var animalInfo = JSON.parse(data);
        console.log(animalInfo);
        return animalInfo;
    }