import React, { useState } from "react";
import { Modal, TextInput, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { DoneWrapper, doneWrapperId } from "./inputWrappers";
import { EvilIcons } from "@expo/vector-icons";
import { screenHeight, styles } from "../styles";

export const ReportModal = ({ eventId, userId, visible, setVisible }) => {
    const [reportText, setReportText] = useState("");

    return (
        <Modal animationType={"fade"} transparent visible={visible}>
            <View style={[styles.modalView, {marginTop: screenHeight / 3, alignItems: "center"}]}>
                <EvilIcons 
                    name="close" 
                    size={25} 
                    color="orange" 
                    onPress={() => setVisible(false)}
                    style={{alignSelf: "flex-start"}}
                />
                <Text style={[styles.boldSubHeader, {alignSelf: "center", marginBottom: 5}]}>Report Event</Text>
                <TextInput
                    multiline
                    onChangeText={setReportText}
                    placeholder="Enter reason for report..."
                    style={[styles.titleInput, {alignSelf: "center", marginBottom: 10}]}
                    inputAccessoryViewID={doneWrapperId}
                />
                <Button
                    title={<Text style={{color: "orange"}}>Submit</Text>}
                    onPress={() => {
                        setVisible(false)
                        fetch(`http://yolo-backend.herokuapp.com/report`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                event: eventId,
                                user: userId,
                                reason: reportText
                            })
                        })
                        showMessage({
                            message: "Report submitted.",
                            type: "success",
                        });
                    }}
                    buttonStyle={{backgroundColor: "white", alignSelf: "center"}}
                />
            </View>
            <DoneWrapper />
        </Modal>
    )
}