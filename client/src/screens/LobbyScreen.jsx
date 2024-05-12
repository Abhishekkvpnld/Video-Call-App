import React, { useCallback, useState } from 'react';
import "./LobbyScreen.css";

const LobbyScreen = () => {

  const [email, setEmail] = useState();
  const [room, setRoom] = useState();


  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      console.log({
        email,
        room
      });
    }
  );

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