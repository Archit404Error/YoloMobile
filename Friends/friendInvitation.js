import React, { useState, useEffect, useContext } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Feather } from '@expo/vector-icons';
import Context from '../Context/context';

export default ({ id, eventId }) => {
    const [profile, setProfile] = useState("");
    const [name, setName] = useState("");
    const [invited, setInvited] = useState(false);
    const context = useContext(Context);

    const fetchDetails = () => {
        fetch(`http://yolo-backend.herokuapp.com/user/${id}`)
            .then(res => res.json())
            .then(data => {
                setProfile(data.profilePic);
                setName(data.name);
            })
    }

    const sendInvite = () => {
        fetch(`http://yolo-backend.herokuapp.com/inviteFriend`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                sender: context.id,
                event: eventId,
                friend: id
            })
        })
        setInvited(true);
    }

    // Fetch info on mount
    useEffect(fetchDetails, [])

    return (
        <View style = {{
            flexDirection: 'row', 
            backgroundColor: 'white', 
            padding: 15, 
            borderBottomColor: '#f2f2f2', 
            borderBottomWidth: 1
        }}>
            <Image source = {{ uri: profile }} style = {{ width: 40, height: 40, borderRadius: 50 }} />
            <TouchableOpacity onPress = {() => {
                this.props.navigation.navigate(
                    "Friends", 
                    {
                        screen: "View Profile",
                        params: {
                            id: id
                        }
                    },
                )
            }}>
                <Text style = {{ color: 'black', marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                    {name}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ marginTop: 5 }} onPress = {() => {
                if (!invited) {
                    sendInvite();
                    showMessage({
                        message: `${name} was sent an invitation!`,
                        type: 'info'
                    });
                }
            }}>
                <Feather name = {'send'} size = {25} />
            </TouchableOpacity>
        </View>
    )
}