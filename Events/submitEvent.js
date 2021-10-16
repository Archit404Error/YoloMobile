import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

export default class extends React.Component {
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
        const url = "http://eventcore.herokuapp.com/addEvent?" + this.props.route.params.img + "&" +
        this.props.route.params.title + "&" + this.props.route.params.desc + "&" +
        this.props.route.params.loc + "&" + this.props.route.params.other;
        fetch(url)
        .then(() => { this.state.image = this.props.route.params.img; })
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