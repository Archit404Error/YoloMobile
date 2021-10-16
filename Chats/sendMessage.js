import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles";

async function sendMessage(message, chatId, sender) {
    fetch(`http://eventcore.herokuapp.com/sendMessage?${message}&${sender}&${chatId}`)
}

function showSend(message, chatId, sender) {
    if (message.length >= 1) {
        return (
            <TouchableOpacity onPress =  {sendMessage(message, chatId, sender)}>
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
                onSubmitEditing = {console.log("SUBMIT?!")}
                value = {message}
            />
        { showSend(message, chatId, sender) }
        </View>
    )
}