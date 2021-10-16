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

        const updateChats = () => {
            fetch(`http://eventcore.herokuapp.com/getChats?${this.state.id}`)
            .then(res => res.json())
            .then(resJson => {
                this.state.messages = resJson[2];
                this.setState(this.state);
            })
        }

        this.state.handler = setInterval(updateChats, 100);
        this.setState(this.state);
    }

    componentWillUnmount() {
        clearInterval(this.state.handler);
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
                        <View style = {{marginBottom: 30}}></View>
                    </ScrollView>
                </SafeAreaView>
                <KeyboardAvoidingView keyboardVerticalOffset = {70} behavior = {'padding'}>
                    <SendMessage chatId = {this.state.id} sender = {this.state.name} />
                </KeyboardAvoidingView>
            </View>
        )
    }
}