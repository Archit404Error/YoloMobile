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
                        this.context.chats.map((id, index) => {
                            return <ChatPreview 
                                        key = {index} 
                                        navigation = {this.props.navigation} 
                                        id = {id} 
                                        display = {this.state.filtered}
                                    />
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}