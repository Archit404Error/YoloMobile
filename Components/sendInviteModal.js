import React, { forwardRef } from "react";
import { ScrollView, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import FriendInvitation from "../Friends/friendInvitation";
import { styles } from "../styles";

export default forwardRef((props, ref) => (
    <RBSheet
        ref={ref}
        height={600}
        openDuration={250}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        onClose={() => props.closeFunc()}
    >
        <Text style={styles.boldSectionHeader}>{props.message}</Text>
        <ScrollView>
            {props.listData.length == 0 &&
                <Text style={styles.centeredSubText}>No friends to invite</Text>
            }
            {
                props.listData.map(friendId =>
                    <FriendInvitation
                        key={friendId + "friendInvite"}
                        id={friendId}
                        eventId={props.id}
                        eventName={props.title}
                    />
                )
            }
        </ScrollView>
    </RBSheet>
)
)