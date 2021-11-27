import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import { styles } from "../styles";
import Context from "../Context/context";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id : -1,
        name : "Loading...",
        profPic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        friended : false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch('http://eventcore.herokuapp.com/getUser?' + this.props.id)
        .then(res => {return res.json()})
        .then(resJson => {
            this.state.id = this.props.id;
            this.state.name = resJson[3];
            this.state.profPic = resJson[9];
            this.setState(this.state);
        });
    }

    setFriended(friendedState) {
        this.state.friended = friendedState;
        this.setState(this.state);
        this.context.sendFriendReq(this.state.id, friendedState);
    }

    render() {
        const iconName = this.state.friended ? 'user-check' : 'user-plus';
        return (
            <View style = {{
                flexDirection: 'row', 
                backgroundColor: 'white', 
                padding: 15, 
                borderBottomColor: '#f2f2f2', 
                borderBottomWidth: 1
            }}>
                <Image source = {{ uri: this.state.profPic }} style = {{ width: 40, height: 40, borderRadius: 50 }} />
                <TouchableOpacity onPress = {() => {
                    this.props.navigation.navigate("View Profile", {id: this.state.id})
                }}>
                    <Text style = {{ color: 'black', marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                        {this.state.name}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{ marginTop: 5 }} onPress = {() => this.setFriended(!this.state.friended)}>
                    <Feather name = {iconName} size = {25} />
                </TouchableOpacity>
            </View>
        );
    }
}