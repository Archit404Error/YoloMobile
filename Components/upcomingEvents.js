import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

export const SquareEvent = ({ eventObj }) => (
    <TouchableOpacity>
        <Image source={{ uri: eventObj.image }} />
        <Text style={styles.title}>{eventObj.title}</Text>
        <Text style={styles.subText}>{eventObj.description}</Text>
    </TouchableOpacity>
)

export default ({ id }) => {
    const [upcoming, setUpcoming] = useState([])

    useState(() => {
        fetch(`http://yolo-backend.herokuapp.com/upcomingEvents/${id}`)
            .then(res => res.json())
            .then(resJson => setUpcoming(resJson))
    }, [])

    return (
        <View>
            {upcoming.map(event => <SquareEvent eventObj={event} />)}
        </View>
    )
}