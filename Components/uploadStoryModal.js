import React, { forwardRef } from "react";
import { ScrollView, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CondensedEvent from "../Events/condensedEvent";
import { styles, screenHeight } from "../styles";

export default forwardRef((props, ref) => (
    <RBSheet
        ref={ref}
        animationType="slide"
        height={screenHeight - 100}
        openDuration={250}
        closeOnDragDown={false}
    >
        <Text style={styles.title}>Choose Event Story to add to</Text>
        <ScrollView persistentScrollbar>
            {
                props.listData.map(eventId =>
                    <CondensedEvent
                        key={eventId + "uploadStoryChoice"}
                        id={eventId}
                        customPressFunc={() => props.upload(eventId)}
                    />
                )
            }
        </ScrollView>
    </RBSheet>
)
)