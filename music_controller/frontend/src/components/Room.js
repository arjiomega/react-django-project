import React, { Component, useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';


export default function Room(props) {
    const[room,setRoom] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    });

    let { roomCode } = useParams();

    const getRoomDetails = async() => {
        const response = await fetch('/api/get-room' + '?code=' + roomCode)
        const roomDetails = await response.json()

        console.log(roomDetails)

        setRoom(data => ({
            ...data,
            votesToSkip: roomDetails.votes_to_skip,
            guestCanPause: roomDetails.guest_can_pause,
            isHost: roomDetails.is_host,
        }))
    }

    useEffect(() => {
        getRoomDetails();
    }, []);

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {room.votesToSkip}</p>
            <p>Guest Can Pause: {room.guestCanPause.toString()}</p>
            <p>Host: {room.isHost.toString()}</p>
        </div>
    );

}
