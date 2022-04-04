import React, { useContext, useState, useEffect } from "react";
import { Image, Text, SafeAreaView, ScrollView, View, Modal, TextInput,Switch, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles, windowWidth, windowHeight } from "../styles";
import Friend from "../Friends/friend";
import LocationChooser from '../Events/locationChoose';
import ImgScreen from '../Events/imgChoose';

import Context from "../Context/context";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";

export default ({ route }) => {
    const context = useContext(Context);
    const [data, setData] = useState(route.params.eventData);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState(route.params.eventData.title);
    const [description, setDescription] = useState(route.params.eventData.description);
    const [location, setLocation] = useState(route.params.eventData.location);
   

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
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1}}>
             <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit</Text>
            <TextInput
                style={styles.modalTextInput}
                placeholder="Change event title"
                placeholderTextColor={"grey"}
                maxLength={25}
                text={title}
                clearButtonMode="while-editing"
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.modalTextInput}
                placeholder="Change event description"
                placeholderTextColor={"grey"}
                maxLength={25}
                text={title}
                clearButtonMode="while-editing"
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.modalTextInput}
                placeholder="Change event location"
                placeholderTextColor={"grey"}
                maxLength={25}
                text={title}
                clearButtonMode="while-editing"
                onChangeText={setLocation}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                const eventData = {
                    eventId:data._id,
                    title:title,
                    location:location,
                    description:description
                }
                fetch(`http://yolo-backend.herokuapp.com/updateEvent/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventData)
                 })
                .then(res => {
                    showMessage("Updated with success.")
                })
              }}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
            </Modal>
            <ScrollView>
                <Image
                    style={{ width: windowWidth, height: windowHeight / 5 }}
                    source={{ uri: data.image }}
                />
                <Text style={styles.title}>{data.title}</Text>
                <TouchableOpacity style={{flex:1, flexDirection:'row', marginTop:15}}  onPress={() => {
                    setModalVisible(true);                    
                }}>
                    <Ionicons name="pencil" size={24} color="orange" style={styles.editIcon}/>
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