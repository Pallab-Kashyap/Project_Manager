const { Server } = require('socket.io')
const { createServer } = require('http')
const express = require('express');
const authRouter = require('./routes/authRouter')
const { connectDB } = require('./config/db')
const dotenv = require('dotenv')

dotenv.config()
connectDB()

const app = express();

const server = createServer(app)

const io = new Server(server); 

io.on('connection', socket => {
    console.log('user connected', socket);
} )

app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log('server started'));