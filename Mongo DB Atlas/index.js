const {MongoClient, ObjectId} = require('mongodb');
const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const uri = 'mongodb+srv://enriquej999:wXZoKVZKtgCzK7Pt@cluster0.bzbmifd.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true});
app.use(express.json());
// async function mongoDbConnect(){ 
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Base data connected!");
//       } catch(error) {
//         // Ensures that the client will close when you finish/error
//         console.log(error);
//         await client.close();
//       }
// }

// mongoDbConnect();

app.get('/contact', async (req, res)=>{

    try {
        await client.connect();
        const db = client.db('lista-tareas');
        const collection = db.collection('tareas');
        const document = await collection.find({}).toArray();
        res.send(document);   
    } catch (error) {
        console.log(error);
    }
});

app.post('/contact', async (req, res)=>{
    const body = req.body
    try {
        await client.connect();
        const db = client.db('lista-tareas');
        const collection = db.collection('tareas');
        const newDocument = await collection.insertOne(body);
        if (newDocument) {
            
        res.send(newDocument);    
        }  else{
            res.status(400).send('Algo salio mal');
        }
    } catch (error) {
        console.log(error);
    }
});

app.delete('/contact/:id', async (req, res)=>{
    const id = req.params.id; 
    try {
        await client.connect();
        const db = client.db('lista-tareas');
        const collection = db.collection('tareas');
        const newDocument = await collection.deleteOne({_id: new ObjectId(id)});
        if (newDocument) {
            
        res.send(newDocument);    
        }  else{
            res.status(400).send('Algo salio mal');
        }
    } catch (error) {
        console.log(error);
    }
});

app.put('/contact', async (req, res)=>{
    const body = req.params.name; 
    try {
        await client.connect();
        const db = client.db('lista-tareas');
        const collection = db.collection('tareas');
        const newDocument = await collection.updateOne({'tarea':'ista de tareas en react'}, {$set:{'state':false}});
        if (newDocument) {
            
        res.send(newDocument);    
        }  else{
            res.status(400).send('Algo salio mal');
        }
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
});