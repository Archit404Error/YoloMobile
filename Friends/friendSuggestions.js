import React from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import Context from "../Context/context";

import Friend from './friend';
import Story from './storyPreview';
import UploadStory from "./uploadStory";

export default class extends React.Component {
    static contextType = Context;

    state = {
        friends: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ friends: this.context.friends })
    }

    render() {
        return (
            <View style = {{flex: 1}}>
                <SafeAreaView>
                    <ScrollView horizontal = {true}>
                        <UploadStory />
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