import React, { useState, useEffect, useContext } from "react";
import { Image, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { styles, screenWidth } from "../styles";
import Context from "../Context/context";

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
    const context = useContext(Context)
    const [upcoming, setUpcoming] = useState([])

    const fetchUpcoming = () => {
        fetch(`http://yolo-backend.herokuapp.com/upcomingEvents/${id}`)
            .then(res => res.json())
            .then(resJson => setUpcoming(resJson))
    }

    useEffect(() => {
        fetchUpcoming()
        context.socket.on("eventsUpdated", () => fetchUpcoming())
        return () => context.socket.off("eventsUpdated", () => fetchUpcoming())
    }, [])

    return (
        <SafeAreaView>
            <ScrollView horizontal snapToAlignment="start" snapToInterval={screenWidth + 45} decelerationRate={0}>
                {upcoming.map(event => <SquareEvent eventObj={event} navigation={navigation} />)}
            </ScrollView>
        </SafeAreaView>
    )
}