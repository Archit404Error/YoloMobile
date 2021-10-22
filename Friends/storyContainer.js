import React from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";

export default class extends React.Component {
    state = {
        visible: false,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.state.visible = this.props.visible;
        this.setState(this.state);
    }
    
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <Text>Test</Text>
            </Modal>
        )
    }
}