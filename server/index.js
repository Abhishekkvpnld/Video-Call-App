import {Server} from "socket.io";
import {createServer} from "http";
import express from "express";
import cors from "cors";



const corsOptions = {
  origin: [
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(cors(corsOptions));


app.get("/",(req,res)=>{
res.send("Server running")
});


io.on("connection",(socket)=>{
console.log('socket connected',socket.id);
});

httpServer.listen(5000,()=>{
console.log("Server connected");
});