import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import "./LobbyScreen.css";


const LobbyScreen = () => {

  const [email, setEmail] = useState();
  const [room, setRoom] = useState();

  const socket = useSocket();
  const navigate = useNavigate();


  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    }, [email, room, socket]);


  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    navigate(`/room/${room}`);
  }, [navigate]);


  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom)
    } 
  }, [socket, handleJoinRoom]);


  return (
    <div className='lobby-div'>
      <form className='form' onSubmit={handleSubmit}>

        <h1>Form</h1>
        <label htmlFor="email" className='label'>Email</label>
        <input type="email" id='email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label htmlFor="room" className='label'>Room No</label>
        <input type="text" id='room' className='input' value={room} onChange={(e) => setRoom(e.target.value)} />
        <br />
        <button style={{ margin: "1rem" }}>Join</button>

      </form>
    </div>

  )
}

export default LobbyScreen;