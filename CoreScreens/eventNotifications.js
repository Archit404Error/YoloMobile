import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Context from "../Context/context";
import EventPreview from "../Notifications/eventStatsPreview";
import EmptyScreen from "../Components/emptyScreen";

export default ({ navigation }) => {
    const [userEvents, setUserEvents] = useState([])
    const context = useContext(Context);

    async function fetchData() {
        fetch(`http://yolo-backend.herokuapp.com/createdEvents/${context.id}`)
            .then(res => res.json())
            .then(json => setUserEvents(json))
    }

    // Get this user's created events on mount and begin socket listening
    useEffect(
        () => {
            fetchData();
            context.socket.on("userCreatedEvent", fetchData);
            // Turn off listener on unmount
            return () => context.socket.off("userCreatedEvent", fetchData);
        },
        [])

    return (
        <SafeAreaView>
            <ScrollView>
                {
                    userEvents.length == 0 &&
                    <EmptyScreen
                        header="No events right now!"
                        desc="You'll get events notifs once you've created an event!"
                    />
                }
                {
                    userEvents.map(eventData => {
                        return (
                            <EventPreview
                                key={eventData._id + "eventNotifs"}
                                eventData={eventData}
                                navigation={navigation}
                            />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}