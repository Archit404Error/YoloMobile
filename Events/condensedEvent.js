import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { styles } from "../styles";

export default function CondensedEvent({ id, navigation, customPressFunc }) {
    const [res, setRes] = useState({})

    const updateSelf = () => {
        fetch(`http://yolo-backend.herokuapp.com/event/${id}`)
            .then(res => res.json())
            .then(setRes)
    }

    useEffect(updateSelf, [])

    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: 10 }}
            onPress={customPressFunc ? customPressFunc : () => {
                navigation.navigate("Details", {
                    id: res._id,
                    title: res.title,
                    image: res.image,
                    description: res.description,
                    tags: res.tags,
                    location: res.location,
                    startDate: new Date(res.startDate),
                    endDate: new Date(res.endDate),
                    attendees: res.attendees,
                    pulledData: res
                })
            }}>
            <Image style={styles.smallProfImg} source={{ uri: res.image }} />
            <Text style={{ alignSelf: 'center', marginLeft: 10, fontFamily: "OpenSans_300Light" }}>{res.title && res.title.length > 30 ? res.title.substring(0, 27) + "..." : res.title}</Text>
        </TouchableOpacity>
    )
}