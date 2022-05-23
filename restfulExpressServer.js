const express = require('express');
const req = require('express/lib/request');
const app = express();
const db = require('./queries')
const port = process.env.Port || 5555;

app.listen(port,function(){
    console.log("Listing on 5555");
});

app.use(express.json());
app.get('/pets', db.getPets)
app.get('/pets/:id', db.getPetById);
app.post('/pets', db.createPet);
app.patch('/pets/:id', db.updatePets);
app.delete('/pets/:id', db.deletePet);
app.use((req,res) => {
    res.status(404).send("Not Found");
});