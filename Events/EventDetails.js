import React from "react";
import { SafeAreaView, ScrollView, View, Image, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from "../styles";

export default class extends React.Component {
    state = {
        id : -1,
        title : "Loading...",
        image : "https://www.usnews.com/dims4/USNEWS/74cbc08/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F59%2F0dd395ffda36a08c792a2b32303c7b%2Fcollege-photo_73.jpg",
        desc : "Loading...",
        time : "1:30 - 2:00 pm",
        loc : "Loading...",
        people : ["Archit"]
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
        this.setState(this.state);
    }

    render() {
        return (
            <SafeAreaView style = {{ minHeight: '100%' }}>
                <ScrollView>
                    <Image source = {{uri: this.state.image}} style = {styles.detailsImg} />
                    <View style = {{ flex: 1, flexDirection: 'row' }}>
                        <MaterialIcons name = {"location-pin"} size = {24} style = {{ margin: 6 }} />
                        <Text style = {styles.addressText}>{this.state.loc}</Text>
                    </View>
                    <View style = {{ flex: 1, flexDirection: 'row' }}>
                        <MaterialIcons name = {"access-time"} size = {24} style = {{ margin: 6 }} />
                        <Text style = {styles.addressText}>{this.state.time}</Text>
                    </View>
                    <Text style = {styles.title}>{this.state.title}</Text>
                    <Text style = {styles.subText}>{this.state.desc}</Text>
                    {
                        this.state.people.map((person) => {
                            return <Text key = {person} style = {styles.subText}>{person}</Text>
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}