var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.env.PORT || 5555;

var server = http.createServer(function(req, res) {
    // var pets = fs.readFileSync('pets.json');
    // console.log(pets);
    var data;
    var urlParts = url.parse(req.url,true);
    var path = urlParts.path;
    var pathArr = path.split("/");

    console.log(pathArr);
  //var petsJSON = JSON.stringify("");
  if(pathArr[1] === "pets"){
    var index = parseInt(pathArr[3]);
    var option = pathArr[2];
    //console.log(index);
    if(isNaN(index)){
     data = petRead();
    }else{
      data = singlePetRead(index);
    }
  }
  var returnData = JSON.stringify(data);
  //console.log(data);
  res.setHeader('Content-Type', 'application/json');
  if(data === "Not Found"){
    res.statusCode = 404;
  }else{
    res.statusCode = 200;
  } 
  res.end(returnData);
});

server.listen(port, function() {
  console.log('Listening on port', port);
});

//read pets=======================================================================
function petRead(){
  console.log("reading pets");
  var data = fs.readFileSync('pets.json');
  var petInfo = JSON.parse(data);
  console.log(petInfo);
  return petInfo;
}
//single pet--------------------------------------------------------------------------
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