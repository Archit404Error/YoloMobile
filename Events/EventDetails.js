import React from "react";
import Friend from "../Friends/friend"

import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { styles, windowHeight, windowWidth } from "../styles";

export default class extends React.Component {
    state = {
        id : -1,
        title : "Loading...",
        image : "https://www.usnews.com/dims4/USNEWS/74cbc08/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F59%2F0dd395ffda36a08c792a2b32303c7b%2Fcollege-photo_73.jpg",
        desc : "Loading...",
        time : "1:30 - 2:00 pm",
        loc : "Loading...",
        people : []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.props.id;
        this.state.title = this.props.title;
        this.state.image = this.props.image;
        this.state.desc = this.props.description;
        this.state.loc = this.props.location;
        this.state.people = this.props.attendees;
        this.setState(this.state);
    }

    render() {
        return (
            <SafeAreaView style = {styles.container}>
                <ScrollView>
                    <Image source = {{uri: this.state.image}} style = {styles.detailsImg} />
                    <Text style = {styles.title}>{this.state.title}</Text>
                    <Text style = {styles.subText}>{this.state.desc}</Text>
                    <View style = {{ flex: 1, flexDirection: 'row' }}>
                        <MaterialIcons name = {"location-pin"} size = {24} style = {{ margin: 6 }} />
                        <Text style = {styles.addressText}>{this.state.loc}</Text>
                    </View>
                    <View style = {{ flex: 1, flexDirection: 'row' }}>
                        <MaterialIcons name = {"access-time"} size = {24} style = {{ margin: 6 }} />
                        <Text style = {styles.addressText}>{this.state.time}</Text>
                    </View>
                    <Text style = {styles.title}>Attendees</Text>
                    {
                        this.state.people.map((id) => {
                            return <Friend key = {id} id = {id} navigation = {this.props.navigation} />
                        })
                    }
                    <View style = {{ height: 50 }}></View>
                </ScrollView>
                <View style = {{ position: 'absolute', top: windowHeight - 150 }}>
                    <View style = {{ flexDirection: 'row' }}>
                        <TouchableOpacity style = {styles.rsvpNoBlock}>
                            <Text style = {{ color: 'white' }}>No thanks</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.rsvpYesBlock}>
                            <Text style = {{ color: 'white' }}>Interested</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}