const mongoose = require("mongoose")
const {Schema} = mongoose

const { insuranceSchema } = require("./Insurance")

const clientSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    plate: {
        type: String,
        required: true,
    },
    insurances: {
        type: [insuranceSchema]
    },
   },
   {timestamps: true}
);

const Client = mongoose.model("Client", clientSchema)

module.exports = Client;

