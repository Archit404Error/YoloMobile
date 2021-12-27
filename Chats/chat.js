import React from "react";
import { SafeAreaView, ScrollView, KeyboardAvoidingView, View, Text } from "react-native";
import { styles } from "../styles";
import SendMessage from "./sendMessage";
import Context from "../Context/context";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        messages: [],
        members: {},
        name: "",
        handler: -1,
        lastSender: "",
    }
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.props.route.params.id;
        this.state.messages = this.props.route.params.messages;
        this.state.name = this.context.fullName;
        this.setState(this.state);
        fetch(`http://yolo-backend.herokuapp.com/chatUsers/${this.state.id}`)
            .then(resp => resp.json())
            .then(res => {
                res.memberDetails.forEach(member => {
                    this.state.members[member._id] = {
                        name: member.name, 
                        pic: member.profilePic
                    }
                });
                this.setState(this.state);
            })
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
                            this.state.messages.map((messageArr, index) => {
                                let sender = '';
                                try {
                                    sender = this.state.members[messageArr[0]].name;
                                } catch (err) {}
                                const msg = messageArr[1];
                                return(
                                    <View key = {msg + " " + index} style = { styles.chatMessageContainer }>
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
                    <SendMessage chatId = {this.state.id} sender = {this.context.id} />
                </KeyboardAvoidingView>
            </View>
        )
    }
}