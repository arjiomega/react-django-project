import React, { Component } from 'react';
import { RoomJoinPage } from './RoomJoinPage';
import { CreateRoomPage } from './CreateRoomPage';
import Room from './Room';

import {
     BrowserRouter as Router, 
     Routes, 
     Route, 
     Link, 
     Redirect, 
    } from "react-router-dom";

export default function HomePage() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<p>This is the home page</p>}/>
                <Route path='/join' element={<RoomJoinPage />} />
                <Route path='/create' element={<CreateRoomPage />} />
                <Route path='/room/:roomCode' element={<Room />} />
            </Routes> 
        </Router>
    );
}