import React, { useContext, useState, useEffect } from "react";
import { Image, Text, SafeAreaView, ScrollView, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles, windowWidth, windowHeight } from "../styles";
import Friend from "../Friends/friend";
import Context from "../Context/context";

export default ({ route }) => {
    const context = useContext(Context);
    const [data, setData] = useState(route.params.eventData);

    const updateData = () => {
        fetch(`http://yolo-backend.herokuapp.com/events/${data._id}`)
            .then(data => data.json())
            .then(json => setData(json))
    }

    context.socket.on("RSVPOccurred", updateData)

    useEffect(() => {
        return () => context.socket.off("RSVPOccurred", updateData)
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView>
                <Image
                    style={{ width: windowWidth, height: windowHeight / 5 }}
                    source={{ uri: data.image }}
                />
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subText}>{`Attendees (${data.attendees.length})`}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="eye" size={24} color="black" />
                        <Text style={styles.boldSubHeader}>Viewed</Text>
                        <Text style={styles.subText}>{data.viewers.length}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="md-close" size={24} color="black" />
                        <Text style={styles.boldSubHeader}>Denied</Text>
                        <Text style={styles.subText}>{data.rejecters.length}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="checkmark" size={24} color="black" />
                        <Text style={styles.boldSubHeader}>Agreed</Text>
                        <Text style={styles.subText}>{data.attendees.length}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.subSectionHeading}>Recently Accepted</Text>
                    {
                        data.attendees.slice(data.attendees.length > 5 ? -5 : 0)
                            .map((userId, index) =>
                                <Friend key={index} id={userId} />
                            )
                    }
                </View>
                <View>
                    <Text style={styles.subSectionHeading}>Recently Viewed</Text>
                    {
                        data.viewers.slice(data.viewers.length > 5 ? -5 : 0)
                            .map((userId, index) =>
                                <Friend key={index} id={userId} />
                            )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}