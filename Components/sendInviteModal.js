import React, { forwardRef } from "react";
import { ScrollView, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import FriendInvitation from "../Friends/friendInvitation";
import { styles } from "../styles";

export default forwardRef((props, ref) => (
    <RBSheet
        ref={ref}
        height={300}
        openDuration={250}
        closeOnDragDown={true}
        onClose={() => props.closeFunc()}
    >
        <Text style={styles.title}>{props.message}</Text>
        <ScrollView>
            {
                props.listData.map(friendId =>
                    <FriendInvitation
                        key={friendId}
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