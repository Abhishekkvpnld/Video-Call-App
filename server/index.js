import { Server } from "socket.io";
// import {createServer} from "http";
// import express from "express";
// import cors from "cors";



// const corsOptions = {
//   origin: [
//     "http://localhost:3000"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// };

// const app = express();
// const httpServer = createServer(app);
const io = new Server(5000, { cors: true });

// app.use(express.json());
// app.use(cors(corsOptions));


// app.get("/",(req,res)=>{
// res.send("Server running")
// });


const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

io.on("connection", (socket) => {
    console.log('socket connected', socket.id);

    socket.on("room:join", (data) => {
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketIdToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined",{email,id:socket.id});
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    })

}); 

// httpServer.listen(5000,()=>{ 
// console.log("Server connected");
// });