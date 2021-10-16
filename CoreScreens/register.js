import React from "react";
import { View, Text } from "react-native";
import { Input } from "react-native-elements";
import { styles } from "../styles";

export default () => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Register</Text>
            <Input placeholder = "Name" />
        </View>
    )
}