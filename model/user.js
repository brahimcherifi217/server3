const mongoose = require('mongoose')
const schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    id_number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pervious_operations: {
        type: String,
        required: true
    },
    current_medications: {
        type: String,
        required: true
    },
    hight: {
        type: String,
        required: true
    },
    wight: {
        type: String,
        required: true
    },
    smoke: {
        type: String,
        required: true
    },
    insurance_ref: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.password
    }
})

userSchema.plugin(uniqueValidator, { message: " Email exist" })
const User = mongoose.model("users", userSchema);
module.exports = User