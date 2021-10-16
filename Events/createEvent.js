import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, TextInput } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles';
import ImgScreen from '../CoreScreens/imgChoose';

export default ({ navigation }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [tags, setTags] = useState("");
    const [other, setOther] = useState("");

    const formatTags = (text) => {
        text = text.replace(" ", "|");
        setTags(text);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <TextInput 
                    style = {styles.titleInput} 
                    placeholder = "Add event title" 
                    maxLength = {25} 
                    clearButtonMode = "while-editing"
                    onChangeText = {(text) => setTitle(text)}
                />
                <TextInput 
                    style = {styles.descInput} 
                    multiline = {true} numberOfLines = {1} 
                    placeholder = "Add event description" 
                    maxLength = {150} 
                    onChangeText = {(text) => setDescription(text)}
                />
                <TextInput 
                    style = {styles.titleInput} 
                    placeholder = "Add event location" 
                    maxLength = {25} 
                    clearButtonMode = "while-editing"
                    onChangeText = {(text) => setLocation(text)}
                />
                <TextInput 
                    style = {styles.titleInput} 
                    placeholder = "Tags" 
                    maxLength = {25} 
                    clearButtonMode = "while-editing"
                    value = {tags}
                    onChangeText = {(text) => formatTags(text)}
                />
                <TextInput 
                    style = {styles.titleInput} 
                    placeholder = "Other" 
                    maxLength = {25} 
                    clearButtonMode = "while-editing"
                    onChangeText = {(text) => setOther(text)}
                />
                <RNDateTimePicker value = {new Date()} mode = {"datetime"} />
                <ImgScreen 
                    title = { title } 
                    description = { description } 
                    navigation = { navigation }
                    location = { location }
                    tags = { tags }
                    other = { other }
                />
            </ScrollView>
        </SafeAreaView>
    )
}