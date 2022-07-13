import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import { styles } from "../styles";
import Context from "../Context/context";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        name: "Loading...",
        profPic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        actionTaken: false,
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

    requestAccepted(accepted) {
        fetch(`http://yolo-backend.herokuapp.com/determineFriend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accepted: accepted,
                sender: this.props.id,
                receiver: this.context.id,
                name: this.context.fullName
            })
        })
            .then(res => {
                this.state.actionTaken = true;
                this.setState(this.state);
                this.context.refreshState();
            })
    }

    render() {
        if (this.state.actionTaken) return <></>
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
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: 'black', marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                            {this.state.name}
                        </Text>
                        <Text style={{ color: 'gray', fontSize: 10, marginLeft: 10 }}>sent you a friend request</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 5, right: -50 }} onPress={() => this.requestAccepted(true)}>
                    <Feather name="check" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 5, right: -100 }} onPress={() => this.requestAccepted(false)}>
                    <Feather name="x" size={25} />
                </TouchableOpacity>
            </View>
        );
    }
}