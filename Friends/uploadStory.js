import React, { useState, useEffect } from "react";
import Story from './storyPreview';
import Context from "../Context/context";

import { TouchableOpacity, Modal, Image } from "react-native";
import { Badge } from "react-native-elements";
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

    return (
        <Context.Consumer>
        { context =>
            <>
                <TouchableOpacity onPress = {() => chooseStory()}>
                    <Story id = {context.id} forUpload = {true} />
                    <Badge
                        status="warning"
                        value="+"
                        containerStyle={{ position: 'absolute', top: 40, right: 10 }}
                    />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                >
                    <Image source = {{ uri: image }} />
                </Modal>
            </>
        }
        </Context.Consumer>
    )
}