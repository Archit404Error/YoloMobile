import React from "react";
import { View, Text } from "react-native";
import Context from '../Context/context';
import { styles } from "../styles";

export default class extends React.Component {

    static contextType = Context;

    state = {
        image: "",
        title: "Loading...",
        text: "Loading...",
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Need to figure out how to upload local image to DB
        const url = "http://eventcore.herokuapp.com/addEvent?" + this.context.eventDetails.image + "&" +
        this.context.eventDetails.title + "&" + this.context.eventDetails.description + "&" +
        this.context.eventDetails.location + "&" + this.context.eventDetails.other;
        fetch(url)
        .then(() => { this.state.image = this.context.eventDetails.other; })
    }

    render() {
        return (
            <View style = { styles.container }>
                <Text>
                    {this.state.image == "" && this.state.title}
                    {this.state.image != "" && "Uploaded!"}
                </Text>
            </View>
        )
    }
}