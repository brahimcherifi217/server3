const User = require("../model/user")
const bcrybt = require("bcrypt")
const auth = require("../middlewares/auth")

async function login({ email, password }, callback) {
    const user = await User.findOne({ email })

    if (user != null) {
        if (bcrybt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(email)
            return callback(null, { ...user.toJSON(), token })
        }
        else {
            return callback({
                message: "Invalid Password or email  "
            })
        }
    }
    else {
        return callback({
            message: "Invalid Password or email   "
        })
    }
}

async function register(params, callback){
    if (params.email == undefined) {
        return callback('Email required')
    }
    const user = new User(params);
    user.save().then ((response) => {
        return callback(null, response)
    })
    .catch((error) => {
        return callback(error)
    })

}
module.exports = {
    login,
    register
}