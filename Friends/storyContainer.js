import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, View, Modal, TouchableOpacity } from "react-native";
import Context from "../Context/context";
import { EvilIcons } from "@expo/vector-icons"
import { styles } from "../styles";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        visible: false,
        closing: false,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.state.id = this.props.id;
        this.state.visible = this.props.visible;
        this.setState(this.state);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.closing) {
            state.closing = false;
            return state;
        }
        state.visible = props.visible;
        return state;
    }
    
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.visible}
            >
                <StatusBar hidden />
                <View style = {{ alignItems: 'flex-end', marginRight: 10, marginTop: 10 }}>
                    <TouchableOpacity onPress = {() => {
                        this.state.visible = false;
                        this.state.closing = true;
                        this.setState(this.state);
                    }}>
                        <EvilIcons name="close" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <Image source = {{ uri: this.props.image }} style = {styles.storyContent} />
            </Modal>
        )
    }
}