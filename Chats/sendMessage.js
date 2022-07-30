import React, { useContext, useState } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles";
import Context from "../Context/context";

async function sendMessage(message, chatId, chatName, sender, senderPic, socket) {
    if (message.trim() == "") {
        Alert.alert("You cannot send empty messages!")
        return;
    }
    const messageData = {
        sender: sender,
        senderPic: senderPic,
        chat: chatId,
        title: chatName,
        message: message,
    };
    fetch(`http://yolo-backend.herokuapp.com/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    })
        .then(_ => {
            socket.emit("messageSent", messageData)
        })
}

function showSend(message, chatId, chatName, sender, senderPic, messageFunc, socket) {
    if (message.length >= 1) {
        return (
            <TouchableOpacity onPress={() => {
                sendMessage(message, chatId, chatName, sender, senderPic, socket);
                messageFunc("");
            }}>
                <Ionicons name={"send-sharp"} size={25} style={{ marginTop: 15 }} />
            </TouchableOpacity>
        )
    }
    return <></>
}

export default ({ chatId, chatName, sender, senderPic, adminOnly }) => {
    const [message, setMessage] = useState("");
    const context = useContext(Context);
    const canSend = adminOnly ? sender === context.fullName : true;
    return (
        <View style={{ flexDirection: 'row' }}>
            <TextInput
                style={styles.chatInput}
                editable={canSend}
                selectTextOnFocus={canSend}
                placeholder={"Send Message..."}
                returnKeyType={"send"}
                enablesReturnKeyAutomatically
                onChangeText={text => setMessage(text)}
                onSubmitEditing={() => {
                    sendMessage(message, chatId, chatName, sender, senderPic, context.socket);
                    setMessage("");
                }}
                value={message}
            />
            {showSend(message, chatId, chatName, sender, senderPic, setMessage, context.socket)}
        </View>
    )
}