import React from "react";
import Friend from "../Friends/friend"

import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity, Share, Platform } from "react-native";
import * as Linking from 'expo-linking';
import { MaterialIcons, Feather } from '@expo/vector-icons';

import Context from "../Context/context";
import { acceptedFlow, rejectionFlow } from "../Helpers/eventHelperFuncs";
import { styles, windowWidth } from "../styles";

export default class extends React.Component {
    static contextType = Context

    state = {
        id: -1,
        title: "Loading...",
        image: "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg",
        desc: "Loading...",
        startDate: new Date(),
        endDate: new Date(),
        loc: "Loading...",
        people: []
    };

    constructor(props) {
        super(props);
    }

    static getDerivedStateFromProps(props, state) {
        let newState = {}
        newState.id = props.id;
        newState.title = props.title;
        newState.image = props.image;
        newState.desc = props.description;
        newState.startDate = props.startDate;
        newState.endDate = props.endDate;
        newState.loc = props.location;
        newState.people = props.attendees;
        return newState
    }


    /**
     * @returns this component's start and end dates formatted like start-end (or just start date if they're the same)
     */
    getDates() {
        const startDay = this.state.startDate.toDateString();
        const endDay = this.state.endDate.toDateString();
        return startDay == endDay ? startDay : `${startDay} - ${endDay}`;
    }

    /**
     * Helper method for getHours() that formats each given date correctly
     * @param {Date} date the object to format
     * @returns date in am/pm format (ex: 7:15pm)
     */
    formatHours(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    /**
     * Returns this event's hours in am/pm formatted time
     */
    getHours() {
        return `${this.formatHours(this.state.startDate)} - ${this.formatHours(this.state.endDate)}`
    }

    /**
     * Creates an event link for this event and allows user to share it
     */
    shareEventLink() {
        const eventUrl = Linking.createURL(`/event/${this.state.id}`)
        try {
            if (Platform.OS == "ios")
                Share.share({ url: eventUrl })
            else
                Share.share({ message: eventUrl })
        } catch (err) {
            alert(err.message);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.alignBottomContainer}>
                <ScrollView>
                    <Image source={{ uri: this.state.image }} style={styles.detailsImg} />
                    <View style={{ flexDirection: 'row', maxWidth: windowWidth - 40 }}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <TouchableOpacity onPress={() => this.shareEventLink()} style={{ marginTop: 40 }}>
                            <Feather name={"external-link"} size={20} color="blue" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.subText}>{this.state.desc}</Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <MaterialIcons name={"location-pin"} size={24} style={{ margin: 6 }} />
                        <Text style={styles.addressText}>{this.state.loc}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <MaterialIcons name={"calendar-today"} size={24} style={{ margin: 6 }} />
                        <Text style={styles.addressText}>
                            {this.getDates()}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <MaterialIcons name={"access-time"} size={24} style={{ margin: 6 }} />
                        <Text style={styles.addressText}>
                            {this.getHours()}
                        </Text>
                    </View>
                    <Text style={styles.title}>Attendees</Text>
                    {
                        this.state.people.map((id) => {
                            return <Friend isUser={false} key={id} id={id} navigation={this.props.navigation} />
                        })
                    }
                    <View style={{ height: 50 }}></View>
                </ScrollView>
                {!(this.state.people.includes(this.context.id)) && <View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.rsvpNoBlock}
                            onPress={() => rejectionFlow(this.context.id, this.state.id, this.state.title, this.context)}
                        >
                            <Text style={{ color: 'red' }}>No thanks</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rsvpYesBlock}
                            onPress={
                                () => acceptedFlow(
                                    this.context.id,
                                    this.state.id,
                                    this.state.title,
                                    this.context
                                )
                            }
                        >
                            <Text style={{ color: 'green' }}>Interested</Text>
                        </TouchableOpacity>
                    </View>
                </View>}

            </SafeAreaView>
        )
    }
}