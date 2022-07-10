import React, { useState, useContext, useRef } from "react";
import { Alert, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons'
import RBSheet from "react-native-raw-bottom-sheet";
import Context from "../Context/context";
import { BlockedUser } from "./blockedUser";
import { styles } from "../styles";

const MenuItem = ({ pressFunc, text, icon }) => {
    return (
        <TouchableOpacity
            onPress={pressFunc}
            style={styles.menuButtonContainer}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {icon}
                <Text style={styles.menuButton}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const Settings = ({ setLoggedIn, navigation }) => {
    let blockModalVisible = false;
    const context = useContext(Context)
    const menu = useRef(null);
    const blockManager = useRef(null);

    const logOut = () => {
        Alert.alert(
            "Log out",
            "Are you sure you would like to log out?",
            [
                {
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        context.removeCreds();
                        if (setLoggedIn)
                            setLoggedIn(false)
                        else
                            navigation.navigate("Login", {
                                username: "",
                                password: ""
                            })
                    }
                }
            ]
        )
    }

    return (
        <>
            <TouchableOpacity onPress={() => menu.current.open()}>
                <Feather name="settings" size={25} style={{ marginRight: 15 }} />
            </TouchableOpacity>
            <RBSheet
                height={300}
                openDuration={250}
                ref={menu}
                onClose={() => { if (blockModalVisible) blockManager.current.open() }}
                closeOnDragDown
            >
                <MenuItem
                    icon={<MaterialIcons name={"block"} size={25} style={{ marginRight: 10 }} />}
                    text="Manage Blocks"
                    pressFunc={() => { blockModalVisible = true; menu.current.close() }}
                />
                <MenuItem
                    icon={<MaterialIcons name={"logout"} size={25} style={{ marginRight: 10 }} />}
                    text="Log Out"
                    pressFunc={logOut}
                />
                <View style={{ height: 50 }}></View>
                <MenuItem
                    icon={<MaterialIcons name={"delete-forever"} size={25} style={{ marginRight: 10 }} />}
                    text="Delete Profile"
                    pressFunc={() => { }}
                />
            </RBSheet>
            <RBSheet
                height={300}
                openDuration={250}
                ref={blockManager}
                closeOnDragDown
                dragFromTopOnly
                onClose={() => blockModalVisible = false}
            >
                <ScrollView>
                    <Text style={[styles.title, { alignSelf: 'center', marginTop: -5, marginBottom: 10 }]}>Tap Users to Unblock</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 10 }}>
                        {context.blockedUsers.length == 0 &&
                            <Text style={styles.title}>No Blocked Users</Text>
                        }
                        {
                            context.blockedUsers.map(blockedId => <BlockedUser key={blockedId} id={blockedId} />)
                        }
                    </View>
                </ScrollView>
            </RBSheet>
        </>
    );
}