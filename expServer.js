const express = require('express');
const req = require('express/lib/request');
const fs = require('fs');
const app = express();
const port = process.env.Port || 5555;

//request handlers===================================================================================
app.listen(port, function(){
    console.log('server is running');
});

app.get('/', (req,res) =>{
    res.send("Its ALIVE!!!!!!!");
});

app.get('/pets', (req,res) =>{
    res.send(petRead());
});

app.get('/pets/:id', (req,res) =>{
    var retData = singlePetRead(req.params.id)
    if(retData === 'Not Found'){
        res.status(404);
    }
    res.send(retData);
});

app.post('/pets/create/:age/:kind/:name', (req,res) =>{
    var retData = createPet(req.params.age,req.params.kind,req.params.name);
    if(retData === 'Not Found'){
        res.status(404);
    }
    res.send(retData);
});

app.patch('/pets/update/:id/:age/:kind/:name', (req,res) =>{
    var retData = updatePet(req.params.id,req.params.age,req.params.kind,req.params.name);
    if(retData === 'Not Found'){
        res.status(404);
    }
    console.log("update return: "+retData);
    res.send(retData);
});

app.delete('/pets/destroy/:id', (req,res) =>{
    var retData = destroy(req.params.id)
    if(retData === 'Not Found'){
        res.status(404);
    }
    res.send(retData);
});

app.use((req,res) => {
    res.status(404).send("Not Found");
});

//createPet===================================================================================
function createPet(age,kind,petName){
    console.log('creation');
    var newPet = {
        'age': parseInt(age),
        'kind': kind,
        'name': petName
    };
    console.log(newPet);
    var newArr = petRead();
    newArr.push(newPet);//needs read statment from pets.js then push to that array.
    console.log(newArr);
    var newPetstringified = JSON.stringify(newArr);
    console.log(newPetstringified);      
    fs.writeFile('pets.json', newPetstringified, err => {
        if(err) {
            console.error(err);
        } else {
            console.log('it worked');            
        }
    });
    return "Created pet";
}

//read pets==================================================================================
function petRead(){
    console.log("reading pets");
    var data = fs.readFileSync('pets.json');
    var petInfo = JSON.parse(data);
    console.log(petInfo);
    return petInfo;
  }
  //single pet-------------------------------------------------------------------------------
  function singlePetRead(index){
    console.log("reading one pet");
    var data = fs.readFileSync('pets.json');
    var petInfo = JSON.parse(data);
    if(!petInfo[index]){
      return "Not Found";
    }
    
    return petInfo[index];
  }
  
  //update pet==============================================================================
  function updatePet(index,age,kind,petName){
    var newArr = petRead();
    if(!newArr[index]){
        return "Not Found";
    }else{
    console.log("updating");
    var updates = {
        'age': parseInt(age),
        'kind': kind,
        'name': petName
    };
    console.log(updates);
    
    newArr[index] = updates;//needs read statment from pets.js then push to that array.
    console.log(newArr);
    var newPetstringified = JSON.stringify(newArr);
    console.log(newPetstringified);      
    fs.writeFile('pets.json', newPetstringified, err => {
        if(err) {
            console.error(err); 
            return "Not Found";
        } else {
            console.log('it worked');
        }
    });
    }
    return "Updated.";
}
  
//destroy pet==============================================================================
function destroy(index) {    
var newArr = petRead();
if(!newArr[index]){
    return "Not Found";
}
console.log("pet terminated");
newArr.splice(index, 1);
fs.writeFile("pets.json", JSON.stringify(newArr), (err) => {
    if (process.argv[3] === undefined) {
        console.error("Usage: node pets.js destroy INDEX");
    }
});
return "Pet has been terminated";
}