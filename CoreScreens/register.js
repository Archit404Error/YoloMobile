import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Alert, ImageBackground, Linking } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../styles";
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import { locWarning } from '../Helpers/permissionHelperFuncs';
import { DoneWrapper, doneWrapperId } from "../Components/inputWrappers";
import * as Analytics from 'expo-firebase-analytics';

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

    const handleClick = () => {
        Linking.canOpenURL("http://yolonow.net/tos.html").then(supported => {
            if (supported) {
                Linking.openURL("http://yolonow.net/tos.html");
            } else {
                console.log('err');
            }
        });
    };

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
        <KeyboardAvoidingView behavior='padding' style={styles.loginScreenContainer}>
            <ImageBackground
                source={{ uri: "https://sce.cornell.edu/img/content/825-inset-full-1.jpg" }}
                style={styles.loginScreenHeroImg}
            >
                <View style={styles.yoloPillXL}>
                    <Text style={{
                        color: 'white',
                        fontFamily: 'OpenSans_500Medium',
                        fontSize: 44,
                    }}>Register</Text>
                </View>
            </ImageBackground>
            <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Input
                    placeholder="Name"
                    placeholderTextColor='grey'
                    leftIcon={<Ionicons name="person" size={18} style={styles.loginIcon} />}
                    value={name}
                    onChangeText={currName => setName(currName)}
                    inputContainerStyle={{ borderBottomColor: 'grey', marginLeft: 20, marginRight: 20 }}
                    inputStyle={{ color: 'grey', fontSize: 18 }}
                    inputAccessoryViewID={doneWrapperId}
                />
                <Input
                    placeholder="Username"
                    placeholderTextColor='grey'
                    leftIcon={<Ionicons name="person-circle-outline" size={18} style={styles.loginIcon} />}
                    value={username}
                    onChangeText={currUser => setUsername(currUser)}
                    inputContainerStyle={{ borderBottomColor: 'grey', marginLeft: 20, marginRight: 20 }}
                    inputStyle={{ color: 'grey', fontSize: 18 }}
                    inputAccessoryViewID={doneWrapperId}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor='grey'
                    leftIcon={<Ionicons name="key-outline" size={18} style={styles.loginIcon} />}
                    value={password}
                    onChangeText={currPass => setPassword(currPass)}
                    inputContainerStyle={{ borderBottomColor: 'grey', marginLeft: 20, marginRight: 20 }}
                    inputStyle={{ color: 'grey', fontSize: 18 }}
                    inputAccessoryViewID={doneWrapperId}
                />
                <Button
                    title={
                        <Text style={disabled ? styles.buttonDisabledTitle : styles.buttonTitle}>
                            Register
                        </Text>
                    }
                    buttonStyle={styles.confirmButton}
                    disabledStyle={styles.confirmButtonDisabled}
                    disabled={disabled}
                    onPress={
                        async () => {
                            let { status } = await Location.requestForegroundPermissionsAsync();
                            if (status !== 'granted')
                                locWarning()

                            const valRegex = /^[A-Za-z0-9]+$/
                            if (!valRegex.test(username)) {
                                Alert.alert("Usernames can only contain letters and numbers")
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
                                await context.setCredentials(resJson);
                                Analytics.logEvent('register');
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
                    <Text style={{ color: "grey", alignSelf: 'center', marginTop: 30, fontWeight: "bold" }}>
                        Go back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClick}>
                    <Text style={styles.underlinedParaText}>By registering, you agree to our Terms Of Service</Text>
                </TouchableOpacity>
            </View>
            <DoneWrapper />
        </KeyboardAvoidingView >
    )
}