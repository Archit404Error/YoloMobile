import React, { useContext } from "react";
import { View } from "react-native";
import Context from "../Context/context";
import { styles } from "../styles";
import FriendRequest from "../Notifications/request";
import EventInvite from "../Notifications/eventInvite";

export default () => {
    const context = useContext(Context);

    return (
        <View style={styles.container}>
            {
                context.notifications.map((notifObject, index) => {
                    if (notifObject.type === "friend")
                        return <FriendRequest key={index} id={notifObject.sender} />
                    else if (notifObject.type === "invite")
                        return <EventInvite
                            eventId={notifObject.event}
                            senderId={notifObject.sender}
                            eventName={notifObject.eventName}
                            senderName={notifObject.senderName}
                        />
                    else if (notifObject.type === "newFriend")
                        // Create new friend notif and add that here later
                        return <></>
                })
            }
        </View>
    )
}