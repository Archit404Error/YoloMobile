import React, { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DisplayProfile from "./displayProfile";
import { Alert, TouchableOpacity, Text } from "react-native";
import Context from "../Context/context";
import { HeaderBackButton } from "@react-navigation/elements";

export default (props) => {
    const [id, setId] = useState(-1);
    const [name, setName] = useState('Loading...')
    const [username, setUsername] = useState('Loading...')
    const [profPic, setProfPic] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png')
    const [friends, setFriends] = useState([])
    const [events, setEvents] = useState([])
    const context = useContext(Context)

    const fetchData = () => {
        const url = `http://yolo-backend.herokuapp.com/user/${props.route.params.id}`;
        fetch(url)
            .then(res => res.json())
            .then(resJson => {
                setId(props.route.params.id)
                setName(resJson.name)
                setUsername(resJson.username)
                setFriends(resJson.friends)
                setEvents(resJson.acceptedEvents)
                setProfPic(resJson.profilePic)
            })
    }


    props.navigation.setOptions({
        headerLeft: () => (<HeaderBackButton onPress={() => props.navigation.navigate("Friend List")} />),
        headerRight: () => (
            <TouchableOpacity onPress={() => {
                Alert.alert(
                    "Would you like to block this user?",
                    "You will no longer be able to see their profile",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        {
                            text: "Block",
                            onPress: () => {
                                fetch('http://yolo-backend.herokuapp.com/blockUser', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        user: context.id,
                                        blockedUser: id,
                                        isBlocking: true
                                    })
                                })
                                    .then(_ => {
                                        context.refreshState()
                                        props.navigation.navigate("Friend List")
                                    })
                            }
                        }
                    ]
                )
            }}>
                <MaterialCommunityIcons name="account-cancel" size={30} style={{ marginRight: 20 }} />
            </TouchableOpacity>
        )
    })

    useEffect(fetchData, [props])

    return (
        <DisplayProfile
            id={id}
            name={name}
            username={username}
            friends={friends}
            events={events}
            profilePic={profPic}
            navigation={props.navigation}
            editable={false}
        />
    );
}
