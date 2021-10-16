import React from "react";
import { Text, View, ScrollView, SafeAreaView, Image } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import Friend from '../Friends/friend';
import Event from '../Events/event';
import { styles } from "../styles";

import Context from '../Context/context';

export default class extends React.Component {

    static contextType = Context;

    state = {
        id : -1,
        name: 'Sample Name',
        profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        friends: [],
        events: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.context.id;
        this.state.name = this.context.fullName;
        this.state.events = this.context.events.split(", ");
        this.setState(this.state);
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style = {styles.container}>
                    <Image style = {styles.profImg} source = {{uri: this.state.profPic}} />
                    <Text style = {styles.profTitle}>{this.state.name}</Text>
                    {
                        this.state.friends.map((friendId) => {
                            return <Friend id = {friendId} />
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