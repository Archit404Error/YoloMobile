import React, { useState, useContext } from "react";
import { View } from "react-native";
import { eventInteraction } from "../Events/eventHelperFuncs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import Context from "../Context/context";

export default ({ eventId, senderId, eventName, senderName }) => {
    const context = useContext(Context);
    const [rsvped, setRSVP] = useState(false);

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
                    this.props.navigation.navigate(
                        "Friends",
                        {
                            screen: "View Profile",
                            params: {
                                id: senderId
                            }
                        },
                    )
                }}>
                    <Text style={{ color: 'black', marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                        {senderName}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    eventInteraction('viewed', context.id, eventId);
                    this.props.navigation.navigate("Events", {
                        screen: "Details",
                        params: { id: eventId }
                    })
                }}>
                    <Text style={{ color: 'gray', fontSize: 10, marginLeft: 10 }}>invited you to {eventName}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginTop: 5, right: -100 }} onPress={() => {
                eventInteraction('accepted', context.id, eventId);
                setRSVP(true)
            }}>
                <Feather name="check" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 5, right: -100 }} onPress={() => {
                eventInteraction('rejected', context.id, eventId);
                setRSVP(true)
            }}>
                <Feather name="x" size={25} />
            </TouchableOpacity>
        </View >
    )
}