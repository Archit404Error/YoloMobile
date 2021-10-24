import React from "react";
import { SafeAreaView, ScrollView, Text, Image } from "react-native"
import { styles } from "../styles";
import Friend from "../Friends/friend"
import Event from "../Events/event"

export default class extends React.Component {

    state = {
        id: -1,
        name: 'Sample User',
        events: [],
        friends: [],
        profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        interval: 0,
    }


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const update = () => {
            if (this.state.id != -1) {
                clearInterval(this.state.interval)
                return
            }
            this.state.id = this.props.id;
            this.state.name = this.props.name;
            this.state.events = this.props.events;
            this.state.friends = this.props.friends;
            this.setState(this.state);
        };
        this.state.interval = setInterval(update, 100);
        this.setState(this.state);
    }

    render() {
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
                                <Event key = {eventId} id = {eventId} />
                            )
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}