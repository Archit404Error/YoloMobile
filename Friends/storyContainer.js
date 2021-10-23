import React from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";

import { windowWidth } from '../styles';

export default class extends React.Component {
    state = {
        visible: false,
        interval: -1,
        timeOpen: 0,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const checkVisible = () => {
            if (this.state.visible){ 
                this.state.timeOpen++;
                if (this.state.timeOpen >= 100)
                    this.state.visible = false;
                this.setState(this.state);
            } else {
                this.state.visible = this.props.visible;
                this.setState(this.state);
            }
        }
        this.state.interval = setInterval(checkVisible, 100);
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
                <View style = {{ alignItems: 'center' }}>
                    <View style = {{
                        borderBottomWidth: 10,
                        borderBottomColor: 'black',
                        width: windowWidth * (this.state.timeOpen / 100)
                    }}></View>
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