import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles";

export default class extends React.Component {
    state = {
        id : -1,
        name : "Loading...",
        profPic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        friended : false,
    }

    constructor(props) {
        super(props);
        this.state.id = this.props.id;
        fetch('http://eventcore.herokuapp.com/getUser?' + this.state.id)
        .then(res => {return res.json()})
        .then(resJson => {
            this.state.name = resJson[3];
            this.setState(this.state);
        });
    }

    render() {
        const iconName = this.state.friended ? 'chatbox-ellipses-outline' : 'person-add-outline';
        return (
            <View style = {{
                flexDirection: 'row', 
                backgroundColor: 'white', 
                padding: 15, 
                borderBottomColor: '#f2f2f2', 
                borderBottomWidth: 1
            }}>
                <Image source = {{ uri: this.state.profPic }} style = {{ width: 40, height: 40, borderRadius: 50 }} />
                <Text style = {{ color: 'black', marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                    {this.state.name}
                </Text>
                <TouchableOpacity style = {{ marginTop: 5 }}>
                    <Ionicons name = {iconName} size = {25} />
                </TouchableOpacity>
            </View>
        );
    }
}