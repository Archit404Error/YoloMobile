import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, Modal, View, StatusBar, Text } from "react-native";
import { EvilIcons } from '@expo/vector-icons'

import { styles } from "../styles";
import { fetchUserData } from "../Helpers/fetchHelperFuncs";

export default ({ id, forUpload, image }) => {
    const [previewPic, setPreview] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png")
    const [visible, setVisible] = useState(false)
    const [viewed, setViewed] = useState(false);
    const [viewDuration, setDuration] = useState(10);
    const [intervalId, setId] = useState(-1);
    var storyLen = 10;

    useEffect(() => {
        (async () => {
            const json = await fetchUserData(id);
            setPreview((await json).profilePic)
        })()
    }, [])

    useEffect(() => {
        if (visible) {
            setId(setInterval(() => { console.log(storyLen); setDuration(storyLen--) }, 1000))
        }
    }, [visible])

    const closeStory = () => {
        clearInterval(intervalId)
        setVisible(false)
        setViewed(true)
        storyLen = 10
        setDuration(storyLen)
    }

    useEffect(() => {
        if (viewDuration <= 0) closeStory()
    }, [viewDuration])


    return (
        <>
            <TouchableOpacity onPress={() => setVisible(true && !forUpload)}>
                <Image
                    style={viewed ? styles.storyImg : styles.storyImgNew}
                    source={{ uri: previewPic }}
                />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
            >
                <StatusBar hidden />
                <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 10 }}>
                    <TouchableOpacity onPress={closeStory}>
                        <EvilIcons name="close" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.boldSubHeader}>{viewDuration}</Text>
                <Image source={{ uri: image }} style={styles.storyContent} />
            </Modal>
        </>
    )
}