import mongoose from "mongoose";

let _connected = false;
let db = undefined;

const Schemas = {
    CatSchema : mongoose.Schema({

        name: String,
        color: String,
        Size: String,
        age: Number
    }),
    EMR: mongoose.Schema({
        name: String,
        address: String,
        birthdate: String,
        provider: String,
        medications: [String]
    })
};

const connect = () => {
    if(_connected) return;
    _connected=true;

    mongoose.connect('mongodb://DbAdmin:adminPassword@cluster0-shard-00-00-vstof.mongodb.net:27017,cluster0-shard-00-01-vstof.mongodb.net:27017,cluster0-shard-00-02-vstof.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
    db = mongoose.connection;

    db.once('open', function() {
        console.log('db connected');
    });
};



const Cat = mongoose.model('Cat', Schemas.CatSchema);
const EMR = mongoose.model('EMR', Schemas.EMR);

export default {
    models: {
        Cat,
        EMR
    },
    connect
};

