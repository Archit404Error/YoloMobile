import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Button } from 'react-native';
import Context from '../Context/context';
import { styles } from '../styles';

export default ({ navigation }) => {
    return (
        <Context.Consumer>
            { context =>
                <SafeAreaView>
                    <ScrollView style = {styles.container}>
                        <Image style = {styles.eventImg} source = {{ uri: context.eventDetails.image }} />
                        <Text style = {styles.title}>{context.eventDetails.title}</Text>
                        <Text style = {styles.addressText}>{context.eventDetails.location}</Text>
                        <View style = {{ flex: 1, flexDirection: 'row', marginLeft: 10, }}>
                        {
                            context.eventDetails.tags.split("|").map((tag) => {
                                return (
                                    <View style = {styles.tag}>
                                        <Text>{tag}</Text>
                                    </View>
                                )
                            })
                        }
                        </View>
                        <Text style = {styles.subText}>{context.eventDetails.description}</Text>
                        <Button title = {"Add Event!"} 
                            onPress = {
                                () => { 
                                    navigation.navigate("Submit Event")
                                }
                            } 
                        />
                    </ScrollView>
                </SafeAreaView>
            }
        </Context.Consumer>
    )
}