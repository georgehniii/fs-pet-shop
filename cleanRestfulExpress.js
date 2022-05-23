const express = require('express');
const req = require('express/lib/request');
const fs = require('fs');
const app = express();
//server connectivity===========================================================
//instructions from node-postgres.com
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})
//==============================================================================

app.use(express.json());
const port = process.env.Port || 5555;
app.listen(port,function(){
    console.log("Listing on 5555");
});

app.get("/pets", (req, res) =>{
    const pets = fs.readFileSync("pets.json");
    res.send(pets);
});

app.get("/pets/:id", (req, res) => {
    const pets = fs.readFileSync("pets.json");
    let id = req.params.id;
    const thisPet = JSON.parse(pets)[id];
    if(!thisPet){
        res.send("Not Found");
        res.status = 404;
        return;
    }
    res.send(thisPet);
});

app.post("/pets", (req, res) => {
    newObj = req.body;
    console.log("posting");

    if (!newObj.age || !newObj.kind || !newObj.name) {
        res.status = 404;
        res.setHeader("Content-Type", "text/plain");
        res.send("Not Found");
    }
    else {
        var petsJson = fs.readFileSync("pets.json");
        const pets = JSON.parse(petsJson);
        pets.push(newObj);
        console.log(pets);
        var petsString = JSON.stringify(pets);
        fs.writeFile("pets.json", petsString, err => {
            if (err) {
                console.error(err.stack);
            }
        });
        res.send('Added new pet!');


    }
});

app.patch("/pets/:id", (req, res) => {
    newObj = req.body;
    let id = req.params.id;
    var petsJson = fs.readFileSync("pets.json");
    const pets = JSON.parse(petsJson);
    if (!pets[id]){
        res.send("Not Found")
        res.status = 404;
        return;
    }
    if(newObj.age){
        pets[id].age = newObj.age;
    }
    if(newObj.kind){
        pets[id].kind = newObj.kind;
    }
    if(newObj.name){
        pets[id].name = newObj.name;
    }
    var petsString = JSON.stringify(pets);
    fs.writeFile("pets.json", petsString, err => {
        if (err) {
            console.error(err.stack);
        }
    });
    res.send("Updated!");
    res.status = 200;
});

app.delete("/pets/:id", (req, res) => {
let id = req.params.id;
var petsJson = fs.readFileSync("pets.json");
const pets = JSON.parse(petsJson);
if (id >= pets.length || id < 0) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.send("Not Found");
  }
  else {
    pets.splice(id, 1);
    var petsString = JSON.stringify(pets);
    
    fs.writeFile("pets.json", petsString, err => {
        if (err) {
            console.error(err.stack);
        }
    });
    res.send("Deleted!");
    res.status = 200;
  }
});

app.use((req,res) => {
    res.status(404).send("Not Found");
});