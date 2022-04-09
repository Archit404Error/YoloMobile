import React, { useState } from "react";
import { Image, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { styles } from "../styles";

export const SquareEvent = ({ eventObj, navigation }) => (
    <TouchableOpacity
        onPress={() => navigation.navigate("Details", {
            id: eventObj._id,
            title: eventObj.title,
            image: eventObj.image,
            description: eventObj.description,
            tags: eventObj.tags,
            location: eventObj.location,
            startDate: new Date(eventObj.startDate),
            endDate: new Date(eventObj.endDate),
            attendees: eventObj.attendees
        })}
        style={styles.eventCard}
    >
        <Image style={styles.eventCardImg} source={{ uri: eventObj.image }} />
        <Text style={styles.title}>{eventObj.title}</Text>
        <Text style={styles.subText}>{eventObj.description}</Text>
    </TouchableOpacity>
)

export default ({ id, navigation }) => {
    const [upcoming, setUpcoming] = useState([])

    useState(() => {
        fetch(`http://yolo-backend.herokuapp.com/upcomingEvents/${id}`)
            .then(res => res.json())
            .then(resJson => setUpcoming(resJson))
    }, [])

    return (
        <SafeAreaView>
            <ScrollView horizontal>
                {upcoming.map(event => <SquareEvent eventObj={event} navigation={navigation} />)}
            </ScrollView>
        </SafeAreaView>
    )
}