import React, { useEffect } from "react";
import { Button, Image, Text, SafeAreaView, ScrollView, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles, windowWidth, windowHeight } from "../styles";

export default ({ route }) => {
    const data = route.params.eventData;
    return (
        <SafeAreaView style = {{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView>
                <Image 
                    style = {{ width: windowWidth, height: windowHeight / 5 }} 
                    source = {{ uri: data.image }}
                />
                <Text style = {styles.title}>{data.title}</Text>
                <Text style = {styles.title}>{`Attendees (${data.attendees.length})`}</Text>
                <Button title="See list" />
                <View style = {{ flexDirection: 'row' }}>
                    <View style = {{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="eye" size={24} color="black" />
                        <Text style = {styles.chatTitle}>Viewed</Text>
                        <Text style = {styles.subText}>0</Text>
                    </View>
                    <View style = {{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="md-close" size={24} color="black" />
                        <Text style = {styles.chatTitle}>Denied</Text>
                        <Text style = {styles.subText}>0</Text>
                    </View>
                    <View style = {{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="checkmark" size={24} color="black" />
                        <Text style = {styles.chatTitle}>Agreed</Text>
                        <Text style = {styles.subText}>0</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}