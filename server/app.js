const { Server } = require('socket.io')
const { createServer } = require('http')
const express = require('express');
const authRouter = require('./routes/authRouter')
const { connectDB } = require('./config/db')
const dotenv = require('dotenv');
const errorHandle = require('./utils/errorHandle');
const cookieParser = require('cookie-parser')

dotenv.config()
connectDB()

const app = express();

const server = createServer(app)

const io = new Server(server); 

io.on('connection', socket => {
    console.log('user connected', socket);
} )

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.get('/', (req, res) => {
    let cookie = req.cookies
    res.send({cookie})
    })

app.use(errorHandle)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log('server started'));