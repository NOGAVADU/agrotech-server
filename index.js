require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')

const https = require("https");  // для организации https
const fs = require("fs");

const PORT = process.env.PORT || 5000

httpsOptions = {
    key: fs.readFileSync("../../../etc/letsencrypt/live/agrotech-service.ru/pivkey.pem"), // путь к ключу
    cert: fs.readFileSync("../../../etc/letsencrypt/live/agrotech-service.ru/cert.pem") // путь к сертификату
}

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        https.createServer({
            key: fs.readFileSync("../../../etc/letsencrypt/live/agrotech-service.ru/pivkey.pem"),
            cert: fs.readFileSync("../../../etc/letsencrypt/live/agrotech-service.ru/cert.pem"),
        },).listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}


start()