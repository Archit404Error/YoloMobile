import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import { styles } from '../styles';
import { Input, Button } from 'react-native-elements/';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Context from '../Context/context';
import { useFonts } from 'expo-font';
import { showMessage } from 'react-native-flash-message';
import { handleLocRejection } from '../Helpers/permissionHelperFuncs';

export default ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [initDenied, setInitDenied] = useState(false);
    const [loc, setLoc] = useState({});
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const [fontLoaded] = useFonts({
        Fredoka: require('../assets/fonts/FredokaOne-Regular.ttf'),
        OpenSans: require('../assets/fonts/OpenSans.ttf'),
        OpenSansItalic: require('../assets/fonts/OpenSansItalic.ttf'),
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
                handleLocRejection()
                setInitDenied(true);
                return;
            }
            setLocation()
        })();
    }, []);

    useEffect(() => {
        if (loading) {
            setLoading(false)
            navigation.navigate("App");
        }
    }, [loc]);

    useEffect(() => {
        if (JSON.stringify(loc) != "{}") {
            setLoading(false)
            navigation.navigate("App");
        }
    }, [loading]);

    if (!fontLoaded)
        return <></>;

    const disabled = loading || userName == '' || password == '';

    return (
        <>
            <KeyboardAvoidingView behavior='padding' style={styles.loginScreenContainer}>
                <ImageBackground

                    source={{ uri: "https://news.cornell.edu/sites/default/files/styles/full_size/public/UP_2017_0630_051.jpg?itok=MzKRS1G7" }}
                    style={styles.loginScreenHeroImg} >

                    <View style={styles.yoloPillXL}>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'OpenSans',
                            fontWeight: "800",
                            fontSize: 40,
                        }}>Login</Text>
                    </View>
                </ImageBackground>
                <View style={{ alignItems: 'center' }}>
                    <Input
                        placeholder="Username"
                        placeholderTextColor='grey'
                        textContentType={'username'}
                        leftIcon={<Ionicons name="person" size={18} style={styles.loginIcon} />}
                        onChangeText={t => setUserName(t)}
                        inputContainerStyle={{ borderBottomColor: 'grey', marginLeft: 20, marginRight: 20 }}
                        containerStyle={{ marginTop: 20 }}
                        inputStyle={{ color: 'grey', fontSize: 18 }}
                    />
                    <Input
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor='grey'
                        textContentType={'password'}
                        leftIcon={<Ionicons name="key-outline" size={18} style={styles.loginIcon} />}
                        onChangeText={t => setPassword(t)}
                        inputContainerStyle={{ borderBottomColor: 'grey', marginLeft: 20, marginRight: 20 }}
                        inputStyle={{ color: 'grey', fontSize: 18 }}

                    />
                    <Button
                        title={
                            <Text style={
                                disabled ? styles.buttonDisabledTitle : styles.buttonTitle
                            }>
                                Login
                            </Text>
                        }
                        buttonStyle={styles.confirmButton}
                        disabledStyle={styles.confirmButtonDisabled}
                        disabled={disabled}
                        onPress={async () => {
                            const res = await fetch(`http://yolo-backend.herokuapp.com/auth?`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    username: userName,
                                    password: password
                                })
                            })
                            const resJson = await res.json()

                            if (JSON.stringify(await resJson) != "{}") {
                                let { status } = await Location.requestForegroundPermissionsAsync()
                                if (status !== 'granted') {
                                    handleLocRejection()
                                    return;
                                }
                                else if (initDenied) setLocation()

                                await context.setCredentials(resJson);
                                context.storeCreds();
                                setLoading(true);
                            }
                            else showMessage({ message: "Invalid username or password", type: 'danger' })
                        }}
                    />
                </View>
                {loading &&
                    <ActivityIndicator size="large" style={{ marginTop: 10 }} />
                }
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Register", {
                        username: userName,
                        password: password
                    });
                }}>
                    <Text style={{ color: "grey", alignSelf: 'center', marginTop: 30 }}>
                        Don't have an account? <Text style={{ fontWeight: "bold", color: "grey" }}>Sign up here!</Text>
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    );
}