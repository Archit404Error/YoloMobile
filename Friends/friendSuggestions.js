import React from "react";
import { Text, View } from "react-native";

import Friend from './friend';

export default class extends React.Component {
    state = {
        friends: [1, 1, 1]
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const url = "http://tobeinserted";
        fetch(url)
        .then(res => res.json())
        .then(resJson => {
            this.state.friends = resJson["suggestions"];
            this.setState(this.state);
        })
    }

    render() {
        return (
            <View style = {{flex: 1}}>
                { 
                    this.state.friends.map((id, index) => {
                        return (
                            <Friend key = {index} id = {id} navigation = {this.props.navigation} />
                        );
                    })
                }
            </View>
        );
    }
}