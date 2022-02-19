import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

export default () => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.title}>No chats right now!</Text>
            <Text style={styles.subText}>Join events to get started with chats.</Text>
        </View>
    )
}