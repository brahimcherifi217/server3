const mongoose = require('mongoose')
const schema = mongoose.Schema 

const specialistSchema = new schema ({
    name : { 
        type : String
    }
})

const specialist = mongoose.model('specialist', specialistSchema)
module.exports = specialist