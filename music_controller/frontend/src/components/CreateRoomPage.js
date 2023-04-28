import React, { Component, useState } from "react";
import { 
        Button, 
        Grid,
        Typography,
        TextField,
        FormHelperText,
        FormControl,
        Radio,
        RadioGroup,
        FormControlLabel
    } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

export const CreateRoomPage = () => {
    let defaultVotes = 2
    const [backData,setBackData] = useState({
        guestCanPause: true,
        votesToSkip: defaultVotes
    })

    let navigate = useNavigate();

    const handleVotesChange = (e) => {
        setBackData(data => ({
            ...data,
            votesToSkip: e.target.value
        }))
    }

    const handleGuestCanPauseChange = (e) => {
        setBackData(data => ({
            ...data,
            guestCanPause: e.target.value == 'true' ? true : false
        }))
    }

    const handleRoomButtonPressed = async() => {
        const feedBack = await fetch('/api/create-room', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                votes_to_skip: backData.votesToSkip,
                guest_can_pause: backData.guestCanPause
            })
        });

        const JsonFeedBack = await feedBack.json();
        navigate("/room/" + JsonFeedBack.code);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <Typography component="h4" variant="h4">
                        Create a Room
                    </Typography>
                    <FormHelperText>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup 
                        row 
                        defaultValue="true" 
                        onChange={handleGuestCanPauseChange}
                    >
                        <FormControlLabel 
                            value="true" 
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel 
                            value="false" 
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField 
                        required={true} 
                        type="number" 
                        onChange={handleVotesChange}
                        defaultValue={defaultVotes}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                    />
                    <FormHelperText>
                        Votes Required To Skip Song
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={handleRoomButtonPressed}
                >
                    Create a Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
    
}