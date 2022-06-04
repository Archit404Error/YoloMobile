import React from "react";
import { Text, SafeAreaView, ScrollView } from "react-native";
import Friend from "../../Friends/friend";
import { styles } from "../../styles";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Text style={styles.listHead}> Friends </Text>
                    {
                        this.props.route.params.friends.map(key =>
                            <Friend key={key} id={key} isUser={true} navigation={this.props.navigation} />
                        )
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}
