import React from "react";
import { View, Text, Linking } from "react-native";
import { styles } from "../styles";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = { styles.container, {justifyContent: 'center'} }>
                <Text style = {styles.title}>
                    Event created!
                </Text>
            </View>
        )
    }
}