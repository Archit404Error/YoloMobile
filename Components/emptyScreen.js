import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

export default (props) => (
    <View style={styles.emptyContainer}>
        <Text style={styles.title}>{props.header}</Text>
        <Text style={styles.subText}>{props.desc}</Text>
    </View>
)