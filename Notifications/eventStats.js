import React, { useContext, useState, useEffect } from "react";
import { Image, Text, SafeAreaView, ScrollView, View, TextInput, Switch, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles, windowWidth, windowHeight } from "../styles";
import Friend from "../Friends/friend";
import LocationChooser from '../Events/locationChoose';
import ImgScreen from '../Events/imgChoose';

import Context from "../Context/context";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default ({ route }) => {
    const context = useContext(Context);
    const [data, setData] = useState(route.params.eventData);
    const [modalVisible, setModalVisible] = useState(false);
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





    const updateData = () => {
        fetch(`http://yolo-backend.herokuapp.com/events/${data._id}`)
            .then(data => data.json())
            .then(json => setData(json))
    }

    context.socket.on("RSVPOccurred", updateData)

    useEffect(() => {
        return () => context.socket.off("RSVPOccurred", updateData)
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={modalVisible}
            >

                <ScrollView>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(false);
                    }}>
                        <Ionicons name="close" size={30} color="orange" style={styles.editIcon} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Change event title"
                        maxLength={25}
                        text={data.title}
                        placeholderTextColor="grey"
                        clearButtonMode="while-editing"
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.descInput}
                        multiline={true} numberOfLines={1}
                        placeholder="Change event description"
                        maxLength={150}
                        placeholderTextColor="grey"
                        onChangeText={setDescription}
                    />
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Change event location"
                        maxLength={50}
                        placeholderTextColor="grey"
                        clearButtonMode="while-editing"
                        onChangeText={setLocation}
                    />
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Tags"
                        maxLength={25}
                        placeholderTextColor="grey"
                        clearButtonMode="while-editing"
                        value={tags}
                        onChangeText={formatTags}
                    />
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Other"
                        maxLength={25}
                        placeholderTextColor="grey"
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
                            fetch("http://yolo-backend.herokuapp.com/updateEvent/", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    id: data._id,
                                    title: title,
                                    description: description,
                                    location: location,
                                    startDate: startDate,
                                    endDate: endDate,
                                    tags: tags,
                                    other: other,
                                    public: !isPrivate
                                })
                            })
                        }}>
                        <Text style={{ color: 'orange' }}>Submit changes</Text>
                    </TouchableOpacity>
                </ScrollView>


            </Modal>
            <ScrollView>
                <Image
                    style={{ width: windowWidth, height: windowHeight / 5 }}
                    source={{ uri: data.image }}
                />
                <Text style={styles.title}>{data.title}</Text>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginTop: 15 }} onPress={() => {
                    setModalVisible(true);
                }}>
                    <Ionicons name="pencil" size={24} color="orange" style={styles.editIcon} />
                    <Text style={styles.editButton}>Edit event</Text>
                </TouchableOpacity>
                <Text style={styles.subText}>{`Attendees (${data.attendees.length})`}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="eye" size={24} color="black" />
                        <Text style={styles.boldSubHeader}>Viewed</Text>
                        <Text style={styles.subText}>{data.viewers.length}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="md-close" size={24} color="black" />
                        <Text style={styles.boldSubHeader}>Denied</Text>
                        <Text style={styles.subText}>{data.rejecters.length}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Ionicons name="checkmark" size={24} color="black" />
                        <Text style={styles.boldSubHeader}>Agreed</Text>
                        <Text style={styles.subText}>{data.attendees.length}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.subSectionHeading}>Recently Accepted</Text>
                    {
                        data.attendees.slice(data.attendees.length > 5 ? -5 : 0)
                            .map((userId, index) =>
                                <Friend key={index} id={userId} />
                            )
                    }
                </View>
                <View>
                    <Text style={styles.subSectionHeading}>Recently Viewed</Text>
                    {
                        data.viewers.slice(data.viewers.length > 5 ? -5 : 0)
                            .map((userId, index) =>
                                <Friend key={index} id={userId} isUser={false} />
                            )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}