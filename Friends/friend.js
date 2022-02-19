import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import { styles } from "../styles";
import Context from "../Context/context";
import { showMessage, hideMessage } from "react-native-flash-message";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        name: "Loading...",
        profPic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        friended: false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.props.id;
        fetch(`http://yolo-backend.herokuapp.com/user/${this.props.id}`)
            .then(res => res.json())
            .then(resJson => {
                this.state.name = resJson.name;
                this.state.profPic = resJson.profilePic;
                this.setState(this.state);
            });
    }

    setFriended(friendedState) {
        this.context.sendFriendReq(this.state.id, friendedState);
        this.state.friended = friendedState;
        this.setState(this.state)
    }

    render() {
        const iconName = this.state.friended ? 'user-check' : 'user-plus';
        return (
            <View style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                padding: 15,
                borderBottomColor: '#f2f2f2',
                borderBottomWidth: 1
            }}>
                <Image source={{ uri: this.state.profPic }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate(
                        "Friends",
                        {
                            screen: "View Profile",
                            params: {
                                id: this.state.id
                            }
                        },
                    )
                }}>
                    <Text style={{ color: 'black', marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                        {this.state.name}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 5 }} onPress={() => {
                    const action = !this.state.friended ? `sent to ${this.state.name}` : `to ${this.state.name} unsent`;
                    showMessage({
                        message: `Friend request ${action}`,
                        type: 'info'
                    });
                    this.setFriended(!this.state.friended)
                }}>
                    <Feather name={iconName} size={25} />
                </TouchableOpacity>
            </View>
        );
    }
}