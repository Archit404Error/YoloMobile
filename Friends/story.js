import React, {useContext, useEffect, useState} from "react";
import {Image, Modal, Pressable, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {EvilIcons} from '@expo/vector-icons';

import {styles} from "../styles";
import Context from "../Context/context";

export default ({id, preview, forUpload, images}) => {
    const [imageLst, setImageLst] = useState(images);
    const [imageNum, setImageNum] = useState(0);
    const [visible, setVisible] = useState(false);
    const [viewed, setViewed] = useState(true);
    const [viewDuration, setDuration] = useState(10);
    const [intervalId, setIntervalId] = useState(-1);
    const context = useContext(Context)
    var storyLen = 10;

    const setViewStatus = () => {
        fetch(`http://yolo-backend.herokuapp.com/storyPosition/${context.id}/${id}`)
            .then(res => res.json())
            .then(json => {
                if (json.position != -1) {
                    setViewed(false)
                    setImageNum(json.position)
                }
            })
    }

    const updateSelf = () => {
        fetch(`http://yolo-backend.herokuapp.com/eventStory/${id}`)
            .then(res => res.json())
            .then(json => {
                setImageLst(json)
                setViewStatus()
            })
    }

    useEffect(() => {
        if (!forUpload) {
            setViewStatus()
            context.socket.on("existingStoryUpdate", storyId => {
                if (storyId == id)
                    updateSelf()
            })
            return () => {
                context.socket.off("existingStoryUpdate", storyId => {
                    if (storyId == id)
                        updateSelf()
                })
            }
        }
    }, [])

    useEffect(() => {
        if (visible) {
            setIntervalId(setInterval(() => {
                setDuration(--storyLen)
            }, 1000))
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
        if (viewDuration <= 0)
            closeStory()
    }, [viewDuration])

    const nextImage = () => {
        fetch("http://yolo-backend.herokuapp.com/viewStoryImage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: context.id,
                event: id,
                image: imageLst[imageNum]._id
            })
        })

        if (imageNum === imageLst.length - 1) {
            setImageNum(0)
            closeStory()
        } else {
            // reset interval to re-count down from 10
            clearInterval(intervalId)
            setIntervalId(setInterval(() => {
                setDuration(--storyLen)
            }, 1000))
            storyLen = 10
            setDuration(storyLen)
            setImageNum(imageNum + 1)
        }
    }


    return (
        <>
            <TouchableOpacity onPress={() => setVisible(!forUpload)}>
                <Image
                    style={viewed ? styles.storyImg : styles.storyImgNew}
                    source={{uri: preview}}
                />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
            >
                <StatusBar hidden/>
                <View style={{alignItems: 'flex-end', marginRight: 10, marginTop: 10}}>
                    <TouchableOpacity onPress={closeStory}>
                        <EvilIcons name="close" size={30} color="black"/>
                    </TouchableOpacity>
                </View>
                {typeof imageLst != "undefined" &&
                    <Text style={[styles.boldSubHeader, styles.storyInfoFont, {left: 10}]}>
                        {viewDuration}
                    </Text>
                }
                {typeof imageLst != "undefined" &&
                    <Text style={[styles.boldSubHeader, styles.storyInfoFont, {right: 10}]}>
                        {(imageNum + 1) + "/" + imageLst.length}
                    </Text>
                }
                {typeof imageLst != "undefined" &&
                    <Pressable onPress={nextImage}>
                        <Image source={{uri: imageLst[imageNum].image}} style={styles.storyContent}/>
                    </Pressable>
                }
            </Modal>
        </>
    )
}