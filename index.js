const express = require('express')
const path = require('path')
require('dotenv').config()

//DB connection
const { dbConnection } = require('./database/config')
 
 
dbConnection()

const app = express()

//configure http request parser
app.use(express.json())

//Node server...
const server = require('http').createServer(app)
module.exports.io = require('socket.io')(server)
require('./socket/sockets')

const publicPath = path.resolve(__dirname, 'public')
app.use(express.static(publicPath))

//Routes...
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/user'))
app.use('/api/messages', require('./routes/messajes'))

const port = process.env.PORT
server.listen(port, () => console.log(`Example app listening on port ${port}!`))
