/**
 * General component for rendering user or friend profiles
 */

import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, Text, Image, View, TouchableOpacity, Alert, Modal, ActivityIndicator } from "react-native";
import { styles } from "../styles";
import CondensedEvent from "../Events/condensedEvent";
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from "../Events/previewEvent";
import { Camera } from "expo-camera";
import { handleImgRejection } from "../Helpers/permissionHelperFuncs";
import { Button } from "react-native-elements";
import { Feather } from '@expo/vector-icons';
import { showMessage } from "react-native-flash-message";
import Context from "../Context/context";
import { fetchUserData } from "../Helpers/fetchHelperFuncs";

export default (props) => {
    const [id, setId] = useState(props.id)
    const [name, setName] = useState(props.name)
    const [username, setUsername] = useState(props.username)
    const [events, setEvents] = useState(props.events)
    const [friends, setFriends] = useState(props.friends)
    const [profilePic, setProfPic] = useState(props.profilePic)
    const [editable, setEditable] = useState(props.editable)
    const [isFriend, setFriended] = useState(false)
    const [isPending, setPending] = useState(false)
    const [uploadingProfPic, setUploading] = useState(false);
    const context = useContext(Context)

    const dataFromProps = () => {
        setId(props.id)
        setName(props.name)
        setUsername(props.username)
        setEvents(props.events)
        setFriends(props.friends)
        setEditable(props.editable)
        setProfPic(props.profilePic)
    }

    const friendedState = async () => {
        if (id == -1)
            return
        let res = await fetch("http://yolo-backend.herokuapp.com/isFriend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                viewer: context.id,
                viewed: id
            })
        })
        let json = await res.json()
        setFriended((await json).friend)
        setPending((await json).pending)
    }

    const updateFriendCount = async () => {
        let data = await fetchUserData(id)
        setFriends((await data).friends)
        context.modifyState(["friendIds"], [(await data).friends])
    }

    useEffect(dataFromProps, [])
    useEffect(() => {
        context.socket.on("friendChange", updateFriendCount);
        return () => context.socket.off("friendChange", updateFriendCount);
    }, [])
    useEffect(friendedState, [id])
    useEffect(dataFromProps, [props])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.25,
        });
        if (!result.cancelled) {
            return result.uri;
        } else {
            return null;
        }
    }

    const refreshProfilePic = async (url, uid) => {
        fetch("http://yolo-backend.herokuapp.com/updateProfilePic/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: uid,
                imgUrl: url
            })
        })
    }

    const uploadProfilePic = async () => {
        if ((await Camera.getCameraPermissionsAsync()).status !== "denied") {
            let uri = await pickImage();
            if (uri) {
                setUploading(true);
                let downloadURL = await uploadImageAsync(uri);
                await refreshProfilePic(downloadURL, id);
                setProfPic(downloadURL)
                setUploading(false);
                context.modifyState(["profile"], [downloadURL])
            }
        }
        else handleImgRejection()
    }

    /**
     * Helper method to determine the relationship between current user and viewed user
     * @returns 0 if friends, 1 if user sent friend req, 2 if neither
     */
    const friendStatus = () => isFriend ? 0 : (isPending ? 1 : 2)

    /** Chooses a given outcome from an arr of size 3 based on friend status */
    const detOutcome = outcomeArr => outcomeArr[friendStatus()]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Modal animationType="slide" transparent visible={uploadingProfPic}>
                <View style={styles.modalView}>
                    <Text style={styles.boldSubHeader}>Uploading...</Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </Modal>
            <ScrollView style={styles.container}>
                {editable ?
                    <TouchableOpacity onPress={uploadProfilePic}>
                        <Image style={styles.profImg} source={{ uri: profilePic }} />
                    </TouchableOpacity>
                    : <Image style={styles.profImg} source={{ uri: profilePic }} />
                }
                <Text style={styles.profTitle}>{name}</Text>
                <Text style={styles.profSubTitle}>@{username}</Text>
                <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                    <TouchableOpacity style={styles.paddedFlexContainer} onPress={() => {
                        props.navigation.navigate("View friends", {
                            friends: friends
                        })
                    }}>
                        <Text style={styles.centeredSubHeader}>
                            {friends.length}
                        </Text>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontFamily: "OpenSans_500Medium" }}>Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paddedFlexContainer} onPress={() => {
                        props.navigation.navigate("View events", {
                            events: events
                        })
                    }}>
                        <Text style={styles.centeredSubHeader}>
                            {events.length}
                        </Text>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontFamily: "OpenSans_500Medium" }}>Attended</Text>
                    </TouchableOpacity>
                </View>
                {
                    editable ? <></> :
                        <Button
                            title={detOutcome([
                                "Already Friends",
                                "Requested",
                                "Send Request"
                            ])}
                            icon={
                                <Feather
                                    name={detOutcome(["user-check", "user-check", "user-plus"])}
                                    size={25}
                                    color="white"
                                    style={{ marginRight: 10 }}
                                />
                            }
                            buttonStyle={styles.invertedConfirmButton}
                            onPress={() => {
                                const friendReq = () => {
                                    context.sendFriendReq(id, !isPending)
                                    showMessage({
                                        message: `Friend Request ${!isPending ? "sent" : "unsent"}`,
                                        type: "info"
                                    })
                                    setPending(!isPending)
                                }

                                const unfriend = () => {
                                    Alert.alert("Unfriend", `Are you sure you want to unfriend ${name}?`, [
                                        { text: "Cancel", style: "cancel" },
                                        {
                                            text: "Unfriend", onPress: () => {
                                                fetch("http://yolo-backend.herokuapp.com/unfriend", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify({
                                                        user: context.id,
                                                        friend: id
                                                    })
                                                })
                                                    .then(_ => {
                                                        context.refreshState()
                                                        setFriended(false)
                                                        updateFriendCount()
                                                    })
                                            }
                                        }
                                    ])
                                }

                                detOutcome([unfriend, friendReq, friendReq])()
                            }}
                        />
                }
                <View style={{ padding: 10 }}>
                    <Text style={styles.boldSubHeader}>Upcoming Events</Text>
                    {
                        events.map(event => {
                            if (!event || new Date(event.startDate) <= Date.now())
                                return <></>
                            return <CondensedEvent key={event._id} id={event._id} navigation={props.navigation} />
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
