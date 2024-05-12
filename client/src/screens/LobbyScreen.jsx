import React, { useCallback, useState, useEffect } from 'react';
import { useSocket } from "../context/SocketProvider";
import "./LobbyScreen.css";
import { Socket } from 'socket.io-client';

const LobbyScreen = () => {

  const [email, setEmail] = useState();
  const [room, setRoom] = useState();

  const socket = useSocket();

  console.log(socket);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    }, [email, room]);


  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    console.log(email, room);
  }, []);


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