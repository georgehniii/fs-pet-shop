#!/user/bin/node
const arr = process.argv[2];
const arr1 = process.argv;
let fs = require('fs');
var index = -1;

if(arr1[3] !== undefined) {
     index = arr1[3];
}
if(!arr){
    console.error("Usage: node pets.js [read | create | update | destroy]");
} else if(arr === "read" && index === -1) {
    petRead();
} else if(arr === "read" && index !== -1){
    singlePetRead(index);
} else if(arr === 'create'){
    var age = index;
    var kind = arr1[4];
    var petName = arr1[5];
    createPet(age,kind,petName);
} else if(arr === 'update'){
    var age = arr1[4];
    var kind = arr1[5];
    var petName = arr1[6];     
    updatePet(index,age,kind,petName);
}else if(arr === 'destroy'){
    destroy(index);
}else{
    console.error("Usage: node pets.js [read | create | update | destroy]");
}


//createPet===========================================================================
function createPet(age,kind,petName){
     if(!age && age !== -1 || !kind || !petName) {
        console.error("Usage: node pets.js create AGE KIND NAME");
   } else {
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
      })
  }
}
//read pets=======================================================================
function petRead(){
    var data = fs.readFileSync('pets.json');
    var petInfo = JSON.parse(data);
    console.log(petInfo);
    return petInfo;
}
//single pet--------------------------------------------------------------------------
function singlePetRead(index){
    var data = fs.readFileSync('pets.json');
     var petInfo = JSON.parse(data);
     if(!petInfo[index]){
          console.error('out of bounds\n Usage: node pets.js read INDEX ');
     }
     console.log(petInfo[index]);
}

//update pet==============================================================================
function updatePet(index,age,kind,petName){
    
    if(!index && index !== -1 || !kind || !petName){
        console.error("Usage: node pets.js update INDEX AGE KIND NAME");
    }else{
        console.log("updating");
        var updates = {
            'age': parseInt(age),
            'kind': kind,
            'name': petName
        };
        console.log(updates);
        var newArr = petRead();
        newArr[index] = updates;//needs read statment from pets.js then push to that array.
        console.log(newArr);
        var newPetstringified = JSON.stringify(newArr);
        console.log(newPetstringified);      
        fs.writeFile('pets.json', newPetstringified, err => {
            if(err) {
                console.error(err);
            } else {
                console.log('it worked');
            }
        })
    }  
}

//destroy pet===============================================
function destroy(index) {
    console.log("pet terminated");
    var newArr = petRead()
    newArr.splice(index, 1);
    fs.writeFile("pets.json", JSON.stringify(newArr), (err) => {
        if (process.argv[3] === undefined) {
            console.error("Usage: node pets.js destroy INDEX");
        }
    })
}