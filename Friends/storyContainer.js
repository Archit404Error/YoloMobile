import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import context from "../Context/context";
import Context from "../Context/context";

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
                animationType="fade"
                transparent={false}
                visible={this.state.visible}
            >
                <StatusBar hidden />
                <View style = {{ alignItems: 'center' }}>
                    <Text style = {{ marginTop: 30, color: 'black' }}>{this.context.name}</Text>
                    <TouchableOpacity onPress = {() => {
                        this.state.visible = false;
                        this.state.closing = true;
                        this.setState(this.state);
                    }}>
                        <Text style = {{ color: 'black' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}