import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles";

export default class extends React.Component {
    state = {
        id: -1,
        title: 'Loading...',
        allMessages: 'Loading...',
        recentMsg: 'Loading...',
        members: 'Loading...',
        image: 'Loading...',
        handler: -1,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.props["id"];
        this.setState(this.state);

        const updateSelf = () => {
            const url = "http://eventcore.herokuapp.com/getChats?" + this.state.id;
            fetch(url)
            .then(response => response.json())
            .then((resList) => {
                this.state.title = resList[1];
                this.state.allMessages = resList[2];
                this.state.recentMsg = this.state.allMessages.split('\n');
                this.state.recentMsg = this.state.recentMsg[this.state.recentMsg.length - 1];
                this.state.members = resList[3];
                this.setState(this.state);
            })
            const imgUrl = "http://eventcore.herokuapp.com/query";
            fetch(imgUrl)
            .then(response => response.json())
            .then((resList) => {
                resList = resList[this.state.id - 1]
                this.state.image = resList[1];
                this.setState(this.state);
            })
        }
        
        updateSelf();
        this.state.handler = setInterval(() => updateSelf(), 100);
        this.setState(this.state);
    }

    componentWillUnmount() {
        clearInterval(this.state.handler);
    }

    render() {
        if (!this.state.title.includes(this.props.display)) {
            return <></>;
        }
        return (
            <TouchableOpacity 
                onPress = {() => {
                    this.props["navigation"].navigate("Messages", { 
                        id: this.state.id,
                        title: this.state.title,
                        messages: this.state.allMessages,
                        members: this.state.members,
                        image: this.state.image
                    })
                }
            }>
                <View style = {styles.chatContainer}>
                    <View style = {{ flexDirection: 'row' }}>
                        <Image style = {styles.chatImg} source = {{ uri: this.state.image }} />
                        <View style = {{ flexDirection: 'column', padding: 10 }}>
                            <View style = {{ flexDirection: 'row' }}>
                                <Text style = { styles.chatTitle }>
                                    {
                                        this.state.title.substring(0, this.state.title.indexOf(this.props.display))
                                    }
                                </Text>
                                <Text style = { styles.matchTitle }>
                                    {
                                        this.state.title.substring(this.state.title.indexOf(this.props.display), this.state.title.indexOf(this.props.display) + this.props.display.length)
                                    }
                                </Text>
                                <Text style = { styles.chatTitle }>
                                    {
                                        this.state.title.substring(this.state.title.indexOf(this.props.display) + this.props.display.length, this.state.title.length)
                                    }
                                </Text>
                            </View>
                            <Text style = {{ color: 'gray', marginTop: 10 }}>{this.state.recentMsg}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}
