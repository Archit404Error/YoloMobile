import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Button, Modal, ActivityIndicator, Alert } from 'react-native';
import Context from '../Context/context';
import { styles } from '../styles';

import * as Analytics from 'expo-firebase-analytics';

export const uploadImageAsync = async (uri) => {
    let fileType = uri.split(".").pop();
    let formData = new FormData();
    formData.append("photo", {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`
    })

    const res = await fetch('http://yolo-backend.herokuapp.com/upload', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    })

    const json = await res.json();
    if (json.status === "success")
        return json.data;

    throw "Could not upload image";
}

/**
 * Takes in an event object and a user id and sends a POST request to the backend to
 * create a new event
 * @param ctx the user's context
 * @returns the created event's id.
 */
const submitEventAsync = async (ctx) => {
    const eventDetails = ctx.eventDetails
    const creator = {
        "_id": ctx.id,
        "username": ctx.username,
        "password": ctx.password,
        "name": ctx.fullName,
        "acceptedEvents": ctx.acceptedEvents,
        "pendingEvents": ctx.pendingEvents,
        "rejectedEvents": ctx.rejectedEvents,
        "friends": ctx.friends,
        "profilePic": ctx.profilePic,
        "blockedBy": ctx.blockedBy,
        "bockedUsers": ctx.blockedUsers
    }

    eventDetails.creator = creator;
    const res = await fetch("http://yolo-backend.herokuapp.com/create", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails)
    });
    return res;
}

export default ({ navigation }) => {
    const [submitted, setSubmitted] = useState(false)
    return (
        <>
            <Modal visible={submitted}>
                <View style={{ padding: 20, marginTop: 40, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, marginBottom: 50 }}>Submitting Event...</Text>
                    <ActivityIndicator size={"large"} />
                </View>
            </Modal>
            <Context.Consumer>
                {context =>
                    <SafeAreaView>
                        <ScrollView style={styles.container}>
                            <Image style={styles.eventImg} source={{ uri: context.eventDetails.image }} />
                            <Text style={styles.title}>{context.eventDetails.title}</Text>
                            <Text style={styles.addressText}>{context.eventDetails.location}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, }}>
                                {
                                    context.eventDetails.tags.split("|").map((tag, index) => {
                                        return (
                                            <View key={index + "tag" + context.eventDetails.title}>
                                                <Text style={styles.tag}>{tag}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <Text style={styles.subText}>{context.eventDetails.description}</Text>
                            <Button title={"Add Event!"}
                                disabled={submitted}
                                onPress={
                                    async () => {
                                        setSubmitted(true)
                                        Analytics.logEvent('event_created', { creator: context.username })
                                        const resUrl = await uploadImageAsync(context.eventDetails.image)
                                        context.createEventImage(await resUrl)
                                        const response = await submitEventAsync(context)
                                        const result = await response.json()
                                        let id = {};
                                        setSubmitted(false)
                                        if (result.status === "success") {
                                            id = result.data;
                                            navigation.navigate("Submit Event", {
                                                id: id,
                                                title: context.eventDetails.title
                                            })
                                        }
                                        else {
                                            Alert.alert(
                                                "Error Submitting Event",
                                                `The ${result.data} you entered could not be processed. Please change the value of the ${result.data} field`
                                            )
                                        }
                                    }
                                }
                            />
                        </ScrollView>
                    </SafeAreaView>
                }
            </Context.Consumer>
        </>
    )
}