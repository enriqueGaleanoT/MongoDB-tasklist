const express = require("express");
const app = express();
const db = require("./db");
const HOST = 'http://localhost';
const PORT = 4001;
app.use(express.json());


app.get("/", (req, res)=>{
    //res.send("Mi servidor");
    db.then(async (db)=>{
        console.log("Base de datos conectada");
        const collection = db.collection('restaurant');
        //collection.insertOne({"name": "Alejandro", "rol": "estudiante", "clase": "express js"});
        //collection.updateOne({"name": "Alejandro"}, {$set:{"rol" : "mentor"}});
        //collection.deleteOne({"name": "Alejandro"});
        //query por separado para separar la logica y no hacer lo que 
        //hice en los comentarios de arriba 
        //Querys
        // const query = {"item": "journal"} 
        // // ,  "rol": "estudiante", "clase": "express.js"}
        // const lista = await collection.find({
        //     'status': { $in: ['A', 'D']}
        // }).toArray();
        // const limit = await collection.find({
        //     'status': 'D',
        //     'qty': {$lt : 80 }
        // }).toArray();
        //const lista = await collection.find().toArray();
        //console.log(lista);

        //Agregations
        const aggre = await collection.aggregate([
            {
                $match : {'name': 'Pepperoni'}
            },
            {
                $group : {_id: '$name', totalQuantity: {$sum: '$quantity'}}
            }
        ]).toArray();
        res.send(aggre);
    });
});



app.listen(PORT,()=>{
    console.log(`${HOST}:${PORT}`);
});