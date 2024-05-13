import React, { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import Peer from '../service/peer';
import ReactPlayer from "react-player";
import peer from '../service/peer';


const RoomPage = () => {

  const socket = useSocket();

  const [remoteSocketId, setRemoteSocketId] = useState();
  const [myStream, setMyStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`${email} joined the room`);
    setRemoteSocketId(id);
  }, []);


  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    const offer = await Peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);


  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    setMyStream(stream);
    console.log(from, offer);
    const ans = await peer.getAnswer(offer);
    socket.emit("call:accepted", { to: from, ans });
  }, [socket]);


  const handleCallAccepted = useCallback( ({ from, ans }) => {
    peer.setLocalDescription(ans);
    console.log("Call Accepted");
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
    };

  }, [socket, handleUserJoined]);



  return (
    <div>
      <h1>RoomPage</h1>
      <h4>{remoteSocketId ? "connected" : "No one in this room"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer height={"200px"} width={"250px"} playing muted url={myStream} />
        </>
      )}
    </div>
  )
}

export default RoomPage;