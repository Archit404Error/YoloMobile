import React from "react";
import { SafeAreaView, ScrollView, Text, Image } from "react-native"
import { styles } from "../styles";
import Friend from "../Friends/friend"
import Event from "../Events/event"

export default class extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            events: this.props.events,
            friends: this.props.friends,
            profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        }
    }

    render() {
        console.log(this.state)
        return (
            <SafeAreaView>
                <ScrollView style = {styles.container}>
                    <Image style = {styles.profImg} source = {{uri: this.state.profPic}} />
                    <Text style = {styles.profTitle}>{this.state.name}</Text>
                    {
                        this.state.friends.map((friendId, index) => {
                            return <Friend key = {index} id = {friendId} />
                        })
                    }
                    {
                        this.state.events.map((eventId) => {
                            return (
                                <Event id = {eventId} />
                            )
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}