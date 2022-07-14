import React from "react";
import Friend from "../Friends/friend"

import { Alert, Image, Platform, SafeAreaView, ScrollView, Share, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import * as Linking from 'expo-linking';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import Context from "../Context/context";
import { acceptedFlow, rejectionFlow, undoAcceptedFlow, undoRejectionFlow } from "../Helpers/eventHelperFuncs";
import { styles, windowWidth } from "../styles";
import { ReportModal } from "../Components/reportModal";

export default class extends React.Component {
    static contextType = Context

    state = {
        id: "-1",
        title: "Loading...",
        image: "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg",
        desc: "Loading...",
        startDate: new Date(),
        endDate: new Date(),
        loc: "Loading...",
        people: [],
        reporting: false,
        reportText: "",
    };

    constructor(props) {
        super(props);
        this.setReportVisible = this.setReportVisible.bind(this)
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

    setReportVisible(visible) {
        this.state.reporting = visible;
        this.setState(this.state);
    }

    isRejected() {
        return this.context.rejectedEvents.some(event => event._id === this.state.id)
    }

    isAccepted() {
        return this.context.acceptedEvents.some(event => event._id === this.state.id)
    }

    render() {
        return (
            <SafeAreaView style={styles.alignBottomContainer}>
                <ReportModal
                    eventId={this.state.id}
                    userId={this.context.id}
                    visible={this.state.reporting}
                    setVisible={this.setReportVisible}
                />
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
                    <Button
                        title={<Text style={{ color: "red" }}>Report Event</Text>}
                        onPress={() => this.setReportVisible(true)}
                        buttonStyle={{ backgroundColor: "white" }}
                    />
                    <View style={{ height: 50 }}></View>
                </ScrollView>

                <View>
                    <View style={{ flexDirection: 'row' }}>
                        {!this.isAccepted() &&
                            <TouchableOpacity
                                style={styles.rsvpNoBlock}
                                onPress={() => {
                                    if (!this.isRejected()) {
                                        rejectionFlow(this.context.id, this.state.id, this.state.title, this.context)
                                        this.setState(this.state)
                                    } else {
                                        Alert.alert("Undo event rejection?",
                                            "You will be able to RSVP to this event again after undoing your decision, if you wish to do so.", [
                                            { text: "Cancel", style: "cancel" },
                                            {
                                                text: "Confirm", onPress: () => {
                                                    undoRejectionFlow(this.context.id, this.state.id, this.state.title, this.context)
                                                    this.setState(this.state)
                                                }
                                            }
                                        ])
                                    }
                                }}
                            >
                                <Text style={{ color: 'red' }}>No thanks</Text>
                            </TouchableOpacity>
                        }
                        {!this.isRejected() &&
                            <TouchableOpacity
                                style={styles.rsvpYesBlock}
                                onPress={() => {
                                    if (!this.isAccepted()) {
                                        acceptedFlow(this.context.id, this.state.id, this.state.title, this.context)
                                        this.setState(this.state)
                                    } else {
                                        Alert.alert("Undo event accept?",
                                            "You will be able to RSVP to this event again after undoing your decision, if you wish to do so. You will also be removed from this event\'s chat", [
                                            { text: "Cancel", style: "cancel" },
                                            {
                                                text: "Confirm", onPress: () => {
                                                    undoAcceptedFlow(this.context.id, this.state.id, this.state.title, this.context)
                                                    this.setState(this.state)
                                                }
                                            }
                                        ])
                                    }
                                }}
                            >
                                <Text style={{ color: 'green' }}>Interested</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}