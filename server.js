const express = require('express')
const mongoose = require('mongoose')
const auth = require('./middlewares/auth')
const errors = require('./middlewares/error')
const { unless } = require('express-unless')
const dbConfig = require('./config/db.config')
const app = express()
const rout = require('./routes/users.route')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log('Database has setup ')
    }, (error) => {
        console.log('Database has an error with :' + error)
    }
)

const adminBro = require("admin-bro")
const adminExpress = require('@admin-bro/express')
const adminMongoose = require('@admin-bro/mongoose')

const user = require('./model/user')
const doctor = require('./model/doctors')
const specialist = require('./model/specialist')

adminBro.registerAdapter(adminMongoose)
const adminOptions = {
    resources: [
        user,
        doctor,
        specialist
    ],
   rootPath: '/admin'
}

adminBro.registerAdapter(adminMongoose)
const doctorOptions = {
    resources: [
        doctor,
    ],
   rootPath: '/doctor'
}



const doctorPanel = new adminBro(doctorOptions)
const admin = new adminBro(adminOptions)
const adminRoute = adminExpress.buildRouter(admin)
const doctorRoute = adminExpress.buildRouter(doctorPanel)
app.use(doctorPanel.options.rootPath, doctorRoute)
app.use(admin.options.rootPath, adminRoute)

app.use(bodyParser.json())
auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/users/login", methods: ["POST"] },
            { url: "/users/register", methods: ["POST"] }
        ]
    })
)

app.use(rout)
app.use(errors.errorHandler)

app.listen(3000, console.log("Server is listen to port 3000"))