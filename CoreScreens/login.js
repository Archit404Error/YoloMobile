import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import { styles } from '../styles';
import { Input, Button } from 'react-native-elements/';
import { Ionicons } from '@expo/vector-icons';
import Context from '../Context/context';

export default ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loc, setLoc] = useState({});

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setLoc(location);
        })();
    }, []);
    
    return (
        <Context.Consumer>
            { context => (
                <View style = {styles.fullScreenContainer}>
                    <View style = {{ alignItems: 'center' }}>
                        <Text style = { styles.title } >Login/Register</Text>
                        <Input 
                            placeholder = "Email" 
                            textContentType = {'emailAddress'} 
                            leftIcon = {<Ionicons name = "mail-open" size = {20} />} 
                            onChangeText = {t => setUserName(t)}
                        />
                        <Input 
                            placeholder = "Password" 
                            textContentType = {'password'} 
                            leftIcon = {<Ionicons name = "key-outline" size = {20} />} 
                            onChangeText = {t => setPassword(t)}
                        />
                        <Button 
                            title = { "Login / Register" } 
                            buttonStyle = {{ backgroundColor: 'black', borderRadius: 0, width: 300 }} 
                            onPress = {() => {
                                fetch(`http://eventcore.herokuapp.com/auth?${userName}&${password}`)
                                .then(res => res.json())
                                .then(resJson => {
                                    if (resJson["success"]) {
                                        context.setCredentials(resJson["user_data"]);
                                        context.setLocation(loc["coords"]["latitude"], loc["coords"]["longitude"]);
                                        navigation.navigate("App")
                                    } else {
                                        navigation.navigate("Register");
                                    }
                                })
                            }}
                        />
                    </View>
                </View>
            )}
        </Context.Consumer>
    );
}