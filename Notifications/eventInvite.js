import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { acceptedFlow, eventInteraction, rejectionFlow } from "../Helpers/eventHelperFuncs";
import { Feather } from '@expo/vector-icons';
import Context from "../Context/context";

export default ({ navigation, eventId, senderId, eventName, senderName }) => {
    const context = useContext(Context);
    const [rsvped, setRSVP] = useState(false);
    const [senderData, setSenderData] = useState({});
    const [eventData, setEventData] = useState({});

    // Store event data on mount
    useEffect(() => {
        fetch(`http://yolo-backend.herokuapp.com/event/${eventId}`)
            .then(res => res.json())
            .then(json => setEventData(json))

        fetch(`http://yolo-backend.herokuapp.com/user/${senderId}`)
            .then(res => res.json())
            .then(json => setSenderData(json))
    }, [])

    if (rsvped) return <></>

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 15,
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }}>
            <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(
                        "Friends",
                        {
                            screen: "View Profile",
                            params: {
                                id: senderId
                            }
                        },
                    )
                }}>
                    <View style={{ flexDirection: 'row' }} >
                        <Image
                            source={{ uri: senderData.profilePic }}
                            style={{ width: 20, height: 20, marginLeft: 10, marginTop: 7.5, borderRadius: 50 }}
                        />
                        <Text style={{ color: 'black', marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                            {senderName}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    eventInteraction('viewed', context.id, eventId);
                    navigation.navigate("Events", {
                        screen: "Details",
                        params: {
                            id: eventId,
                            title: eventData.title,
                            image: eventData.image,
                            description: eventData.description,
                            location: eventData.location,
                            startDate: new Date(eventData.startDate),
                            endDate: new Date(eventData.endDate),
                            attendees: eventData.attendees,
                            navigation: navigation
                        }
                    })
                }}>
                    <Text style={{ color: 'gray', fontSize: 10, marginLeft: 10 }}>invited you to {eventName}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 60, marginTop: 5 }} onPress={() => {
                acceptedFlow(context.id, eventData, eventData.title, context)
                setRSVP(true)
            }}>
                <Feather name="check" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 30, marginTop: 5 }} onPress={() => {
                rejectionFlow(context.id, eventId, eventData.title, context)
                setRSVP(true)
            }}>
                <Feather name="x" size={25} />
            </TouchableOpacity>
        </View>
    )
}