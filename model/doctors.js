const { Double } = require('mongodb')
const mongoose = require('mongoose')
const schema = mongoose.Schema

const doctorsSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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
    image: {
        type: String,
        required: true
    },
    specialist: {
        type: String,
        enum: ['Heart Specialist', 'Brain Specialist', 'Eye Specialist',],
        required: true
    },
    rate : {
        type: String,

    }
})

const doctor = mongoose.model("Doctors", doctorsSchema)
module.exports = doctor