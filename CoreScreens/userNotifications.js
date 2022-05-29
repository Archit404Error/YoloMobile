import React, { useContext, useState, useEffect } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import Context from "../Context/context";
import { styles } from "../styles";
import FriendRequest from "../Notifications/request";
import EventInvite from "../Notifications/eventInvite";
import EmptyScreen from "../Components/emptyScreen";

export default ({ navigation }) => {
    const [notifObjs, setNotifObjs] = useState([])
    const context = useContext(Context);

    const updateNotifs = () => {
        fetch(`http://yolo-backend.herokuapp.com/user/${context.id}`)
            .then(res => res.json())
            .then(json => {
                setNotifObjs(json.notifications)
                return json.notifications
            })
            .then(notifs => context.modifyState(["notifications"], notifs))
    }

    useEffect(() => {
        updateNotifs()
        context.socket.on("notificationsUpdated", updateNotifs)
        return () => context.socket.off("notificationsUpdated", updateNotifs)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ minHeight: "100%" }}>
                {
                    notifObjs.length == 0 &&
                    <EmptyScreen header="No notifications right now!" desc="You'll get notifs once friends invite you to events!" />
                }
                {
                    notifObjs.map((notifObject, index) => {
                        if (notifObject.type === "friend")
                            return <FriendRequest key={index} id={notifObject.sender} />
                        else if (notifObject.type === "invite")
                            return <EventInvite
                                key={index}
                                eventId={notifObject.event}
                                senderId={notifObject.sender}
                                eventName={notifObject.eventName}
                                senderName={notifObject.senderName}
                                navigation={navigation}
                            />
                        else if (notifObject.type === "newFriend")
                            // Create new friend notif and add that here later
                            return <></>
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}