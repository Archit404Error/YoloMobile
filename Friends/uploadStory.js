import React, { useState, useEffect } from "react";
import Story from './storyPreview';
import Context from "../Context/context";
import { styles, windowWidth, windowHeight } from "../styles";
import { uploadImageAsync } from "../Events/previewEvent";

import { TouchableOpacity, Modal, Image, View, Text } from "react-native";
import { Badge } from "react-native-elements";
import { EvilIcons, Ionicons } from "@expo/vector-icons"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default () => {

    const [image, setImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
          await Permissions.askAsync(Permissions.CAMERA_ROLL);
          await Permissions.askAsync(Permissions.CAMERA);
        })();
      }, []);

    const chooseStory = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
          });
        
        if (!result.cancelled) {
            setImage(result.uri);
            setModalVisible(true);
        }
    }

    const uploadStory = (id, imgUrl) => {
        fetch(`http://yolo-backend.herokuapp.com/uploadStory`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                user: id,
                image: imgUrl
            })
        })
    }

    return (
        <Context.Consumer>
        { context =>
            <>
                <TouchableOpacity onPress = {() => chooseStory()}>
                    <Story id = {context.id} forUpload = {true} />
                    <Badge
                        status="warning"
                        value="+"
                        containerStyle={{ position: 'absolute', top: 0, left: 0 }}
                        badgeStyle= { styles.storyImg }
                    />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                >
                    <EvilIcons 
                        name="close" 
                        size={30} 
                        color="black" 
                        style = {{ 
                            position: 'absolute', 
                            top: 15, 
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 10,
                                height: 10,
                            },
                            shadowOpacity: 1.0,
                            shadowRadius: 15,
                            zIndex: 999 
                        }}
                        onPress = {() => setModalVisible(false)}
                    />
                    <Image source = {{ uri: image }} style = {{ height: windowHeight, width: windowWidth }} />
                    <TouchableOpacity onPress = {() => {
                        uploadImageAsync(image)
                            .then(resUrl => uploadStory(context.id, resUrl))
                        setModalVisible(false);
                    }}>
                        <View style = {styles.postStoryContainer}>
                            <Text style = {{ fontSize: 15 }}>Post Story</Text>
                            <Ionicons name = { "send-sharp" } size = {20} style = {{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </>
        }
        </Context.Consumer>
    )
}