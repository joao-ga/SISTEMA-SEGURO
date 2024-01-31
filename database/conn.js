const mongoose = require("mongoose")
require("dotenv").config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


async function main() {
    try{
        mongoose.set("strictQuery", true)
        await mongoose
        .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@sistseguro.lbarugi.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Conectado ao banco");
    } catch(err) {  
        console.log(err);
    }
}

module.exports = main
