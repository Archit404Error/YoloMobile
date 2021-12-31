import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles";

async function sendMessage(message, chatId, sender, socket) {
    const messageData = {
        sender: sender,
        chat: chatId,
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

function showSend(message, chatId, sender, messageFunc, socket) {
    if (message.length >= 1) {
        return (
            <TouchableOpacity onPress =  {() => {
                sendMessage(message, chatId, sender, socket);
                messageFunc("");
            }}>
                <Ionicons name = { "send-sharp" } size = {25} style = {{ marginTop: 15 }} />
            </TouchableOpacity>
        )
    }
    return <></>
}

export default ({ chatId, sender, socket }) => {
    const [message, setMessage] = useState("");
    return (
        <View style = {{ flexDirection: 'row' }}>
            <TextInput 
                style = { styles.chatInput } 
                placeholder = {"Send Message..."} 
                returnKeyType = {"send"} 
                onChangeText = {text => setMessage(text)}
                onSubmitEditing = {() => {
                    sendMessage(message, chatId, sender, socket);
                    setMessage("");
                }}
                value = {message}
            />
        { showSend(message, chatId, sender, setMessage, socket) }
        </View>
    )
}