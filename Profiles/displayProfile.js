/**
 * General component for rendering user or friend profiles
 */

import React from "react";
import { SafeAreaView, ScrollView, Text, Image } from "react-native"
import { styles } from "../styles";
import Friend from "../Friends/friend"
import Event from "../Events/event"

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.container}>
                    <Image style={styles.profImg} source={{ uri: this.props.profilePic }} />
                    <Text style={styles.profTitle}>{this.props.name}</Text>
                    {
                        this.props.friends.map((friendId, index) => {
                            return <Friend key={index} id={friendId} navigation={this.props.navigation} />
                        })
                    }
                    {
                        this.props.events.map((event) => {
                            return (
                                <Event key={event._id} id={event._id} />
                            )
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}