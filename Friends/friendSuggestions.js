import React from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";

import Friend from './friend';
import Story from './story';

export default class extends React.Component {
    state = {
        friends: [1, 2, 3]
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
                <SafeAreaView>
                    <ScrollView horizontal = {true}>
                        {
                            this.state.friends.map((id, index) => {
                                return (
                                    <Story key = {index} id = {id} />
                                )
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
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