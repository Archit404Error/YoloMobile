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
        eventCreationDetails: {
            title: '',
            description: '',
            image: '',
            location: '',
            tags: '',
            other: '',
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

    setEvent = (title, description, image, location, tags, other) => {
        this.state.eventCreationDetails.title = title;
        this.state.eventCreationDetails.description = description;
        this.state.eventCreationDetails.image = image;
        this.state.eventCreationDetails.location = location;
        this.state.eventCreationDetails.tags = tags;
        this.state.eventCreationDetails.other = other;
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
                    eventDetails: this.state.eventCreationDetails,
                    setCredentials: this.setCreds,
                    setLocation: this.setLoc,
                    setEventCreation: this.setEvent
                }}
            >
                { this.props.children }
            </Context.Provider>
        )
    }
}