import React, { useContext, useState, useEffect } from "react";
import { Image, Text, SafeAreaView, ScrollView, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles, windowWidth, windowHeight } from "../styles";
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
                <Text style={styles.title}>{`Attendees (${data.attendees.length})`}</Text>
                {
                    data.attendees.map((id, index) => {
                        <Text key={index}>{id}</Text>
                    })
                }
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="eye" size={24} color="black" />
                        <Text style={styles.chatTitle}>Viewed</Text>
                        <Text style={styles.subText}>{data.viewers.length}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="md-close" size={24} color="black" />
                        <Text style={styles.chatTitle}>Denied</Text>
                        <Text style={styles.subText}>{data.rejecters.length}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="checkmark" size={24} color="black" />
                        <Text style={styles.chatTitle}>Agreed</Text>
                        <Text style={styles.subText}>{data.attendees.length}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}