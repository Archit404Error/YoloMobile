import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default ({eventId, senderId, eventName, senderName}) => {
    // Eventually this component should be built out to enable event RSVP and navigation to event
    return (
        <View style = {{
            flexDirection: 'row', 
            backgroundColor: 'white', 
            padding: 15, 
            borderBottomColor: '#f2f2f2', 
            borderBottomWidth: 1
        }}>
            <TouchableOpacity onPress = {() => {
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
                <View style = {{ flexDirection: 'column' }}>
                    <Text style = {{ color: 'black', marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                        {senderName}
                    </Text>
                    <Text style = {{ color: 'gray', fontSize: 10, marginLeft: 10 }}>invited you to {eventName}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style = {{ marginTop: 5, right: -100 }} onPress = {() => console.log("unimplemented")}>
                <Feather name = "check" size = {25} />
            </TouchableOpacity>
            <TouchableOpacity style = {{ marginTop: 5, right: -50 }} onPress = {() => console.log("unimplemented")}>
                <Feather name = "x" size = {25} />
            </TouchableOpacity>
        </View>
    )
}