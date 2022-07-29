import React from "react";
import { SafeAreaView, ScrollView, KeyboardAvoidingView, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"
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
        adminOnly: false
    }

    constructor(props) {
        super(props);
    }

    updateSelf = () => {
        fetch(`http://yolo-backend.herokuapp.com/chatDetails/${this.state.id}`)
            .then(response => response.json())
            .then(res => {
                this.state.messages = res.messages;
                this.state.memberDetails = res.members;
                this.setState(this.state);
            })
    }

    handleChatUpdate = (chatId) => {
        if (chatId == this.state.id)
            this.updateSelf();
    }

    getMemberImage = (user) => {
        const membData = this.state.memberDetails.find(membObj =>
            membObj.username === user
        )

        if (!membData)
            return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"

        return membData.profilePic
    }

    viewSettings = () => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat Settings", {
            members: this.state.memberDetails,
        })}>
            <Ionicons name={"settings-outline"} size={25} style={{ marginRight: 15 }} />
        </TouchableOpacity>
    )

    componentDidMount() {
        this.state.id = this.props.route.params.id;
        this.state.title = this.props.route.params.title;
        this.state.messages = this.props.route.params.messages;
        this.state.memberDetails = this.props.route.params.members;
        this.state.adminOnly = this.props.route.params.adminOnly;
        this.state.name = this.context.username;
        this.setState(this.state);
        this.props.navigation.setOptions({
            headerTitle: this.state.title.length < 30 ? this.state.title : this.state.title.substring(0, 30) + "...",
            headerRight: this.viewSettings
        })
        this.context.socket.on("messageSent", this.handleChatUpdate);
        this.context.socket.on("appOpened", this.updateSelf);
    }

    componentWillUnmount() {
        this.context.socket.off("messageSent", this.handleChatUpdate);
        this.context.socket.off("appOpened", this.updateSelf);

        // Mark this chat as read by this user
        fetch("http://yolo-backend.herokuapp.com/chatRead", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: this.context.id,
                chat: this.state.id
            })
        })
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
                                const sender = messageObj.sender;
                                const isOwn = sender == this.state.name;
                                return (
                                    <View key={index + "chatMsg"} style={{
                                        flexDirection: isOwn ? 'row-reverse' : 'row',
                                        paddingLeft: 5,
                                        paddingRight: 5
                                    }}>
                                        <View style={{ flex: 1, marginTop: 22.5 }}>
                                            {(index == 0 || this.state.lastSender != sender) &&
                                                <Image
                                                    source={{ uri: this.getMemberImage(sender) }}
                                                    style={{ width: 35, height: 35, borderRadius: 35 }}
                                                />
                                            }
                                        </View>
                                        <View style={styles.chatMessageContainer}>
                                            {
                                                (() => {
                                                    if (index == 0 || this.state.lastSender != sender) {
                                                        this.state.lastSender = sender;
                                                        if (index == this.state.messages.length)
                                                            this.state.lastSender = ""
                                                        return (
                                                            <View style={isOwn ? styles.userChatName : styles.otherUserChatName}>
                                                                <Text>{sender}</Text>
                                                            </View>
                                                        )
                                                    }
                                                })()
                                            }
                                            <View style={isOwn ? styles.userChatMessage : styles.chatMessage}>
                                                <Text style={isOwn ? { color: 'white' } : { color: 'black' }}>
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
                        adminOnly={this.state.adminOnly}
                    />
                </KeyboardAvoidingView>
            </>
        )
    }
}