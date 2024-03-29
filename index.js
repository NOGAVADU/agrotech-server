require('dotenv').config()
const express = require('express')
const path = require ('path')
const https = require('https')
const fs = require('fs')
const morgan = require('morgan')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(morgan("dev"));
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const options = {
    key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

const server = https.createServer(options, app);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
    } catch (e) {
        console.log(e)
    }
}


start()