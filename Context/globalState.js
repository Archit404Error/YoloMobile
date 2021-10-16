import React from 'react';
import Context from './context';

export default class extends React.Component {
    state = {
        id: -1,
        username: '',
        password: '',
        name: '',
        eventIds: '',
        location: {
            latitude: 0,
            longitude: 0,
        },
    }

    setCreds = (userData) => {
        this.state.id = userData[0];
        this.state.username = userData[1];
        this.state.password = userData[2];
        this.state.name = userData[3];
        this.state.eventIds = userData[6];
        this.setState(this.state);
    }

    setLoc = (lat, long) => {
        this.state.location.latitude = lat;
        this.state.location.longitude = long;
        this.setState(this.state);
    }

    render() {
        return (
            <Context.Provider
                value = {{
                    id: this.state.id,
                    username: this.state.username,
                    password: this.state.password,
                    fullName: this.state.name,
                    events: this.state.eventIds,
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                    setCredentials: this.setCreds,
                    setLocation: this.setLoc
                }}
            >
                { this.props.children }
            </Context.Provider>
        )
    }
}