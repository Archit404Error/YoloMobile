import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Context from "../Context/context";
import { styles } from "../styles";

export default class extends React.Component {
    static contextType = Context;

    state = {
        id: -1,
        title: 'Loading...',
        allMessages: 'Loading...',
        recentMsg: {
            sender: "",
            message: "",
        },
        members: [],
        image: 'Loading...',
        adminOnly: false,
        adminId: "-1",
        read: true
    }

    constructor(props) {
        super(props);
    }

    updateSelf = () => {
        fetch(`http://yolo-backend.herokuapp.com/chatDetails/${this.state.id}`)
            .then(response => response.json())
            .then(res => {
                this.state.allMessages = res.messages;
                this.state.adminId = res.creator._id;

                if (res.adminOnly)
                    this.state.adminOnly = res.adminOnly;

                if (res.messages.length > 0)
                    this.state.recentMsg = res.messages[res.messages.length - 1];

                if (this.props.navigation.isFocused()) {
                    try {
                        this.state.read = res.read
                    } catch (err) {
                        console.log("chat not updated yet")
                    }
                }

                this.setState(this.state);
            })
    }

    handlePrevUpdate = (chatId) => {
        if (chatId == this.state.id)
            this.updateSelf()
    }

    componentDidMount() {
        this.state.id = this.props.id;
        this.state.read = this.props.read;
        this.setState(this.state);

        this.context.socket.on("messageSent", this.handlePrevUpdate)
        this.context.socket.on("appOpened", this.updateSelf)

        fetch(`http://yolo-backend.herokuapp.com/chatDetails/${this.state.id}`)
            .then(response => response.json())
            .then(res => {
                this.state.allMessages = res.messages;
                if (res.messages.length > 0)
                    this.state.recentMsg = res.messages[res.messages.length - 1];
                this.state.members = res.members;
                this.state.title = res.eventDetails.title;
                this.state.image = res.eventDetails.image;
                this.state.adminOnly = res.adminOnly;
                this.state.adminId = res.creator._id;
                this.setState(this.state);
            })
    }

    componentWillUnmount() {
        this.context.socket.off("messageSent", this.handlePrevUpdate)
        this.context.socket.off("appOpened", this.updateSelf)
    }

    render() {
        if (!this.state.title.includes(this.props.display)) {
            return <></>;
        }

        return (
            <TouchableOpacity
                onPress={() => {
                    if (!this.state.read) {
                        this.state.read = true;
                        this.setState(this.state);
                    }
                    this.props.navigation.navigate("Messages", {
                        id: this.state.id,
                        title: this.state.title,
                        messages: this.state.allMessages,
                        members: this.state.members,
                        image: this.state.image,
                        adminOnly: this.state.adminOnly,
                        adminId: this.state.adminId
                    })
                }
                }>
                <View style={styles.chatContainer}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ flex: 1 }}>
                            <Image style={styles.chatImg} source={{ uri: this.state.image }} />
                        </View>
                        <View style={{ flexDirection: 'column', padding: 10, flex: 4 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.boldSubHeader}>
                                    {
                                        this.state.title.substring(0, this.state.title.indexOf(this.props.display))
                                    }
                                </Text>
                                <Text style={styles.matchTitle}>
                                    {
                                        this.state.title.substring(this.state.title.indexOf(this.props.display), this.state.title.indexOf(this.props.display) + this.props.display.length)
                                    }
                                </Text>
                                <Text style={styles.boldSubHeader}>
                                    {
                                        this.state.title.substring(this.state.title.indexOf(this.props.display) + this.props.display.length, this.state.title.length)
                                    }
                                </Text>
                            </View>
                            <Text style={this.state.read ? styles.readChatPrev : styles.unreadChatPrev}>
                                {
                                    `${this.state.recentMsg.sender}: ${this.state.recentMsg.message}`
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
