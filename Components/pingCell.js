import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Context from "../Context/context";
import { showMessage, hideMessage } from "react-native-flash-message";
import ThemedDialog from "react-native-elements/dist/dialog/Dialog";

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        name: "Loading...",
        profPic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        isChecked:false,
        addPing: ()=>{},
        removePing: ()=>{}

    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
        this.state.id = this.props.id;
        this.state.addPing = this.props.addPing;
        this.state.removePing = this.props.removePing;
        this.state.isChecked = this.props.didCheck;
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
                alignItems:'center',
            }}>
                <Image source={{ uri: this.state.profPic }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                <TouchableOpacity onPress={() => {
                    this.state.isChecked = !this.state.isChecked
                    if(this.state.isChecked){
                        this.state.addPing(this.state.id);
                    }else{
                        this.state.removePing(this.state.id);
                    }

                    this.setState(this.state)
                }}>
                    <Text style={{ color: 'black', marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                        {this.state.name}
                    </Text>
                </TouchableOpacity>
                    {this.state.isChecked && <Ionicons name="checkmark-circle-outline" color="orange" size={25} />}
            </View>
        );
    }
}