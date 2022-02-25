import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import * as Location from 'expo-location';
import { styles } from '../styles';
import { Input, Button } from 'react-native-elements/';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Context from '../Context/context';
import { useFonts } from 'expo-font';


export default ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loc, setLoc] = useState({});
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const [loaded] = useFonts({
        Spartan: require('../assets/fonts/spartan.ttf'),
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
        if (loading) navigation.navigate("App");
    }, [loc]);

    useEffect(() => {
        if (JSON.stringify(loc) != "{}") navigation.navigate("App");
    }, [loading]);

    if (!loaded) {
        return null;
    }

    const disabled = loading || userName == '' || password == '';

    return (
        <>
            <KeyboardAvoidingView behavior='padding' style={styles.loginScreenContainer}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(236, 99, 94, 1)', 'rgba(245, 192, 106, 1)']}
                    style={{ position: 'absolute', top: 0, left: 0, width: "100%", height: "100%" }}
                />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 100, fontWeight: "600", fontFamily: 'Spartan' }}>YOLO</Text>
                    <Input
                        placeholder="Email"
                        placeholderTextColor='rgba(255,255,255,0.6)'
                        textContentType={'emailAddress'}
                        leftIcon={<Ionicons name="mail-open" size={20} style={styles.loginIcon} />}
                        onChangeText={t => setUserName(t)}
                        inputContainerStyle={{ borderBottomColor: 'white', marginLeft: 20, marginRight: 20 }}
                        containerStyle={{ marginTop: 20 }}
                        inputStyle={{ color: 'white', fontSize: 22 }}
                    />
                    <Input
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor='rgba(255,255,255,0.6)'
                        textContentType={'password'}
                        leftIcon={<Ionicons name="key-outline" size={20} style={styles.loginIcon} />}
                        onChangeText={t => setPassword(t)}
                        inputContainerStyle={{ borderBottomColor: 'white', marginLeft: 20, marginRight: 20 }}
                        inputStyle={{ color: 'white', fontSize: 22 }}

                    />
                    <Button

                        title={
                            <Text style={
                                disabled ? styles.buttonDisabledTitle : styles.buttonTitle
                            }> Login </Text>}
                        buttonStyle={styles.confirmButton}
                        disabledStyle={styles.confirmButtonDisabled}
                        disabled={disabled}
                        onPress={() => {
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
                {loading &&
                    <ActivityIndicator size="large" style={{ marginTop: 10 }} />
                }
            </KeyboardAvoidingView>
        </>
    );
}