import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Button } from 'react-native';
import { styles } from '../styles';

export default ({route, navigation}) => {
    return (
        <SafeAreaView>
            <ScrollView style = {styles.container}>
                <Image style = {styles.eventImg} source = {{ uri: route.params.img }} />
                <Text style = {styles.title}>{route.params.title}</Text>
                <Text style = {styles.addressText}>{route.params.loc}</Text>
                <View style = {{ flex: 1, flexDirection: 'row', marginLeft: 10, }}>
                {
                    route.params.tags.split("|").map((tag) => {
                        return (
                            <View style = {styles.tag}>
                                <Text>{tag}</Text>
                            </View>
                        )
                    })
                }
                </View>
                <Text style = {styles.subText}>{route.params.desc}</Text>
                <Button title = {"Add Event!"} 
                    onPress = {
                        () => { 
                            navigation.navigate("Submit Event", 
                            { 
                                title: route.params.title, 
                                desc: route.params.desc, 
                                img: route.params.img, 
                                loc: route.params.loc, 
                                other: route.params.other 
                            })
                        }
                    } 
                />
            </ScrollView>
        </SafeAreaView>
    )
}