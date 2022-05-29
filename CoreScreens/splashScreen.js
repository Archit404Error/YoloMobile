import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Alert, Image } from 'react-native';
import { styles } from '../styles';
import { useFonts } from 'expo-font';

export default ({ navigation }) => {

    const [fontLoaded] = useFonts({
        OpenSans: require('../assets/fonts/OpenSans.ttf'),
        OpenSansItalic: require('../assets/fonts/OpenSansItalic.ttf'),
    });
    if (!fontLoaded)
        return <></>;
    return (
        <>
            <View style={styles.splashScreenContainer}>
                <Image source={{ uri: 'https://c0.wallpaperflare.com/preview/470/565/195/cornell-cornell-university-the-bell-tower-building.jpg' }}
                    style={styles.splashScreenHeroImage} />
                <View style={styles.splashScreenBottomContainer}>
                    <View style={styles.yoloPill}>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'OpenSans',
                            fontWeight: "bold",
                            fontSize: 26,
                        }}>#YOLO</Text>
                    </View>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'OpenSans',
                        fontWeight: "bold",
                        fontSize: 26,
                        marginTop: 10
                    }}>Welcome to your next week.</Text>

                    <Text style={{
                        color: 'gray',
                        fontFamily: 'OpenSans',
                        fontWeight: "bold",
                        fontSize: 17,
                        marginTop: 10
                    }}>Build out your calendar. Explore, visit, and discover events on your campus today!</Text>

                    <TouchableOpacity
                        style={styles.splashButton}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            color: 'white',
                            fontFamily: 'OpenSans',
                            fontWeight: "bold",
                            fontSize: 17,
                            marginTop: 12.5
                        }}>
                            Get started!
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}