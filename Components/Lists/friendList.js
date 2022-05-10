import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Friend from "../../Friends/friend";
import { styles } from "../../styles";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <Text style={styles.listHead}> Friends </Text>
                {
                    this.props.route.params.friends.map(key =>
                        <Friend key={key} id={key} isUser={true} navigation={this.props.navigation} />
                    )
                }
            </SafeAreaView>
        );
    }
}
