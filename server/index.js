import { Server } from "socket.io";
import {createServer} from "http";
import express from "express";
import cors from "cors";



const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://video-call-app-chi.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: true });

app.use(express.json());
app.use(cors(corsOptions));


app.get("/",(req,res)=>{
res.send("Server running")
});


const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

io.on("connection", (socket) => {
    console.log('socket connected', socket.id);


    socket.on("room:join", (data) => {
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketIdToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    });


    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incoming:call", { from: socket.id, offer });
    });


    socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
        io.to(to).emit("peer:neg:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });

});

httpServer.listen(5000,()=>{
console.log("Server connected");
});