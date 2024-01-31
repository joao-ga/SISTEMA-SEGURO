const mongoose = require("mongoose")

const {Schema} = mongoose

const insuranceSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    comapany: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

const Insurance = mongoose.model("Insurance", insuranceSchema);

module.exports = {
    Insurance,
    insuranceSchema,
};