import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Button } from 'react-native';
import Context from '../Context/context';
import { styles } from '../styles';
import * as firebase from 'firebase';
import uuid from 'uuid';

export const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
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

const submitEventAsync = async (eventDetails) => {
    const res = await fetch("http://yolo-backend.herokuapp.com/create", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails)
    });
}

export default ({ navigation }) => {
    return (
        <Context.Consumer>
            { context =>
                <SafeAreaView>
                    <ScrollView style = {styles.container}>
                        <Image style = {styles.eventImg} source = {{ uri: context.eventDetails.image }} />
                        <Text style = {styles.title}>{context.eventDetails.title}</Text>
                        <Text style = {styles.addressText}>{context.eventDetails.location}</Text>
                        <View style = {{ flex: 1, flexDirection: 'row', marginLeft: 10, }}>
                        {
                            context.eventDetails.tags.split("|").map((tag, index) => {
                                return (
                                    <View key = {index} style = {styles.tag}>
                                        <Text>{tag}</Text>
                                    </View>
                                )
                            })
                        }
                        </View>
                        <Text style = {styles.subText}>{context.eventDetails.description}</Text>
                        <Button title = {"Add Event!"} 
                            onPress = {
                                () => { 
                                    uploadImageAsync(context.eventDetails.image)
                                    .then(
                                        (resUrl) => {
                                            context.createEventImage(resUrl)
                                            submitEventAsync(context.eventDetails) 
                                        }
                                    )
                                    .then(() => navigation.navigate("Submit Event"));
                                }
                            } 
                        />
                    </ScrollView>
                </SafeAreaView>
            }
        </Context.Consumer>
    )
}