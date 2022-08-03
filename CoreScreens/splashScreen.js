import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { styles } from '../styles';
export default ({ navigation }) => {

    return (
        <SafeAreaView style={styles.splashScreenContainer}>
            <Image
                source={{ uri: 'https://c0.wallpaperflare.com/preview/470/565/195/cornell-cornell-university-the-bell-tower-building.jpg' }}
                style={styles.splashScreenHeroImage}
            />
            <SafeAreaView style={styles.splashScreenBottomContainer}>
                <View style={{ padding: 10 }}>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'OpenSans_400Regular',
                        fontSize: 26,
                        marginTop: 10
                    }}>
                        Welcome to your next week.
                    </Text>

                    <Text style={{
                        color: 'gray',
                        fontFamily: 'OpenSans_400Regular',
                        fontWeight: "bold",
                        fontSize: 17,
                        marginTop: 10
                    }}>
                        Build out your calendar. Explore, visit, and discover events on your campus today!
                    </Text>

                    <TouchableOpacity
                        style={styles.splashButton}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            color: 'white',
                            fontFamily: 'OpenSans_500Medium',
                            fontSize: 17,
                            marginTop: 12.5
                        }}>
                            Get started!
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}