import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../styles";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import { handleLocRejection } from '../Helpers/permissionHelperFuncs';

import Context from '../Context/context';

export default ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState(route.params.username);
    const [password, setPassword] = useState(route.params.password);
    const [loading, setLoading] = useState(false);
    const [loc, setLoc] = useState({});
    const disabled = loading || name == '' || username == '' || password == '';

    const context = useContext(Context);

    const [_] = useFonts({
        Fredoka: require('../assets/fonts/FredokaOne-Regular.ttf'),
        OpenSans: require('../assets/fonts/OpenSans.ttf'),
        OpenSansItalic: require('../assets/fonts/OpenSansItalic.ttf'),
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                handleLocRejection();
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
        <KeyboardAvoidingView behavior='padding' style={styles.loginScreenContainer}>
            <ImageBackground

                source={{ uri: "https://sce.cornell.edu/img/content/825-inset-full-1.jpg" }}
                style={styles.loginScreenHeroImg} >

                <View style={styles.yoloPillXL}>
                    <Text style={{
                        color: 'white',
                        fontFamily: 'OpenSans',
                        fontWeight: "800",
                        fontSize: 40,
                    }}>Register</Text>
                </View>
            </ImageBackground>
            <View style={{ alignItems: 'center' }}>
                <Text style={{
                    fontFamily: 'OpenSans',
                    fontSize: 25,
                    margin: 10,
                    color: 'white',
                    marginTop: 35,
                    marginBottom: 10,
                    fontWeight: 'bold'
                }}>Register</Text>
                <Input
                    placeholder="Name"
                    placeholderTextColor='grey'
                    leftIcon={<Ionicons name="person" size={18} style={styles.loginIcon} />}
                    value={name}
                    onChangeText={currName => setName(currName)}
                    inputContainerStyle={{ borderBottomColor: 'grey', marginLeft: 20, marginRight: 20 }}
                    inputStyle={{ color: 'grey', fontSize: 18 }}
                />
                <Input
                    placeholder="Username"
                    placeholderTextColor='grey'
                    leftIcon={<Ionicons name="person-circle-outline" size={18} style={styles.loginIcon} />}
                    value={username}
                    onChangeText={currUser => setUsername(currUser)}
                    inputContainerStyle={{ borderBottomColor: 'grey', marginLeft: 20, marginRight: 20 }}
                    inputStyle={{ color: 'grey', fontSize: 18 }}
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
                            if (status !== 'granted') {
                                handleLocRejection();
                                return;
                            }

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
                    <Text style={{ color: "grey", alignSelf: 'center', marginTop: 30, fontWeight: "bold" }}>
                        Go back
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >

    )
}