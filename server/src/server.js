import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config()

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// enable cors
app.use(cors());
app.use(
    cors({
        origin: '*',
        methods: 'GET,POST,PATCH,DELETE'
    })
);

app.get('/', async (req, res) => {
    try {
        return res.json("done")
    } catch (error) {

    }
})

io.on("connection", (socket) => {
    console.log('client connected');

    socket.on("message", (message) => {
        console.log({ "message": message })
        io.emit("message", message);
    })

    socket.on("disconnect", () => {
        console.log("client disconnected")
    })
})

const port = process.env.PORT
server.listen(port, () => {
    console.log(`server is running on ${port}`)
})
