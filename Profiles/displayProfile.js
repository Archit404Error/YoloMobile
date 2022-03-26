/**
 * General component for rendering user or friend profiles
 */

import React from "react";
import { SafeAreaView, ScrollView, Text, Image, View, TouchableOpacity } from "react-native"
import { styles } from "../styles";
import { state, useState } from "react";
import Friend from "../Friends/friend"
import CondensedEvent from "../Events/condensedEvent";
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync  } from "../Events/previewEvent";

export default class extends React.Component {
    state = {
        url:""
    }

    constructor(props) {
        super(props);
        console.log(props.profilePic);
        
    }
    componentDidMount() {
        this.setState({
            url:this.props.profilePic
        })
    }
    
    pickImage = async (context) => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 0.25,
        });
        if (!result.cancelled) {
            return result.uri;
        }
      };

     refreshProfilePic = async (url, uid) =>  {
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
    componentDidUpdate(prevProps){
        if(this.props.profilePic!=prevProps.profilePic){
            this.setState({
                url:this.props.profilePic
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <TouchableOpacity onPress={ async () =>  {
                        var uri = await this.pickImage();
                        var downloadURL = await uploadImageAsync(uri);
                        await this.refreshProfilePic(downloadURL, this.props.id);
                        this.setState({
                            url:downloadURL
                        })
                        }
                    }>
                    <Image style={styles.profImg} source={{ uri:this.props.profilePic}}/>
                    </TouchableOpacity>
                   

                    <Text style={styles.profTitle}>{this.props.name}</Text>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                        <TouchableOpacity style={styles.paddedFlexContainer}>
                            <Text style={styles.centeredSubHeader}>
                                {this.props.friends.length}
                            </Text>
                            <Text style={{ alignSelf: 'center', fontSize: 18 }}>Friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paddedFlexContainer}>
                            <Text style={styles.centeredSubHeader}>
                                {this.props.events.length}
                            </Text>
                            <Text style={{ alignSelf: 'center', fontSize: 18 }}>Attended</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 10, marginTop: 10 }}>
                        <Text style={styles.boldSubHeader}>Upcoming Events</Text>
                        {
                            this.props.events.map(event =>
                                <CondensedEvent key={event._id} id={event._id} navigation={this.props.navigation} />
                            )
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}