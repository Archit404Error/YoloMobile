import React from "react";
import { SafeAreaView, ScrollView, KeyboardAvoidingView, View, Text } from "react-native";
import { styles } from "../styles";
import SendMessage from "./sendMessage";
import Context from "../Context/context";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        messages: "Loading...\n",
        members: "Loading...",
        name: "",
        handler: -1,
        lastSender: "",
    }
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.props.route.params["id"];
        this.state.messages = this.props.route.params["messages"];
        this.state.members = this.props.route.params["members"];
        this.state.name = this.context.fullName;
        this.setState(this.state);
    }

    static getDerivedStateFromProps(props, state) {
        console.log(state.name)
        state.id = props.route.params["id"];
        state.messages = props.route.params["messages"];
        state.members = props.route.params["members"];
        console.log(state);
        return state;
    }
    
    render() {
        return (
            <View style = {styles.messageContainer}>
                <SafeAreaView>
                    <ScrollView 
                        ref={ref => {this.scrollView = ref}}
                        onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                        style = {styles.messageScrollView}>
                        {
                            this.state.messages.split("\n").map((message, index) => {
                                let messageArr = message.split(/:(.+)/);
                                const sender = messageArr[0];
                                const msg = messageArr[1];
                                return(
                                    <View key = {message + " " + index} style = { styles.chatMessageContainer }>
                                        {   
                                            (() => {
                                                if (this.state.lastSender != sender) {
                                                    this.state.lastSender = sender;
                                                    return (
                                                        <View style = { sender == this.state.name ? styles.userChatName : styles.otherUserChatName }>
                                                            <Text>{sender}</Text>
                                                        </View>
                                                    )
                                                }
                                            })()
                                        }
                                        <View style = { sender == this.state.name ? styles.userChatMessage : styles.chatMessage }>
                                            <Text style = {sender == this.state.name ? { color: 'white' } : { color: 'black' }}>
                                                {msg}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
                <KeyboardAvoidingView keyboardVerticalOffset = {70} behavior = {'padding'}>
                    <SendMessage chatId = {this.state.id} sender = {this.state.name} />
                </KeyboardAvoidingView>
            </View>
        )
    }
}