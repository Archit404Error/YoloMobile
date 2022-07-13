import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import Context from './context';
import Device from 'expo-device';
import { showMessage } from 'react-native-flash-message';
import { openSocket } from '../Helpers/socketHelperFuncs';
import { fetchUserData } from '../Helpers/fetchHelperFuncs';

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
        chatData: [],
        friendIds: [],
        friendSuggs: [],
        notifications: [],
        blockedUsers: [],
        blockedBy: [],
        profile: "",
        socket: {},
        lastUpdate: new Date()
    }

    /**
     * Sets user credentials upon successful login/register
     * Side effect: Adds friend and event suggestions
     * @param data the response sent from the server with user info
     */
    setCreds = async (data) => {
        this.state.id = data._id;
        this.state.username = data.username;
        this.state.password = data.password;
        this.state.name = data.name;
        this.state.acceptedEvents = data.acceptedEvents
        this.state.friendIds = data.friends;
        this.state.notifications = data.notifications;
        this.state.chatIds = data.chats;
        this.state.chatData = (await (await fetch(`http://yolo-backend.herokuapp.com/userChats/${data._id}`)).json());
        this.state.blockedUsers = data.blockedUsers;
        this.state.blockedBy = data.blockedBy;
        this.state.profile = data.profilePic;

        let friendRes = await fetch("http://yolo-backend.herokuapp.com/populateFriends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: data._id
            })
        })

        let eventRes = await fetch("http://yolo-backend.herokuapp.com/addEventSuggestions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: data._id
            })
        })

        this.state.friendSuggs = [data.friendSuggestions, await friendRes.json()]
            .flat().filter(elem => elem)
        this.state.pendingEvents = [data.pendingEvents, await eventRes.json()].flat()
        this.state.socket = openSocket(data.chats, data._id)
        this.setState(this.state);
        this.storeCreds();
    }

    /**
     * Stores user credentials in local storage
     */
    storeCreds = async () => {
        // Deep clone state
        let dataStore = {}
        this.state.lastUpdate = new Date();
        for (const key of Object.keys(this.state)) {
            if (key === "socket")
                dataStore[key] = {}
            else
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
            credentials.socket = openSocket(await credentials.chatIds, await credentials.id)
            this.modifyState(Object.keys(await credentials), Object.values(await credentials))
            return true
        } catch (err) {
            console.log(err)
        }
    }

    /** 
     * Allows the user to begin receiving notifications for all chats they're in 
     */
    joinChatRooms = () =>
        this.state.socket.emit("joinRooms", this.state.chatIds)

    /**
     * Stores the user's location in latitude and longitude
     * @param lat the user's latitude
     * @param long the user's longitude
     */
    setLoc = (lat, long) => {
        this.state.location.latitude = lat;
        this.state.location.longitude = long;
        this.setState(this.state);
    }

    /**
     * Returns whether or not the user's location has been set
     */
    locationEnabled = () =>
        this.state.location.latitude != 0 && this.state.location.longitude != 0

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
     * Returns how much time has passed since last update (hours)
     */
    timeSinceUpdate = () => ((new Date() - this.state.lastUpdate) / (1000 * 60 * 60))

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
            showMessage({ message: "We don't have access to your notifications", type: 'danger' })
            return Promise.reject("Couldn't check notifications permissions");
        }
    }

    /**
     * General purpose function to modify portions of state without exposing state
     * Side effect: stores creds in cache and sets last updated time on call
     * @param {String[]} keyList an array of key values
     * @param {String[]} dataList an array of data values
     * @requires keyList.length == dataList.length
     */
    modifyState = (keyList, dataList) => {
        for (let i = 0; i < keyList.length; i++)
            this.state[keyList[i]] = dataList[i];
        this.storeCreds()
        this.setState(this.state);
    }

    /**
     * General purpose function that queries user state from server
     */
    refreshState = () => {
        fetchUserData(this.state.id)
            .then(json => this.setCreds(json))
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
                    chatIds: this.state.chatIds,
                    chatData: this.state.chatData,
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                    eventDetails: this.state.eventCreationDetails,
                    friends: this.state.friendIds,
                    friendSuggs: this.state.friendSuggs,
                    notifications: this.state.notifications,
                    profilePic: this.state.profile,
                    blockedUsers: this.state.blockedUsers,
                    blockedBy: this.state.blockedBy,
                    socket: this.state.socket,
                    setCredentials: this.setCreds,
                    setLocation: this.setLoc,
                    locationEnabled: this.locationEnabled,
                    createEventDetails: this.setEventDetails,
                    createEventImage: this.setEventImage,
                    joinChatRooms: this.joinChatRooms,
                    sendFriendReq: this.friendRequest,
                    registerTokenAsync: this.registerPushNotifs,
                    storeCreds: this.storeCreds,
                    removeCreds: this.removeCreds,
                    fetchCreds: this.fetchCreds,
                    timeSinceUpdate: this.timeSinceUpdate,
                    modifyState: this.modifyState,
                    refreshState: this.refreshState,
                }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}