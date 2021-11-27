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
                <ScrollView style = {styles.container}>
                    <Image style = {styles.profImg} source = {{uri: this.props.profilePic}} />
                    <Text style = {styles.profTitle}>{this.props.name}</Text>
                    {
                        this.props.friends.map((friendId, index) => {
                            return <Friend key = {index} id = {friendId} />
                        })
                    }
                    {
                        this.props.events.map((eventId) => {
                            return (
                                <Event key = {eventId} id = {eventId} />
                            )
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}