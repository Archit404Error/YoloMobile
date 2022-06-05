import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, Modal, View, StatusBar } from "react-native";
import { EvilIcons } from '@expo/vector-icons'

import { styles } from "../styles";
import { fetchUserData } from "../Helpers/fetchHelperFuncs";

export default ({ id, forUpload, image }) => {
    const [previewPic, setPreview] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png")
    const [visible, setVisible] = useState(false)
    const [viewed, setViewed] = useState(false);

    useEffect(() => {
        (async () => {
            const json = await fetchUserData(id);
            setPreview((await json).profilePic)
        })()
    }, [])


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
                    <TouchableOpacity onPress={() => { setViewed(true); setVisible(false) }}>
                        <EvilIcons name="close" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <Image source={{ uri: image }} style={styles.storyContent} />
            </Modal>
        </>
    )
}