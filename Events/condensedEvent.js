import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { styles } from "../styles";

export default function CondensedEvent({ id, navigation }) {
    const [res, setRes] = useState({})

    useEffect(() => {
        fetch(`http://yolo-backend.herokuapp.com/event/${id}`)
            .then(res => res.json())
            .then(json => {
                setRes(json)
            })
    }, [])

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row'
            }}
            onPress={() => {
                navigation.navigate("Details", {
                    id: res._id,
                    title: res.title,
                    image: res.image,
                    description: res.description,
                    tags: res.tags,
                    location: res.location,
                    startDate: new Date(res.startDate),
                    endDate: new Date(res.endDate),
                    attendees: res.attendees
                })
            }}>
            <Image style={styles.smallProfImg} source={{ uri: res.image }} />
            <Text style={{ alignSelf: 'center', marginLeft: 10 }}>{res.title}</Text>
        </TouchableOpacity>
    )
}