import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../styles";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import { locWarning } from '../Helpers/permissionHelperFuncs';
import { DoneWrapper, doneWrapperId } from "../Components/inputWrappers";

import Context from '../Context/context';

export default ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState(route.params.username);
    const [password, setPassword] = useState(route.params.password);
    const [initDenied, setInitDenied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loc, setLoc] = useState({});
    const disabled = loading || name == '' || username == '' || password == '';

    const context = useContext(Context);

    const [_] = useFonts({
        Fredoka: require('../assets/fonts/FredokaOne-Regular.ttf'),
    });

    const setLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        context.setLocation(location.coords.latitude, location.coords.longitude);
        setLoc(location);
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setInitDenied(true);
                return;
            }
            setLocation();
        })();
    }, []);

    useEffect(() => {
        if (loading) {
            setLoading(false);
            navigation.navigate("App");
        }
    }, [loc]);

    useEffect(() => {
        if (JSON.stringify(loc) != "{}" || initDenied)
            navigation.navigate("App");
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
                    inputAccessoryViewID={doneWrapperId}
                />
                <Input
                    placeholder="Username"
                    placeholderTextColor='rgba(255,255,255,0.6)'
                    leftIcon={<Ionicons name="person-circle-outline" size={20} style={styles.loginIcon} />}
                    value={username}
                    onChangeText={currUser => setUsername(currUser)}
                    inputContainerStyle={{ borderBottomColor: 'white', marginLeft: 20, marginRight: 20 }}
                    inputStyle={{ color: 'white', fontSize: 22 }}
                    inputAccessoryViewID={doneWrapperId}
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
                    inputAccessoryViewID={doneWrapperId}
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
                        async () => {
                            let { status } = await Location.requestForegroundPermissionsAsync();
                            if (status === 'granted') {
                                setInitDenied(false);
                                setLocation();
                            }
                            else
                                locWarning();

                            const valRegex = /^[A-Za-z]+$/
                            if (!(valRegex.test(username) && valRegex.test(password))) {
                                Alert.alert("Usernames and passwords can only contain letters")
                                return
                            }

                            const res = await fetch("http://yolo-backend.herokuapp.com/register", {
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
                            try {
                                const resJson = await res.json()
                                await context.setCredentials(await resJson);
                                context.storeCreds();
                                setLoading(true);
                            } catch (err) {
                                Alert.alert("That username already exists!")
                            }
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
            <DoneWrapper />
        </KeyboardAvoidingView>
    )
}