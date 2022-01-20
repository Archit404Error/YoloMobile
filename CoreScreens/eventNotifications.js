import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Context from "../Context/context";
import EventPreview from "../Notifications/eventStatsPreview";

export default ({ navigation }) => {
    const [userEvents, setUserEvents] = useState([])
    const context = useContext(Context);

    // Get this user's created events on mount
    useEffect(
        () => {
            fetch(`http://yolo-backend.herokuapp.com/createdEvents/${context.id}`)
                .then(res => res.json())
                .then(json => setUserEvents(json))
        }, 
    [])

    return (
        <SafeAreaView>
            <ScrollView>
                {
                    userEvents.map((eventData, index) => {
                        return (
                            <EventPreview 
                                key = {index}  
                                eventData = {eventData}
                                navigation = {navigation}
                            />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}