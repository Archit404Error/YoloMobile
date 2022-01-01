import React from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import Context from "../Context/context";

import Friend from './friend';
import Story from './storyPreview';
import UploadStory from "./uploadStory";

export default class extends React.Component {
    static contextType = Context;

    state = {
        friends: [],
        stories: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ friends: this.context.friends })
        fetch(`http://yolo-backend.herokuapp.com/storyIds/${this.context.id}`)
            .then(resp => resp.json())
            .then(res => {
                this.state.stories = res;
                this.setState(this.state);
            })
    }

    render() {
        return (
            <View style = {{flex: 1}}>
                <SafeAreaView>
                    <ScrollView horizontal = {true}>
                        <UploadStory />
                        {
                            this.state.stories.map((storyObj, index) => {
                                return (
                                    <Story key = {index} id = {storyObj._id} image = {storyObj.storyImage} />
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