const cors = require('cors')
const dotenv = require("dotenv");
const express = require("express");
const { sycnDB, Project, ProjectMember } = require("./models");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const taskRouter = require('./routes/taskRouter');
const errorHandle = require("./utils/errorHandle");
const projectRouter = require("./routes/projectRouter");

dotenv.config();
connectDB();
// sycnDB()

const app = express();

// const server = createServer(app);

// const io = new Server(server);

// io.on("connection", (socket) => {
//   console.log("user connected", socket);
// });

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/task", taskRouter)
app.get("/api/v1", (req, res) => {
  console.log('got rea');
  res.json({m : 'fie'})
  console.log('sent');
})
app.post("/api/v1", (req, res) => {
  console.log('got rea');
  res.json({m : 'fie'})
  console.log('sent');
})


app.use(errorHandle);

const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log("server started on PORT:", PORT));
app.listen(PORT, () => console.log("server started on PORT:", PORT));
