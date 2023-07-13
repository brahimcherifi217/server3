const bcryptjs = require('bcrypt')
const userServer = require('../services/users.services')

exports.register = (req, res, next) => {
    const {password} = req.body;
    const salt = bcryptjs.genSaltSync(10)

    req.body.password = bcryptjs.hashSync(password, salt)
    userServer.register(
        req.body, (error, result) => {
            if(error) { 
                return next(error)
            }
            return res.status(200).send({
                message : "Success",
                data: result
            })
        }
    )
}

exports.login = (req, res, next) => {
    const {email, password} = req.body
    userServer.login({email, password}, (error, result) => {
        if(error) { 
            return next(error)
        }
        return res.status(200).send({
            message : "Success",
            data: result
        })
    })
}

exports.userProfile = (req, res, next ) => { 
    return res.status(200).json({message: 'Authorized User', data: result})
}

const Doctors = require('../model/doctors')


exports.getDoctors = async (req,res,next) => {
    try {
        const doctors = await Doctors.find({})
        res.send(doctors)
    } catch (error) {
        res.send(error)
    }
}

exports.addDoctor = async (req, res, next) => { 
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            id_number: req.body.id_number,
            address: req.body.address,
            image: req.body.image,
            specialist: req.body.specialist,
        }
       const newDoctor = new Doctors(data)
       newDoctor.save().then(item => res.send(item)) 
    } catch (error) {
        res.send(error)
    }
}