import React from "react";
import { Platform, ScrollView, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";

import ChatPreview from './chatPreview';
import Context from "../Context/context";
import { styles } from "../styles";

export default class extends React.Component{
    static contextType = Context;

    state = {
        chatData: [],
        filtered: "",
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch(`http://yolo-backend.herokuapp.com/userChats/${this.context.id}`)
            .then(res => res.json())
            .then(resJson => {
                this.state.chatData = resJson;
                this.setState(this.state);
            })
    }

    render() {
        return (
            <SafeAreaView style = {styles.fullScreenContainer}>
                <ScrollView>
                    <SearchBar
                        placeholder = "Search Chats..."
                        lightTheme = {true}
                        value = {this.state.filtered}
                        platform = {Platform.OS}
                        containerStyle = {{ height: 70 }}
                        inputContainerStyle = {{ height: 1 }}
                        onChangeText = {(text) => {
                            this.state.filtered = text;
                            this.setState(this.state);
                        }}
                        style = {{ fontSize: 15 }}
                    />
                    {
                        this.state.chatData.map((json, index) => {
                            return <ChatPreview 
                                        key = {index} 
                                        navigation = {this.props.navigation} 
                                        id = {json._id} 
                                        display = {this.state.filtered}
                                    />
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}