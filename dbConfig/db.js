const {MongoClient} = require('mongodb');

const uri=process.env.MONGO_URI;

const client = new MongoClient(uri);

let db;

const connectDB = async()=>{
    // db connect
    try{
    await client.connect();
    db=client.db();
    console.log('Mongodb Connected....');
        }
    catch(err){
        console.log(err);
        process.exit(1);
    }


}

const getDB=()=>db;

module.exports={connectDB, getDB};
