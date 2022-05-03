import React from "react";
import { SafeAreaView, ScrollView, KeyboardAvoidingView, View, Text, Image } from "react-native";
import { styles } from "../styles";
import SendMessage from "./sendMessage";
import Context from "../Context/context";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        title: "",
        messages: [],
        memberDetails: [],
        name: "",
        handler: -1,
        lastSender: "",
    }

    constructor(props) {
        super(props);
    }

    handleChatUpdate = (chatId) => {
        if (chatId == this.state.id) {
            fetch(`http://yolo-backend.herokuapp.com/chatDetails/${this.state.id}`)
                .then(response => response.json())
                .then(res => {
                    this.state.messages = res.messages;
                    this.state.memberDetails = res.members;
                    this.setState(this.state);
                })
        }
    }

    getMemberImage = (user) => {
        const membData = this.state.memberDetails.find(membObj =>
            membObj.username === user
        )

        return membData.profilePic
    }

    componentDidMount() {
        this.state.id = this.props.route.params.id;
        this.state.title = this.props.route.params.title;
        this.state.messages = this.props.route.params.messages;
        this.state.memberDetails = this.props.route.params.members;
        this.state.name = this.context.username;
        this.setState(this.state);
        this.context.socket.on("messageSent", this.handleChatUpdate);
        this.context.socket.on("appOpened", this.handleChatUpdate);
    }

    componentWillUnmount() {
        this.context.socket.off("messageSent", this.handleChatUpdate);
        this.context.socket.off("appOpened", this.handleChatUpdate);
    }

    render() {
        return (
            <>
                <SafeAreaView style={styles.alignBottomContainer}>
                    <ScrollView
                        ref={ref => { this.scrollView = ref }}
                        onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
                        style={styles.messageScrollView}>
                        {
                            this.state.messages.map((messageObj, index) => {
                                let sender = messageObj.sender;
                                return (
                                    <View style={{ flexDirection: sender == this.state.name ? 'row-reverse' : 'row' }}>
                                        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                                            {this.state.lastSender != sender &&
                                                <Image
                                                    source={{ uri: this.getMemberImage(sender) }}
                                                    style={{ width: 35, height: 35, borderRadius: 35 }}
                                                />
                                            }
                                        </View>
                                        <View key={index} style={styles.chatMessageContainer}>
                                            {
                                                (() => {
                                                    if (this.state.lastSender != sender) {
                                                        this.state.lastSender = sender;
                                                        if (index == this.state.messages.length)
                                                            this.state.lastSender = ""
                                                        return (
                                                            <View style={sender == this.state.name ? styles.userChatName : styles.otherUserChatName}>
                                                                <Text>{sender}</Text>
                                                            </View>
                                                        )
                                                    }
                                                })()
                                            }
                                            <View style={sender == this.state.name ? styles.userChatMessage : styles.chatMessage}>
                                                <Text style={sender == this.state.name ? { color: 'white' } : { color: 'black' }}>
                                                    {messageObj.message}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
                <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={90} style={{ backgroundColor: 'white' }}>
                    <SendMessage
                        chatId={this.state.id}
                        chatName={this.state.title}
                        sender={this.context.username}
                    />
                </KeyboardAvoidingView>
            </>
        )
    }
}