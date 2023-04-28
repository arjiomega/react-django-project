import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function Room(props) {
    const[room,setRoom] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    });

    let { roomCode } = useParams();

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {room.votesToSkip}</p>
            <p>Guest Can Pause: {room.guestCanPause}</p>
            <p>Host: {room.isHost}</p>
        ;</div>
    )

}
