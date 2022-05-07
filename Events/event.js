import React from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Context from "../Context/context";
import { styles } from "../styles";
import { scheduleEvent } from "../Notifications/calendarNotif";
import { acceptedFlow, eventInteraction, rejectionFlow } from "../Helpers/eventHelperFuncs";
import InviteModal from "../Components/sendInviteModal";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        image: "http://default-image",
        title: "Loading...",
        description: "Loading...",
        location: "Loading...",
        startDate: null,
        endDate: null,
        tags: [],
        attendees: [],
        distance: 0,
        visible: true,
        timesPressed: 0
    }

    constructor(props) {
        super(props);
        this.handleAccept = this.handleAccept.bind(this)
    }

    updateSelf() {
        fetch(`http://yolo-backend.herokuapp.com/event/${this.props.id}`)
            .then(response => response.json())
            .then(res => {
                this.state.image = res.image;
                this.state.title = res.title;
                this.state.description = res.description;
                this.state.location = res.location;
                this.state.startDate = new Date(res.startDate);
                this.state.endDate = new Date(res.endDate);
                this.state.attendees = res.attendees;
                this.state.tags = res.tags;
                this.setState(this.state);
                const locUrl =
                    `http://router.project-osrm.org/route/v1/car/${this.context.longitude},${this.context.latitude};${res.longitude},${res.latitude}`;
                fetch(locUrl)
                    .then(res => res.json())
                    .then(resJson => resJson.routes[0].legs[0].distance)
                    .then(dist => 0.0006 * dist)
                    .then(miles => {
                        this.state.distance = miles;
                        this.setState(this.state);
                    })
            })
    }

    componentDidMount() {
        this.state.id = this.props.id;
        this.updateSelf()
    }

    displayDetails() {
        this.updateSelf()
        this.props.navigation.navigate("Details", {
            id: this.state.id,
            title: this.state.title,
            image: this.state.image,
            description: this.state.description,
            tags: this.state.tags,
            location: this.state.location,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            attendees: this.state.attendees
        })
    }

    handleAccept() {
        this.state.visible = false;
        this.setState(this.state);
        scheduleEvent(this.state.startDate, this.state.endDate, this.state.title);
    }

    render() {
        if (!this.state.visible) return <></>
        return (
            <SafeAreaView>
                <InviteModal
                    ref={ref => this.sendModal = ref}
                    id={this.state.id}
                    title={this.state.title}
                    message={"Invite your friends!"}
                    listData={this.context.friends}
                    closeFunc={this.handleAccept}
                />

                <View style={{ height: this.props.cardHeight, backgroundColor: 'white' }}>
                    <TouchableWithoutFeedback
                        onLongPress={() => this.displayDetails()}
                    >
                        <Image style={styles.eventImg} source={{ uri: this.state.image }} />
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.addressText}>{this.state.location}</Text>
                        <Text style={styles.addressText}>{Math.round(this.state.distance)} mi</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                        {
                            this.state.tags.map((tag, index) => {
                                return (
                                    <TouchableOpacity key={index}>
                                        <Text style={styles.tag}>{tag}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                    <TouchableOpacity onPress={() => this.displayDetails()}>
                        <Text style={styles.subText}>{this.state.description.substring(0, 75) + "...(Read More)"}</Text>
                    </TouchableOpacity>
                    <View style={styles.rsvpContainer}>
                        <TouchableOpacity style={styles.rsvpNoContainer} onPress={() => {
                            rejectionFlow(this.context.id, this.state.id, this.state.title, this.context);
                            this.state.visible = false;
                            this.setState(this.state);
                        }}>
                            <View style={styles.iconBg}>
                                <AntDesign name="closecircle" size={45} color="red" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infoContainer} onPress={
                            () => {
                                this.displayDetails();
                                eventInteraction("viewed", this.context.id, this.state.id);
                            }
                        }>
                            <View style={styles.iconBg}>
                                <AntDesign name="infocirlce" size={45} color="black" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rsvpYesContainer} onPress={
                            () => {
                                this.sendModal.open();
                                acceptedFlow(
                                    this.context.id,
                                    this.state.id,
                                    this.state.title,
                                    this.context
                                )
                            }
                        }>
                            <View style={styles.iconBg}>
                                <AntDesign name="checkcircle" size={45} color="green" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}