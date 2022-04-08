import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, View, TextInput, TouchableOpacity, Text, Switch } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles';
import ImgScreen from './imgChoose';
import LocationChooser from './locationChoose';
import Context from '../Context/context';

export default ({ navigation }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tags, setTags] = useState("");
    const [other, setOther] = useState("");
    const [isPrivate, setPrivacy] = useState(false);

    const formatTags = (text) => {
        text = text.replace(" ", "|");
        setTags(text);
    }

    return (
        <Context.Consumer>
            {context =>
                <SafeAreaView>
                    <ScrollView>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Add event title"
                            maxLength={25}
                            clearButtonMode="while-editing"
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={styles.descInput}
                            multiline={true} numberOfLines={1}
                            placeholder="Add event description"
                            maxLength={150}
                            onChangeText={setDescription}
                        />
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Add event location"
                            maxLength={50}
                            clearButtonMode="while-editing"
                            onChangeText={setLocation}
                        />
                        <LocationChooser
                            initialLat={context.latitude}
                            initialLong={context.longitude}
                        />
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Tags"
                            maxLength={25}
                            clearButtonMode="while-editing"
                            value={tags}
                            onChangeText={formatTags}
                        />
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Other"
                            maxLength={25}
                            clearButtonMode="while-editing"
                            onChangeText={setOther}
                        />
                        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.datePickerHeading}>{"Starting Time"}</Text>
                                <RNDateTimePicker
                                    value={startDate}
                                    mode={"datetime"}
                                    onChange={(selectEvent, data) => setStartDate(data || startDate)}
                                    style={styles.datePicker}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.datePickerHeading}>{"Ending Time"}</Text>
                                <RNDateTimePicker
                                    value={endDate}
                                    mode={"datetime"}
                                    onChange={(selectEvent, data) => setEndDate(data || endDate)}
                                    style={styles.datePicker}
                                />
                            </View>
                        </View>
                        <ImgScreen />
                        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white', padding: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 15 }}>Public Event</Text>
                                <Switch
                                    value={!isPrivate}
                                    onChange={() => setPrivacy(!isPrivate)}
                                    trackColor={{ true: "#2d6ff4" }}
                                    style={{ marginLeft: 20 }}
                                />
                            </View>
                            {isPrivate &&
                                <Text style={{ color: 'gray', fontSize: 10 }}>
                                    Making this event private means it will only be visible to people to whom you send the event link
                                </Text>
                            }
                        </View>
                        <TouchableOpacity
                            style={{ backgroundColor: 'white', width: '100%', alignItems: 'center', marginTop: 10, padding: 10 }}
                            onPress={() => {
                                const strValidate = [title, description, location, tags]
                                const valid = strValidate
                                    .map(str => str !== "")
                                    .reduce(
                                        (prev, curr) => prev && curr,
                                        true
                                    )
                                if (valid) {
                                    context.createEventDetails(
                                        title, description,
                                        location,
                                        startDate,
                                        endDate,
                                        tags,
                                        other,
                                        isPrivate
                                    );
                                    navigation.navigate("Preview Event")
                                } else {
                                    Alert.alert("You must enter information into every field before creating the event!")
                                }
                            }}
                        >
                            <Text style={{ color: '#2d6ff4' }}>Preview Event</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            }
        </Context.Consumer>
    )
}