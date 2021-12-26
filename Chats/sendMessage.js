import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles";

async function sendMessage(message, chatId, sender) {
    fetch(`http://yolo-backend.herokuapp.com/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sender: sender,
            chat: chatId,
            message: message,
        })
    })
}

function showSend(message, chatId, sender, messageFunc) {
    if (message.length >= 1) {
        return (
            <TouchableOpacity onPress =  {() => {
                sendMessage(message, chatId, sender);
                messageFunc("");
            }}>
                <Ionicons name = { "send-sharp" } size = {25} style = {{ marginTop: 15 }} />
            </TouchableOpacity>
        )
    }
    return <></>
}

export default ({ chatId, sender }) => {
    const [message, setMessage] = useState("");
    return (
        <View style = {{ flexDirection: 'row' }}>
            <TextInput 
                style = { styles.chatInput } 
                placeholder = {"Send Message..."} 
                returnKeyType = {"send"} 
                onChangeText = {text => setMessage(text)}
                onSubmitEditing = {() => {
                    sendMessage(message, chatId, sender);
                    setMessage("");
                }}
                value = {message}
            />
        { showSend(message, chatId, sender, setMessage) }
        </View>
    )
}