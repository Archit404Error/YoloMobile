import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../styles";

import Context from '../Context/context';

export default ({navigation, route}) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState(route.params.username);
    const [password, setPassword] = useState(route.params.password);
    const [loading, setLoading] = useState(false);
    const [loc, setLoc] = useState({});
    
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
        <View style = {styles.fullScreenContainer}>
            <View style = {{ alignItems: 'center' }}>
                <Text style = {styles.title}>Register</Text>
                <Input 
                    placeholder = "Name" 
                    value = {name} 
                    onChange = {currName => setName(currName)} 
                />
                <Input 
                    placeholder = "Username" 
                    value = {username}
                    onChange = {currUser => setUsername(currUser)}
                />
                <Input 
                    placeholder = "Password"
                    value = {password}
                    onChange = {currPass => setPassword(currPass)}
                />
                <Button 
                    title = {"Register"}
                    buttonStyle = {styles.confirmButton} 
                    onPress = {
                        () => {
                            fetch("http://yolo-backend.herokuapp.com/register", {
                                method: "POST",
                                headers: {
                                    "Content-Type" : "application/json"
                                },
                                body: JSON.stringify({
                                    username: username,
                                    password: password,
                                    name: name
                                })
                            })
                                .then(res => {
                                    context.setCredentials(res);
                                    setLoading(true);
                                })
                        }
                    }
                />
                { loading && 
                    <ActivityIndicator size = "large" style = {{ marginTop: 10 }} />
                }
            </View>
        </View>
    )
}