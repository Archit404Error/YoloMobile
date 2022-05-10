/**
 * General component for rendering user or friend profiles
 */

import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Text, Image, View, TouchableOpacity } from "react-native"
import { styles } from "../styles";
import CondensedEvent from "../Events/condensedEvent";
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from "../Events/previewEvent";
import { Camera } from "expo-camera";
import { handleImgRejection } from "../Helpers/permissionHelperFuncs";

export default (props) => {
    const [id, setId] = useState(props.id)
    const [name, setName] = useState(props.name)
    const [events, setEvents] = useState(props.events)
    const [friends, setFriends] = useState(props.friends)
    const [profilePic, setProfPic] = useState(props.profilePic)
    const [editable, setEditable] = useState(props.editable)

    const dataFromProps = () => {
        setId(props.id)
        setName(props.name)
        setEvents(props.events)
        setFriends(props.friends)
        setEditable(props.editable)
    }

    useEffect(dataFromProps, [])
    useEffect(() => setProfPic(props.profilePic), [props.profilePic])
    useEffect(dataFromProps, [props])

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.25,
        });
        if (!result.cancelled) {
            return result.uri;
        }
    }

    refreshProfilePic = async (url, uid) => {
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {editable ?
                    <TouchableOpacity onPress={async () => {
                        if ((await Camera.getCameraPermissionsAsync()).status !== "denied") {
                            let uri = await this.pickImage();
                            let downloadURL = await uploadImageAsync(uri);
                            await this.refreshProfilePic(downloadURL, id);
                            this.setState({
                                url: await downloadURL
                            })
                        }
                        else
                            handleImgRejection()
                    }}>
                        <Image style={styles.profImg} source={{ uri: profilePic }} />
                    </TouchableOpacity>
                    : <Image style={styles.profImg} source={{ uri: profilePic }} />
                }
                <Text style={styles.profTitle}>{name}</Text>
                <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                    <TouchableOpacity style={styles.paddedFlexContainer} onPress={() => {
                        props.navigation.navigate("View friends", {
                            friends: friends
                        })
                    }}>
                        <Text style={styles.centeredSubHeader}>
                            {friends.length}
                        </Text>
                        <Text style={{ alignSelf: 'center', fontSize: 18 }}>Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paddedFlexContainer} onPress={() => {
                        props.navigation.navigate("View events", {
                            events: events
                        })
                    }}>
                        <Text style={styles.centeredSubHeader}>
                            {events.length}
                        </Text>
                        <Text style={{ alignSelf: 'center', fontSize: 18 }}>Attended</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, marginTop: 10 }}>
                    <Text style={styles.boldSubHeader}>Attended Events</Text>
                    {
                        events.map(event =>
                            <CondensedEvent key={event._id} id={event._id} navigation={props.navigation} />
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
