import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import socketio from "socket.io-client";
import Context from './context';
import Device from 'expo-device';
import { Linking } from 'react-native'
import { showMessage } from 'react-native-flash-message';

export default class extends React.Component {
    state = {
        id: -1,
        username: '',
        password: '',
        name: '',
        acceptedEvents: [],
        pendingEvents: [],
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
            public: true,
        },
        chatIds: [],
        friendIds: [],
        friendSuggs: [],
        notifications: [],
        profile: "",
        socket: {},
    }

    /**
     * Sets user credentials upon successful login
     * @param data the response sent from the server with user info
     */
    setCreds = (data) => {
        this.state.id = data._id;
        this.state.username = data.username;
        this.state.password = data.password;
        this.state.name = data.name;
        this.state.acceptedEvents = data.acceptedEvents
        this.state.pendingEvents = data.pendingEvents;
        this.state.friendIds = data.friends;
        this.state.friendSuggs = data.friendRecommendations
        this.state.notifications = data.notifications;
        this.state.chatIds = data.chats;
        this.state.profile = data.profilePic;
        let socket = socketio('http://yolo-backend.herokuapp.com/', {
            query: `chatList=${data.chats}&user=${data._id}`
        });

        this.state.socket = socket;
        this.setState(this.state);
    }

    /**
     * Stores user credentials in local storage
     */
    storeCreds = async () => {
        // Deep clone state
        let dataStore = {}
        for (const key of Object.keys(this.state)) {
            if (key === "socket") {
                dataStore[key] = {}
                continue
            }
            dataStore[key] = this.state[key]
        }

        try {
            await AsyncStorage.setItem('userCreds', JSON.stringify(dataStore))
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * Removes existing user data in phone cache
     */
    removeCreds = async () => {
        try {
            await AsyncStorage.removeItem('userCreds')
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * Fetches local user data and creates new client socket, if found
     * @returns whether local data was found
     */
    fetchCreds = async () => {
        try {
            const userCreds = await AsyncStorage.getItem('userCreds');
            // Check if present
            if (!userCreds)
                return false
            const credentials = await JSON.parse(userCreds);
            credentials.socket = socketio('http://yolo-backend.herokuapp.com/', {
                query: `chatList=${await credentials.chatIds}&user=${await credentials.id}`
            })
            this.modifyState(Object.keys(await credentials), Object.values(await credentials))
            return true
        } catch (err) {
            console.log(err)
        }
    }

    joinChatRooms = () =>
        this.state.socket.emit("joinRooms", this.state.chatIds)

    setLoc = (lat, long) => {
        this.state.location.latitude = lat;
        this.state.location.longitude = long;
        this.setState(this.state);
    }

    setEventImage = (imageUrl) => {
        this.state.eventCreationDetails.image = imageUrl;
        this.setState(this.state);
    }

    /**
     * Stores event details of an event the user is attempting to create so we can easily send to server
     */
    setEventDetails = (title, description, location, startDate, endDate, tags, other, isPublic) => {
        let details = this.state.eventCreationDetails
        details.title = title;
        details.description = description;
        details.location = location;
        details.startDate = startDate;
        details.endDate = endDate;
        details.tags = tags;
        details.other = other;
        details.public = isPublic;
        // need to re-assign because of how JS vars work
        this.state.eventCreationDetails = details;
        this.setState(this.state);
    }

    /**
     * Registers device for push notifications if permission is granted and it's a new device
     */
    registerPushNotifs = async () => {
        try {
            if (!Device.isDevice()) { return }
        } catch (err) { }
        try {
            const statusResult = await Notifications.getPermissionsAsync();
            const askResult = statusResult.status !== 'granted'
                ? await Notifications.requestPermissionsAsync()
                : statusResult;
            const tokenData = (await Notifications.getExpoPushTokenAsync()).data;
            fetch("http://yolo-backend.herokuapp.com/registerPushToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: this.state.id,
                    token: tokenData
                })
            })
        } catch (error) {
            showMessage({message:"We need access to your notifications", type:'danger'})
            return Promise.reject("Couldn't check notifications permissions");
            Linking.openURL('app-settings:')

        }
    }

    /**
     * General purpose function to modify portions of state without exposing state
     * @param {String[]} keyList an array of key values
     * @param {String[]} dataList an array of data values
     * Requires: keyList.length == dataList.length
     */
    modifyState = (keyList, dataList) => {
        for (let i = 0; i < keyList.length; i++)
            this.state[keyList[i]] = dataList[i];

        this.setState(this.state);
    }

    /**
     * Sends friend request from this user to another user
     * @param friendId the id of the person who is being sent the request
     * @param wantToFriend whether the user wants to send a request or cancel a request
     */
    friendRequest = (friendId, friended) => {
        fetch("http://yolo-backend.herokuapp.com/friendReq", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
                value={{
                    id: this.state.id,
                    username: this.state.username,
                    password: this.state.password,
                    fullName: this.state.name,
                    acceptedEvents: this.state.acceptedEvents,
                    pendingEvents: this.state.pendingEvents,
                    chats: this.state.chatIds,
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                    eventDetails: this.state.eventCreationDetails,
                    friends: this.state.friendIds,
                    friendSuggs: this.state.friendSuggs,
                    notifications: this.state.notifications,
                    profilePic: this.state.profile,
                    socket: this.state.socket,
                    setCredentials: this.setCreds,
                    setLocation: this.setLoc,
                    createEventDetails: this.setEventDetails,
                    createEventImage: this.setEventImage,
                    joinChatRooms: this.joinChatRooms,
                    sendFriendReq: this.friendRequest,
                    registerTokenAsync: this.registerPushNotifs,
                    storeCreds: this.storeCreds,
                    removeCreds: this.removeCreds,
                    fetchCreds: this.fetchCreds,
                    modifyState: this.modifyState,
                }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}