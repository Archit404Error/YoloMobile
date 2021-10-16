import React from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Context from "../Context/context";
import { styles } from "../styles";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        image: "http://default-image",
        title: "default event",
        description: "default description",
        location: "6969 Test Drive",
        tags: [],
        distance: 0,
        visible: true,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.props["id"];
        this.setState(this.state);

        var url = 'http://eventcore.herokuapp.com/query';
        fetch(url)
        .then(response => response.json())
        .then((resList) => {
            resList = resList[this.state.id - 1];
            this.state.image = resList[1];
            this.state.title = resList[2];
            this.state.description = resList[3];
            this.state.location = resList[4];
            this.state.tags = resList[5].split(", ");
            this.setState(this.state);
            const locUrl = `http://eventcore.herokuapp.com/distance?${this.context.latitude}&${this.context.longitude}&${this.state.id}`;
            fetch(locUrl)
            .then(res => res.json())
            .then(resJson => {
                this.state.distance = resJson.distance;
                this.setState(this.state);
            })

        })

    }

    visibilityMutated(action) {
        this.state.visible = false;
        this.setState(this.state);
        const url = "http://eventcore.herokuapp.com/Archit+Mehta&" + action + "&Pending&" + this.state.id;
        // fetch(url);
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
                            })
                        }
                    }>
                        <Text style = {styles.subText}>{this.state.description.substr(0, 75) + "...(Read More)"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rsvpNoContainer} onPress = { () => { this.visibilityMutated("Rejected") } }>
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
                            }) 
                        } 
                    }>
                        <View style = {styles.iconBg}>
                            <AntDesign name="infocirlce" size={45} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rsvpYesContainer} onPress = { () => { this.visibilityMutated("Accepted") } }>
                        <View style = {styles.iconBg}>
                            <AntDesign name="checkcircle" size={45} color="green" />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}