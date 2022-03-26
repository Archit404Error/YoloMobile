import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../styles";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';


import Context from '../Context/context';

export default ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState(route.params.username);
    const [password, setPassword] = useState(route.params.password);
    const [loading, setLoading] = useState(false);
    const [loc, setLoc] = useState({});
    const disabled = loading || name == '' || username == '' || password == '';

    const context = useContext(Context);

    const [loaded] = useFonts({
        Fredoka: require('../assets/fonts/FredokaOne-Regular.ttf'),
    });

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
        <KeyboardAvoidingView behavior="padding" style={styles.loginScreenContainer}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(236, 99, 94, 1)', 'rgba(245, 192, 106, 1)']}
                style={{ position: 'absolute', top: 0, left: 0, width: "100%", height: "100%" }}
            />
            <View style={{ alignItems: 'center' }}>
                <Text style={{
                    fontFamily: 'Fredoka',
                    fontSize: 25,
                    margin: 10,
                    color: 'white',
                    marginTop: 35,
                    marginBottom: 10,
                    fontWeight: 'bold'
                }}>Register</Text>
                <Input
                    placeholder="Name"
                    placeholderTextColor='rgba(255,255,255,0.6)'
                    leftIcon={<Ionicons name="person" size={20} style={styles.loginIcon} />}
                    value={name}
                    onChangeText={currName => setName(currName)}
                    inputContainerStyle={{ borderBottomColor: 'white', marginLeft: 20, marginRight: 20 }}
                    inputStyle={{ color: 'white', fontSize: 22 }}
                />
                <Input
                    placeholder="Username"
                    placeholderTextColor='rgba(255,255,255,0.6)'
                    leftIcon={<Ionicons name="person-circle-outline" size={20} style={styles.loginIcon} />}
                    value={username}
                    onChangeText={currUser => setUsername(currUser)}
                    inputContainerStyle={{ borderBottomColor: 'white', marginLeft: 20, marginRight: 20 }}
                    inputStyle={{ color: 'white', fontSize: 22 }}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor='rgba(255,255,255,0.6)'
                    leftIcon={<Ionicons name="key-outline" size={20} style={styles.loginIcon} />}
                    value={password}
                    onChangeText={currPass => setPassword(currPass)}
                    inputContainerStyle={{ borderBottomColor: 'white', marginLeft: 20, marginRight: 20 }}
                    inputStyle={{ color: 'white', fontSize: 22 }}
                />
                <Button
                    title={<Text style={
                        disabled ? styles.buttonDisabledTitle : styles.buttonTitle
                    }>
                        Register
                    </Text>
                    }
                    buttonStyle={styles.confirmButton}
                    disabledStyle={styles.confirmButtonDisabled}
                    disabled={disabled}
                    onPress={
                        () => {
                            fetch("http://yolo-backend.herokuapp.com/register", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    username: username,
                                    password: password,
                                    name: name
                                })
                            })
                                .then(res => res.json())
                                .then(resJson => {
                                    context.setCredentials(resJson);
                                    context.storeCreds();
                                    setLoading(true);
                                })
                        }
                    }
                />
                {loading &&
                    <ActivityIndicator size="large" style={{ marginTop: 10 }} />
                }
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Login");
                }}>
                    <Text style={{ color: "white", alignSelf: 'center', marginTop: 30, fontWeight: "bold" }}>
                        Go back
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}