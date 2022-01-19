import React, { useContext, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles";
import Context from "../Context/context";

async function sendMessage(message, chatId, chatName, sender, socket) {
    const messageData = {
        sender: sender,
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
        .then(res => {
            socket.emit("messageSent", messageData)
        })
}

function showSend(message, chatId, chatName, sender, messageFunc, socket) {
    if (message.length >= 1) {
        return (
            <TouchableOpacity onPress =  {() => {
                sendMessage(message, chatId, chatName, sender, socket);
                messageFunc("");
            }}>
                <Ionicons name = { "send-sharp" } size = {25} style = {{ marginTop: 15 }} />
            </TouchableOpacity>
        )
    }
    return <></>
}

export default ({ chatId, chatName, sender }) => {
    const [message, setMessage] = useState("");
    const context = useContext(Context);
    return (
        <View style = {{ flexDirection: 'row' }}>
            <TextInput 
                style = { styles.chatInput } 
                placeholder = {"Send Message..."} 
                returnKeyType = {"send"} 
                onChangeText = {text => setMessage(text)}
                onSubmitEditing = {() => {
                    sendMessage(message, chatId, chatName, sender, context.socket);
                    setMessage("");
                }}
                value = {message}
            />
        { showSend(message, chatId, chatName, sender, setMessage, context.socket) }
        </View>
    )
}