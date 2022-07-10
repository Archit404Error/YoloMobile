import React, {useEffect, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../styles";
import {fetchUserData} from "../Helpers/fetchHelperFuncs";

export const CircleProfile = ({id, pressHandler}) => {
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetchUserData(id)
            .then(json => {
                setImg(json.profilePic);
                setName(json.name);
                setUsername(json.username);
            })
    }, [])

    return (
        <TouchableOpacity onPress={pressHandler}>
            <View style={{justifyContent: "center"}}>
                <Image source={{uri: img}} style={styles.smallProfImg}/>
                <Text style={styles.subSectionHeading}>{name}</Text>
                <Text style={styles.subSectionHeading}>{username}</Text>
            </View>
        </TouchableOpacity>
    )
}