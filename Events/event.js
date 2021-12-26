import React from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Context from "../Context/context";
import { styles } from "../styles";
import { scheduleEvent } from "./calendarNotif";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        image: "http://default-image",
        title: "default event",
        description: "default description",
        location: "6969 Test Drive",
        tags: [],
        attendees: [],
        distance: 0,
        visible: true,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.props.id;
        fetch(`http://yolo-backend.herokuapp.com/event/${this.props.id}`)
        .then(response => response.json())
        .then(res => {
            this.state.image = res.image;
            this.state.title = res.title;
            this.state.description = res.description;
            this.state.location = res.location;
            this.state.attendees = res.attendees;
            this.state.tags = res.tags.split(", ");
            const locUrl = 
                `http://router.project-osrm.org/route/v1/car/${this.context.longitude},${this.context.latitude};${res.longitude},${res.latitude}`;
            fetch (locUrl)
            .then(res => res.json())
            .then(resJson => resJson.routes[0].legs[0].distance)
            .then(dist => 0.0006 * dist)
            .then(miles => {
                this.state.distance = miles;
                this.setState(this.state);
            })
        })
    }

    visibilityMutated(action) {
        this.state.visible = false;
        this.setState(this.state);
        fetch("http://yolo-backend.herokuapp.com/eventRSVP", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.context.id,
                event: this.state.id,
                action: action
            })
        })
    }

    render() {
        if (!this.state.visible) {
            return (
                <>
                </>
            )
        }
        return (
            <SafeAreaView>
                <View style = {styles.container}>
                    <Image style = {styles.eventImg} source = {{ uri: this.state.image }} />
                    <Text style = {styles.title}>{this.state.title}</Text>
                    <View style = {{ flexDirection: 'row' }}>
                        <Text style = {styles.addressText}>{this.state.location}</Text>
                        <Text style = {styles.addressText}>{Math.round(this.state.distance)} mi</Text>
                    </View>
                    <View style = {{ flex: 1, flexDirection: 'row', marginLeft: 8 }}>
                        {
                            this.state.tags.map((tag, index) => {
                                return (
                                    <TouchableOpacity key = {index}>
                                        <Text style = {styles.tag}>{tag}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                    <TouchableOpacity onPress = {
                        () => {
                            this.props.navigation.navigate("Details", {
                                id: this.state.id,
                                title: this.state.title,
                                image: this.state.image,
                                description: this.state.description,
                                tags: this.state.tags,
                                location: this.state.location,
                                attendees: this.state.attendees
                            })
                        }
                    }>
                        <Text style = {styles.subText}>{this.state.description.substr(0, 75) + "...(Read More)"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rsvpNoContainer} onPress = { () => { this.visibilityMutated("rejected") } }>
                        <View style = {styles.iconBg}>
                            <AntDesign name="closecircle" size={45} color="red" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoContainer} onPress = { 
                        () => { 
                            this.props.navigation.navigate("Details", {
                                id: this.state.id,
                                title: this.state.title,
                                image: this.state.image,
                                description: this.state.description,
                                tags: this.state.tags,
                                location: this.state.location,
                                attendees: this.state.attendees
                            }) 
                        } 
                    }>
                        <View style = {styles.iconBg}>
                            <AntDesign name="infocirlce" size={45} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rsvpYesContainer} onPress = { 
                        () => { 
                            scheduleEvent('D52B918A-9B75-414E-82AF-0AF94768A385', Date.now(), new Date('2021-12-21T20:24:00'), this.state.title)
                            this.visibilityMutated("accepted") 
                        } 
                    }>
                        <View style = {styles.iconBg}>
                            <AntDesign name="checkcircle" size={45} color="green" />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}