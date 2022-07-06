import React, {useContext, useEffect, useRef, useState} from "react";
import Context from "../Context/context";
import {styles, windowHeight, windowWidth} from "../styles";
import {uploadImageAsync} from "../Events/previewEvent";

import {Image, Modal, Text, TouchableOpacity, View} from "react-native";
import {Badge} from "react-native-elements";
import {EvilIcons, Ionicons} from "@expo/vector-icons"
import {Camera} from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import UploadStoryModal from "../Components/uploadStoryModal";
import {DraggableText} from "../Components/draggableText";

export default () => {
    const [image, setImage] = useState('');
    const [uploadUrl, setUploadUrl] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [texts, setTexts] = useState([]);

    const eventUploadModal = useRef();
    const context = useContext(Context);

    useEffect(() => {
        (async () => {
            await Camera.requestCameraPermissionsAsync();
        })();
    }, []);

    const chooseStory = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.25,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setModalVisible(true);
        }
    }

    const uploadStory = (event) => {
        fetch(`http://yolo-backend.herokuapp.com/uploadStory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: context.id,
                image: uploadUrl,
                event: event
            })
        })
        eventUploadModal.current.close()
        setModalVisible(false)
    }

    return (
        <Context.Consumer>
            {context =>
                <>
                    <TouchableOpacity onPress={chooseStory}>
                        <Image source={{uri: context.profilePic}} style={styles.storyImg}/>
                        <Badge
                            status="warning"
                            value="+"
                            containerStyle={{position: 'absolute', bottom: 0, right: 7.5}}
                            badgeStyle={{
                                height: 20,
                                width: 20,
                                borderRadius: 100,
                                borderColor: "white",
                                borderWidth: 1
                            }}
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
                            color="white"
                            style={{
                                position: 'absolute',
                                top: 40,
                                left: 10,
                                zIndex: 999
                            }}
                            onPress={() => setModalVisible(false)}
                        />
                        <Image source={{uri: image}} style={{height: windowHeight, width: windowWidth}}/>
                        <TouchableOpacity onPress={() => {
                            texts.push(<DraggableText key={texts.length + 1}/>);
                            setTexts([...texts])
                        }} style={styles.modifyStoryContainer}>
                            <Ionicons name={"text"} color={"white"} size={30} style={styles.modifyStoryIcon}/>
                        </TouchableOpacity>
                        <>
                            {texts}
                        </>
                        <TouchableOpacity onPress={async () => {
                            const resUrl = await uploadImageAsync(image)
                            setUploadUrl(resUrl)
                            eventUploadModal.current.open()
                            setModalVisible(false)
                        }}>
                            <View style={styles.postStoryContainer}>
                                <Text style={{fontSize: 15}}>Post Story</Text>
                                <Ionicons name={"send-sharp"} size={20} style={{marginLeft: 10}}/>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    <UploadStoryModal
                        ref={eventUploadModal}
                        listData={context.acceptedEvents.map(event => event._id)}
                        upload={uploadStory}
                    />
                </>
            }
        </Context.Consumer>
    )
}