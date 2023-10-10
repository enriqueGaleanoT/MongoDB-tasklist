const {MongoClient} = require('mongodb');

require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'store';

const conect = async ()=>{
    try{
        await client.connect();
    } catch (error){
        console.log(error);
    }
    return client.db(dbName);
};

const db = conect();

module.exports = db;
