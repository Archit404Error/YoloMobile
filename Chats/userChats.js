import React from "react";
import { Platform, View, ScrollView, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";

import ChatPreview from './chatPreview';
import { styles } from "../styles";

export default class extends React.Component{
    state = {
        chatIds: [],
        dispIds: [],
        filtered: "",
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const url = "http://eventcore.herokuapp.com/queryId";
        fetch(url)
        .then(res => res.json())
        .then(resJson => {
            var currids = [];
            for(let i = 1; i <= resJson; i++) {
                currids.push(i);
            }
            this.state.chatIds = currids;
            this.state.dispIds = currids;
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
                        this.state.dispIds.map(id => {
                            return <ChatPreview navigation = {this.props.navigation} id = {id} display = {this.state.filtered}/>
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}