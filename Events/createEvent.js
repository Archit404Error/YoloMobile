import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, TouchableOpacity, Text } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles';
import ImgScreen from '../CoreScreens/imgChoose';
import Context from '../Context/context';

export default ({ navigation }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tags, setTags] = useState("");
    const [other, setOther] = useState("");

    const formatTags = (text) => {
        text = text.replace(" ", "|");
        setTags(text);
    }

    return (
        <Context.Consumer>
            { context => 
                <SafeAreaView>
                    <ScrollView>
                        <TextInput 
                            style = {styles.titleInput} 
                            placeholder = "Add event title" 
                            maxLength = {25} 
                            clearButtonMode = "while-editing"
                            onChangeText = {setTitle}
                        />
                        <TextInput 
                            style = {styles.descInput} 
                            multiline = {true} numberOfLines = {1} 
                            placeholder = "Add event description" 
                            maxLength = {150} 
                            onChangeText = {setDescription}
                        />
                        <TextInput 
                            style = {styles.titleInput} 
                            placeholder = "Add event location" 
                            maxLength = {25} 
                            clearButtonMode = "while-editing"
                            onChangeText = {setLocation}
                        />
                        <TextInput 
                            style = {styles.titleInput} 
                            placeholder = "Tags" 
                            maxLength = {25} 
                            clearButtonMode = "while-editing"
                            value = {tags}
                            onChangeText = {formatTags}
                        />
                        <TextInput 
                            style = {styles.titleInput} 
                            placeholder = "Other" 
                            maxLength = {25} 
                            clearButtonMode = "while-editing"
                            onChangeText = {setOther}
                        />
                        <View style = {{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
                            <View style = {{ flex: 1 }}>
                                <Text style = {styles.datePickerHeading}>{"Starting Time"}</Text>
                                <RNDateTimePicker 
                                    value = {startDate} 
                                    mode = {"datetime"}
                                    onChange = {(selectEvent, data) => setStartDate(data || startDate)} 
                                    style = {styles.datePicker}
                                />
                            </View> 
                            <View style = {{ flex: 1 }}>
                                <Text style = {styles.datePickerHeading}>{"Ending Time"}</Text>
                                <RNDateTimePicker 
                                    value = {endDate} 
                                    mode = {"datetime"}
                                    onChange = {(selectEvent, data) => setEndDate(data || endDate)} 
                                    style = {styles.datePicker}
                                />
                            </View>
                        </View>
                        <ImgScreen />
                        <TouchableOpacity 
                            style = {{ backgroundColor: 'white', width: '100%', alignItems: 'center', marginTop: 10, padding: 10 }} 
                            onPress={() => { 
                                context.createEventText(title, description, location, date, tags, other);
                                navigation.navigate("Preview Event")
                            }}
                        >
                            <Text style = {{ color: '#2d6ff4' }}>Preview Event</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            }
        </Context.Consumer>
    )
}