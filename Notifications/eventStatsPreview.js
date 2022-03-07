import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles, windowHeight } from '../styles';

export default ({ eventData, navigation }) => {
    return (
        <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'white', minHeight: windowHeight / 8, maxHeight: windowHeight / 4 }}
            onPress={() => navigation.navigate("Event Stats", { eventData: eventData })}
        >
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Image source={{ uri: eventData.image }} style={{ flex: 2 }} />
                <View style={{ flex: 5, padding: 10 }}>
                    <Text style={styles.boldSubHeader}>{eventData.title}</Text>
                    <Text style={{ color: 'gray', marginTop: 10 }}>
                        {`${new Date(eventData.startDate).toDateString()} - ${new Date(eventData.endDate).toDateString()}`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}