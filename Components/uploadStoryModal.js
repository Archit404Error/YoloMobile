import React, { forwardRef } from "react";
import { ScrollView, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CondensedEvent from "../Events/condensedEvent";
import { styles } from "../styles";

export default forwardRef((props, ref) => (
    <RBSheet
        ref={ref}
        height={300}
        openDuration={250}
        closeOnDragDown={true}
    >
        <Text style={styles.title}>Choose Event Story to add to</Text>
        <ScrollView>
            {
                props.listData.map(eventId =>
                    <CondensedEvent
                        key={eventId}
                        id={eventId}
                        customPressFunc={() => props.upload(eventId)}
                    />
                )
            }
        </ScrollView>
    </RBSheet>
)
)