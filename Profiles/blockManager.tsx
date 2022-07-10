import React, { useContext } from "react";
import Context from "../Context/context";
import { Modal, ScrollView, View } from "react-native";
import { BlockedUser } from "./blockedUser";
import { styles } from "../styles";

export const BlockManager = ({ visible }) => {
    const context: any = useContext(Context);
    console.log(visible);

    return (
        <Modal
            animationType="slide"
            visible={visible}
        >
            <ScrollView>
                <View style={styles.modalView}>
                {
                    context.blockedUsers.map(blockedId => <BlockedUser key={blockedId} id={blockedId}/>)
                }
                </View>
            </ScrollView>
        </Modal>
    )
}