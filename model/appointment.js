const mongoose = require("mongoose")
const schema = mongoose.Schema

const appointmentSchema = new schema({
    day: String,
    morning: Array,
    evening: Array
})

const AvelibaleDate = mongoose.model("Appointment", appointmentSchema)
module.exports = AvelibaleDate
