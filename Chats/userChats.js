import React from "react";
import { Platform, ScrollView, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";

import ChatPreview from './chatPreview';
import Context from "../Context/context";
import NoChatScreen from './emptyChat';
import { styles } from "../styles";

export default class extends React.Component {
    static contextType = Context;

    state = {
        chatData: [],
        filtered: "",
    }

    constructor(props) {
        super(props);
    }

    getLatestChats() {
        // Update context data and then re-render
        fetch(`http://yolo-backend.herokuapp.com/user/${this.context.id}`)
            .then(res => res.json())
            .then(json => this.context.modifyState(["chatIds"], [json.chats]))
            .then(() => this.setState(this.state))
            .then(() => this.context.joinChatRooms())

        fetch(`http://yolo-backend.herokuapp.com/userChats/${this.context.id}`)
            .then(res => res.json())
            .then(json => this.context.modifyState(["chatData"], [json]))
            .then(() => this.setState(this.state))
    }

    componentDidMount() {
        this.getLatestChats();
        this.context.socket.on("eventsUpdated", () => this.getLatestChats())
        this.context.socket.on("messageSent", () => this.getLatestChats())
        this.context.socket.on("appOpened", () => this.getLatestChats())
    }

    componentWillUnmount() {
        this.context.socket.off("eventsUpdated", () => this.getLatestChats())
        this.context.socket.off("messageSent", () => this.getLatestChats())
        this.context.socket.off("appOpened", () => this.getLatestChats())
    }

    render() {
        if (this.context.chatIds.length == 0) return <NoChatScreen />

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
                        this.context.chatData
                            .sort((fst, snd) => snd.lastUpdate - fst.lastUpdate)
                            .map((data, index) => {
                                return <ChatPreview
                                    key={index}
                                    navigation={this.props.navigation}
                                    id={data._id}
                                    read={data.members.find(mem => JSON.stringify(mem._id) == JSON.stringify(this.context.id)).read}
                                    display={this.state.filtered}
                                />
                            })
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}