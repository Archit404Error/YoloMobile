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
        friendIds: [],
        profile: "",
    }

    setCreds = (data) => {
        this.state.id = data._id;
        this.state.username = data.username;
        this.state.password = data.password;
        this.state.name = data.name;
        this.state.eventIds = data.pendingEvents;
        this.state.friendIds = data.friends;
        this.state.profile = data.profilePic;
        this.setState(this.state);
    }

    setLoc = (lat, long) => {
        this.state.location.latitude = lat;
        this.state.location.longitude = long;
        this.setState(this.state);
    }

    setEventImage = (imageUrl) => {
        this.state.eventCreationDetails.image = imageUrl;
        this.setState(this.state);
    }

    setEventText = (title, description, location, tags, other) => {
        this.state.eventCreationDetails.title = title;
        this.state.eventCreationDetails.description = description;
        this.state.eventCreationDetails.location = location;
        this.state.eventCreationDetails.tags = tags;
        this.state.eventCreationDetails.other = other;
        this.setState(this.state);
    }

    friendRequest = (friendId) => {
        fetch("http://yolo-backend.herokuapp.com/friendReq", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                sender: this.state.id,
                receiver: friendId
            })
        })
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
                    friends: this.state.friendIds,
                    profilePic: this.state.profile,
                    setCredentials: this.setCreds,
                    setLocation: this.setLoc,
                    createEventText: this.setEventText,
                    createEventImage: this.setEventImage,
                    sendFriendReq: this.friendRequest
                }}
            >
                { this.props.children }
            </Context.Provider>
        )
    }
}