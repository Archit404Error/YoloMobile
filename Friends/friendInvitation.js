import React, { useState, useEffect, useContext } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Feather } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import Context from '../Context/context';

export default ({ id, eventId, eventName }) => {
    const [profile, setProfile] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png");
    const [name, setName] = useState("Loading...");
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
        Analytics.logEvent('invite_sent', { invitee: name, sender: context.username })
        fetch(`http://yolo-backend.herokuapp.com/inviteFriend`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: context.id,
                senderName: context.fullName,
                event: eventId,
                eventName: eventName,
                friend: id
            })
        })
        setInvited(true);
    }

    // Fetch info on mount
    useEffect(fetchDetails, [])

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 15,
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1
        }}>
            <Image source={{ uri: profile }} style={{ width: 40, height: 40, borderRadius: 50 }} />
            <Text style={{ color: 'black', marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                {name}
            </Text>
            <TouchableOpacity style={{ marginTop: 5 }} onPress={() => {
                if (!invited) {
                    sendInvite();
                    showMessage({
                        message: `${name} was sent an invitation!`,
                        type: 'info'
                    });
                }
            }}>
                <Feather name={!invited ? 'send' : 'check-circle'} size={25} />
            </TouchableOpacity>
        </View>
    )
}