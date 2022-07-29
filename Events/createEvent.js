import React, { useState, useRef, useCallback } from 'react';
import {
    Alert, SafeAreaView, ScrollView, View, TextInput, TouchableOpacity, Text,
    Switch, KeyboardAvoidingView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles';
import ImgScreen from './imgChoose';
import LocationChooser from './locationChoose';
import Context from '../Context/context';
import { DoneWrapper, doneWrapperId } from '../Components/inputWrappers';

export default ({ navigation }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tags, setTags] = useState("");
    const [other, setOther] = useState("");
    const [isPrivate, setPrivacy] = useState(false);
    const [adminOnly, setAdminOnly] = useState(false);

    const titleRef = useRef();
    const descriptionRef = useRef();
    const locationRef = useRef();
    const tagsRef = useRef();
    const otherRef = useRef();

    useFocusEffect(() => {
        const refFuncMap = {
            [titleRef]: setTitle,
            [descriptionRef]: setDescription,
            [locationRef]: setLocation,
            [tagsRef]: setTags,
            [otherRef]: setOther
        }

        for (const ref of Object.keys(refFuncMap)) {
            if (ref.current)
                refFuncMap[ref](ref.current.value);
        }
    })

    const formatTags = (text) => {
        text = text.replace(" ", "|");
        setTags(text);
    }

    return (
        <Context.Consumer>
            {context =>
                <>
                    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={90}>
                        <ScrollView>
                            <TextInput
                                style={styles.titleInput}
                                placeholder="Add event title"
                                maxLength={25}
                                clearButtonMode="while-editing"
                                onChangeText={setTitle}
                                inputAccessoryViewID={doneWrapperId}
                            />
                            <TextInput
                                style={styles.descInput}
                                multiline={true} numberOfLines={1}
                                placeholder="Add event description"
                                maxLength={150}
                                onChangeText={setDescription}
                                inputAccessoryViewID={doneWrapperId}
                            />
                            <TextInput
                                style={styles.titleInput}
                                placeholder="Add event location"
                                maxLength={50}
                                clearButtonMode="while-editing"
                                onChangeText={setLocation}
                                inputAccessoryViewID={doneWrapperId}
                            />
                            {
                                /*
                                <LocationChooser
                                    initialLat={context.latitude}
                                    initialLong={context.longitude}
                                />*/
                            }
                            <TextInput
                                style={styles.titleInput}
                                placeholder="Tags"
                                maxLength={25}
                                clearButtonMode="while-editing"
                                value={tags}
                                onChangeText={formatTags}
                                inputAccessoryViewID={doneWrapperId}
                            />
                            <TextInput
                                style={styles.titleInput}
                                placeholder="Other"
                                maxLength={25}
                                clearButtonMode="while-editing"
                                onChangeText={setOther}
                                inputAccessoryViewID={doneWrapperId}
                            />
                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.datePickerHeading}>{"Starting Time"}</Text>
                                    <RNDateTimePicker
                                        value={startDate}
                                        mode={"datetime"}
                                        onChange={(selectEvent, data) => {
                                            setStartDate(data || startDate);
                                            if (data && data - endDate > 0)
                                                setEndDate(data);
                                        }}
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
                                        trackColor={{ true: "#ec632f" }}
                                        style={{ marginLeft: 20 }}
                                    />
                                </View>
                                {isPrivate &&
                                    <Text style={{ color: 'gray', fontSize: 10 }}>
                                        Making this event private means it will only be visible to people to whom you send the event link
                                    </Text>
                                }
                            </View>
                            <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white', padding: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 15 }}>Admin Only Chat Messages</Text>
                                    <Switch
                                        value={adminOnly}
                                        onChange={() => setAdminOnly(!adminOnly)}
                                        trackColor={{ true: "#ec632f" }}
                                        style={{ marginLeft: 20 }}
                                    />
                                </View>
                                {adminOnly &&
                                    <Text style={{ color: 'gray', fontSize: 10 }}>
                                        Use this feature if you want to use the chat primarily as a way to send updates to attendees. Only the admin will be able to send chat messages (attendees will only be able to read chat messages).
                                    </Text>
                                }
                            </View>
                            <TouchableOpacity
                                style={{ backgroundColor: 'white', width: '100%', alignItems: 'center', marginTop: 10, padding: 10 }}
                                onPress={() => {
                                    const strValidate = [title, description, location, tags, context.eventDetails.image]
                                    const valid = strValidate
                                        .map(str => str !== "")
                                        .reduce(
                                            (prev, curr) => prev && curr,
                                            true
                                        )
                                    if (valid) {
                                        context.createEventDetails(
                                            title,
                                            description,
                                            location,
                                            startDate,
                                            endDate,
                                            tags,
                                            other,
                                            isPrivate,
                                            adminOnly
                                        );
                                        navigation.navigate("Preview Event")
                                    } else {
                                        Alert.alert("You must enter information into every field (and select an image) before creating the event!")
                                    }
                                }}
                            >
                                <Text style={{ color: '#2d6ff4' }}>Preview Event</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    <DoneWrapper />
                </>
            }
        </Context.Consumer>
    )
}