import React from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../styles";

export default () => {
    return (
        <View style = {styles.fullScreenContainer}>
            <View style = {{ alignItems: 'center' }}>
                <Text style = {styles.title}>Register</Text>
                <Input placeholder = "Name" />
                <Input placeholder = "Username" />
                <Input placeholder = "Password" />
                <Button 
                    title = {"Register"}
                    buttonStyle = {styles.confirmButton} 
                />
            </View>
        </View>
    )
}