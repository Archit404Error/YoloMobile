import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { styles } from '../styles';
import { Input, Button } from 'react-native-elements/';
import { Ionicons } from '@expo/vector-icons';
import Context from '../Context/context';

export default ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loc, setLoc] = useState({});
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          context.setLocation(location.coords.latitude, location.coords.longitude);
          setLoc(location);
        })();
    }, []);

    useEffect(() => {
        (() => {
            if (loading) navigation.navigate("App");
        })();
    }, [loc]);

    useEffect(() => {
        (() => {
            if (JSON.stringify(loc) != "{}") navigation.navigate("App");
        })();
    }, [loading]);
    
    return (
        <>
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
                        buttonStyle = {styles.confirmButton}
                        disabled = {loading} 
                        onPress = {() => {
                            fetch(`http://yolo-backend.herokuapp.com/auth?`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    username: userName,
                                    password: password
                                })
                            })
                                .then(res => res.json())
                                .then(resJson => {
                                    if (JSON.stringify(resJson) != "{}") {
                                        context.setCredentials(resJson);
                                        setLoading(true);
                                    } else {
                                        navigation.navigate("Register", {
                                            username: userName,
                                            password: password
                                        });
                                    }
                                })
                        }}
                    />
                </View>
                { loading && 
                    <ActivityIndicator size = "large" style = {{ marginTop: 10 }} />
                }
            </View>
        </>
    );
}