import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";

import { windowWidth } from '../styles';

export default class extends React.Component {
    state = {
        userName: '',
        visible: false,
        timeOpen: 0,
        interval: -1,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const checkVisible = () => {
            this.state.visible = this.props.visible;
            this.state.timeOpen = this.props.time;
            this.setState(this.state);
            fetch('http://eventcore.herokuapp.com/getUser?' + this.props.id)
            .then(res => res.json())
            .then(resJson => {
                this.state.userName = resJson[3];
                this.setState(this.state);
            })
        }
        this.state.interval = setInterval(() => checkVisible(), 10);
        this.setState(this.state);
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.visible}
            >
                <StatusBar hidden />
                <View style = {{
                        marginTop: 20,
                        borderBottomWidth: 2,
                        borderBottomColor: 'black',
                        width: windowWidth * (this.state.timeOpen / 500)
                }}></View>
                <View style = {{ alignItems: 'center' }}>
                    <Text style = {{ marginTop: 30, color: 'black' }}>{this.state.userName}</Text>
                    <Text style = {{ marginTop: 30, color: 'black' }}>Test</Text>
                    <TouchableOpacity onPress = {() => {
                        this.state.visible = false;
                        this.setState(this.state);
                    }}>
                        <Text style = {{ color: 'black' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}