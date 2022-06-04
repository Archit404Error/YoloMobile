import React from "react";
import CondensedEvent from "../../Events/condensedEvent";
import { Text, SafeAreaView, ScrollView } from "react-native";
import { styles } from "../../styles";

export default class extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (

            <SafeAreaView>
                <ScrollView>
                    <Text style={styles.listHead}> Events </Text>
                    {

                        this.props.route.params.events.map(event =>
                            <CondensedEvent key={event._id} id={event._id} navigation={this.props.navigation} />
                        )
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}
