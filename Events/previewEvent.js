import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Button } from 'react-native';
import Context from '../Context/context';
import { styles } from '../styles';
import * as firebase from 'firebase/compat/app';
import uuid from 'uuid';

/**
 * It takes a URL, downloads the image, and uploads it to Firebase Storage
 * @param uri - The URI of the image you want to upload.
 * @returns A promise that resolves to a URL.
 */
export const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
}

/**
 * This function takes in an event object and a user id and sends a POST request to the backend to
 * create a new event
 * @param eventDetails - The event details that were entered by the user (pulled from context).
 * @param creatorId - The id of the user who created the event.
 * @returns A promise that resolves to the response from the server.
 */
const submitEventAsync = async (eventDetails, creatorId) => {
    eventDetails["creator"] = creatorId;
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
    return (
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
                                        <View key={index} style={styles.tag}>
                                            <Text>{tag}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <Text style={styles.subText}>{context.eventDetails.description}</Text>
                        <Button title={"Add Event!"}
                            onPress={
                                async () => {
                                    const resUrl = await uploadImageAsync(context.eventDetails.image)
                                    context.createEventImage(await resUrl)
                                    submitEventAsync(context.eventDetails, context.id)
                                    navigation.navigate("Submit Event")
                                }
                            }
                        />
                    </ScrollView>
                </SafeAreaView>
            }
        </Context.Consumer>
    )
}