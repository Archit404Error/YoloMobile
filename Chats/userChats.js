import React from "react";
import { Platform, ScrollView, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";

import ChatPreview from './chatPreview';
import Context from "../Context/context";
import { styles } from "../styles";

export default class extends React.Component {
    static contextType = Context;

    state = {
        chatData: [],
        filtered: "",
    }

    getLatestChats() {
        // Update context data and then re-render
        fetch(`http://yolo-backend.herokuapp.com/user/${this.context.id}`)
            .then(res => res.json())
            .then(json => this.context.modifyState(["chatIds"], [json.chats]))
            .then(() => this.setState(this.state))
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getLatestChats();
        this.context.socket.on("eventsUpdated", () => this.getLatestChats())
    }

    componentWillUnmount() {
        this.context.socket.off("eventsUpdated", () => this.getLatestChats())
    }

    render() {
        return (
            <SafeAreaView style={styles.fullScreenContainer}>
                <ScrollView>
                    <SearchBar
                        placeholder="Search Chats..."
                        lightTheme={true}
                        value={this.state.filtered}
                        platform={Platform.OS}
                        containerStyle={{ height: 70 }}
                        inputContainerStyle={{ height: 1 }}
                        onChangeText={(text) => {
                            this.state.filtered = text;
                            this.setState(this.state);
                        }}
                        style={{ fontSize: 15 }}
                    />
                    {
                        this.context.chats.map((id, index) => {
                            return <ChatPreview
                                key={index}
                                navigation={this.props.navigation}
                                id={id}
                                display={this.state.filtered}
                            />
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}