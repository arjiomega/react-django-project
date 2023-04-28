import React, { Component } from "react";
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

import { Link } from "react-router-dom";

// react component called 'CreateRoomPage'
export default class CreateRoomPage extends Component {
    defaultVotes = 2
    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };
        // bind the method to the class
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    }

    // method
    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        });
    }
    // method
    handleGuestCanPauseChange(e) {
        this.setState({
            // if 'true' set to true, else set to false
            guestCanPause: e.target.value === 'true' ? true : false,
        });
    }
    // method
    handleRoomButtonPressed() {
        console.log(this.state);
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }


    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <Typography component="h4" variant="h4">
                            Create a Room
                        </Typography>
                        <FormHelperText>
                            <div align='center'>
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup 
                            row 
                            defaultValue="true" 
                            onChange={this.handleGuestCanPauseChange}
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
                            onChange={this.handleVotesChange}
                            defaultValue={this.defaultVotes}
                            inputProps={{
                                min: 1,
                                style: { textAlign: "center" },
                            }}
                        />
                        <FormHelperText>
                            <div align="center">
                                Votes Required To Skip Song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button 
                        color="primary" 
                        variant="contained" 
                        onClick={this.handleRoomButtonPressed}
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
}