import React from 'react';
import * as Notifications from 'expo-notifications';
import socketio from "socket.io-client";
import Context from './context';
import Constants from 'expo-constants';

export default class extends React.Component {
    state = {
        id: -1,
        username: '',
        password: '',
        name: '',
        eventIds: [],
        location: {
            latitude: 0,
            longitude: 0,
        },
        eventCreationDetails: {
            title: '',
            description: '',
            image: '',
            location: '',
            startDate: null,
            endDate: null,
            tags: '',
            other: '',
        },
        chatIds: [],
        friendIds: [],
        notifications: [],
        profile: "",
        socket: {},
    }

    setCreds = (data) => {
        this.state.id = data._id;
        this.state.username = data.username;
        this.state.password = data.password;
        this.state.name = data.name;
        this.state.eventIds = data.pendingEvents;
        this.state.friendIds = data.friends;
        this.state.notifications = data.notifications;
        this.state.chatIds = data.chats;
        this.state.profile = data.profilePic;
        let socket = socketio('http://yolo-backend.herokuapp.com/', {
            query: `chatList=${data.chats}&user=${data._id}`
        }); 

        this.state.socket = socket;
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

    setEventText = (title, description, location, startDate, endDate, tags, other) => {
        this.state.eventCreationDetails.title = title;
        this.state.eventCreationDetails.description = description;
        this.state.eventCreationDetails.location = location;
        this.state.eventCreationDetails.startDate = startDate;
        this.state.eventCreationDetails.endDate = endDate;
        this.state.eventCreationDetails.tags = tags;
        this.state.eventCreationDetails.other = other;
        this.setState(this.state);
    }

    registerPushNotifs = async () => {
        if (!Constants.isDevice) {
            console.log("Must be physics device");
        }
        try {
            const statusResult = await Notifications.getPermissionsAsync();
            const askResult = statusResult.status !== 'granted'
                ? await Notifications.requestPermissionsAsync()
                : statusResult;
            const tokenData = (await Notifications.getExpoPushTokenAsync()).data;
            fetch("http://yolo-backend.herokuapp.com/registerPushToken", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    user: this.state.id,
                    token: tokenData
                })
            })
        } catch (error) {
            return Promise.reject("Couldn't check notifications permissions");
        }
    }
    
    /**
     * General purpose function to modify portions of state without exposing state
     * @param {String[]} keyList an array of key values
     * @param {Object} dataList an array of data values
     */
    modifyState = (keyList, dataList) => {
        for (let i = 0; i < keyList.length; i++)
            this.state[keyList[i]] = dataList[i];

        this.setState(this.state);
    }

    friendRequest = (friendId, friended) => {
        fetch("http://yolo-backend.herokuapp.com/friendReq", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                sender: this.state.id,
                name: this.state.name,
                receiver: friendId,
                wantToFriend: friended
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
                    chats: this.state.chatIds,
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                    eventDetails: this.state.eventCreationDetails,
                    friends: this.state.friendIds,
                    notifications: this.state.notifications,
                    profilePic: this.state.profile,
                    socket: this.state.socket,
                    setCredentials: this.setCreds,
                    setLocation: this.setLoc,
                    createEventText: this.setEventText,
                    createEventImage: this.setEventImage,
                    sendFriendReq: this.friendRequest,
                    registerTokenAsync: this.registerPushNotifs,
                    modifyState: this.modifyState,
                }}
            >
                { this.props.children }
            </Context.Provider>
        )
    }
}