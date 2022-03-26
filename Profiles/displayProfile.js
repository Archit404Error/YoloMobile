/**
 * General component for rendering user or friend profiles
 */

import React from "react";
import { SafeAreaView, ScrollView, Text, Image, View, TouchableOpacity } from "react-native"
import { styles } from "../styles";
import Friend from "../Friends/friend"
import CondensedEvent from "../Events/condensedEvent";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <Image style={styles.profImg} source={{ uri: this.props.profilePic }} />
                    <Text style={styles.profTitle}>{this.props.name}</Text>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                        <TouchableOpacity style={styles.paddedFlexContainer}>
                            <Text style={styles.centeredSubHeader}>
                                {this.props.friends.length}
                            </Text>
                            <Text style={{ alignSelf: 'center', fontSize: 18 }}>Friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paddedFlexContainer}>
                            <Text style={styles.centeredSubHeader}>
                                {this.props.events.length}
                            </Text>
                            <Text style={{ alignSelf: 'center', fontSize: 18 }}>Attended</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 10, marginTop: 10 }}>
                        <Text style={styles.boldSubHeader}>Upcoming Events</Text>
                        {
                            this.props.events.map(event =>
                                <CondensedEvent key={event._id} id={event._id} navigation={this.props.navigation} />
                            )
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}