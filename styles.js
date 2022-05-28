import { AutoFocus } from 'expo-camera/build/Camera.types';
import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet } from "react-native";

// Height of the entire phone window
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

// Height of screen minus nav bar
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;
export const yoloColor = "#F2994A"


export const styles = StyleSheet.create({

    container: {
        backgroundColor: "white",
        borderRadius: 0,
    },
    flexContainer: {
        backgroundColor: "white",
        borderRadius: 0,
        flex: 1,
    },
    paddedFlexContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10
    },
    fullScreenContainer: {
        backgroundColor: "white",
        borderRadius: 0,
        width: windowWidth,
        justifyContent: 'center',
        flex: 1
    },
    subSectionHeading: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5,
        marginLeft: 5
    },
    loginScreenContainer: {
        borderRadius: 0,
        width: windowWidth,
        flex: 1,
        backgroundColor: 'white'
    },
    splashScreenContainer: {
        borderRadius: 0,
        width: windowWidth,
        flex: 1
    },
    loginIcon: {
        color: '#F2994A',
        marginRight: 10,
    },
    alignBottomContainer: {
        backgroundColor: "white",
        borderRadius: 0,
        flex: 1,
        justifyContent: 'flex-end'
    },
    emptyContainer: {
        alignItems: 'center',
        alignContent: 'center'
    },
    chatContainer: {
        width: '100%',
        height: windowHeight / 8,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        padding: 0,
    },
    eventCard: {
        width: screenWidth - 20,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 10,
        marginBottom: 10
    },
    eventCardImg: {
        width: '100%',
        height: windowHeight / 5,
        alignSelf: 'center',
        marginBottom: -20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    rsvpContainer: {
        position: 'absolute',
        top: windowHeight / 1.85,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth - 10,
        alignSelf: 'center',
    },
    rsvpNoContainer: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'flex-start'
    },
    rsvpNoBlock: {
        color: 'red',
        width: windowWidth / 2,
        borderTopColor: 'red',
        borderTopWidth: 2,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    rsvpYesContainer: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'flex-end'
    },
    rsvpYesBlock: {
        color: 'green',
        borderTopColor: 'green',
        borderTopWidth: 2,
        width: windowWidth / 2,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    infoContainer: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center'
    },
    iconBg: {
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center',
        width: 55,
        padding: 5,
    },
    datePickerHeading: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 18,
        margin: 10
    },
    datePicker: {
        flex: 2,
        marginBottom: 10,
    },
    messageScrollView: {
        height: windowHeight - 170
    },
    chatMessageContainer: {
        flex: 10,
        padding: 10,
        paddingTop: 0,
        marginBottom: -5,
    },
    otherUserChatName: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
    },
    userChatName: {
        flexDirection: 'row-reverse',
        paddingRight: 10,
        paddingBottom: 5,
    },
    chatMessage: {
        padding: 10,
        paddingRight: 20,
        backgroundColor: '#e4e4eb',
        borderRadius: 10,
        flex: 1,
        alignSelf: 'flex-start'
    },
    userChatMessage: {
        padding: 10,
        paddingRight: 20,
        backgroundColor: '#408ae5',
        borderRadius: 10,
        flex: 1,
        alignSelf: 'flex-end'
    },
    chatInput: {
        margin: 10,
        padding: 10,
        borderTopColor: '#e4e4eb',
        borderTopWidth: 1,
        fontSize: 15,
        flex: 1,
    },
    chatImg: {
        width: windowHeight / 8,
        height: windowHeight / 8,
        zIndex: 10,
    },
    title: {
        fontFamily: 'Arial',
        fontSize: 25,
        margin: 10,
        marginTop: 35,
        marginBottom: -5,
        fontWeight: 'bold',
    },
    subText: {
        fontFamily: 'Arial',
        color: "grey",
        fontSize: 15,
        margin: 10,
        marginLeft: 12.5,
        marginBottom: 30,
    },
    addressText: {
        fontFamily: 'Menlo',
        color: 'grey',
        fontSize: 15,
        marginLeft: 12.5,
        margin: 10,
        marginBottom: 0,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    boldSubHeader: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
    },
    centeredSubHeader: {
        alignSelf: 'center',
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
    },
    matchTitle: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    eventImg: {
        width: '100%',
        height: windowHeight / 1.75,
        alignSelf: 'center'
    },
    detailsImg: {
        width: '100%',
        height: windowHeight / 5,
        alignSelf: 'center',
        opacity: 0.5,
    },
    titleInput: {
        padding: 10,
        height: 40,
        backgroundColor: 'white',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    descInput: {
        padding: 10,
        height: 80,
        backgroundColor: 'white',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    confirmButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        width: 300,
        padding: 12,
        marginTop: 50
    },
    buttonDisabledTitle: {
        color: 'white',
        fontSize: 22
    },
    buttonTitle: {
        color: 'orange',
        fontSize: 22
    },
    confirmButtonDisabled: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        width: 300,
        padding: 12,
        marginTop: 50
    },
    tag: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        margin: 5,
        backgroundColor: '#dedede',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    profImg: {
        marginTop: 10,
        borderColor: "orange",
        borderWidth: 2,
        borderRadius: 500,
        width: windowWidth / 3,
        height: windowWidth / 3,
        alignSelf: 'center'
    },
    smallProfImg: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "orange",
        borderRadius: 50
    },
    resTitleText: {
        fontSize: 16,
        marginLeft: 10,
        color: "black",
    },
    resDescText: {
        fontSize: 16,
        marginLeft: 10,
        color: "grey",
    },
    storyImg: {
        borderRadius: 500,
        width: windowWidth / 6,
        height: windowWidth / 6,
        marginRight: 10,
        borderColor: '#c9c9c9',
        borderWidth: 2,
    },
    storyImgNew: {
        borderRadius: 500,
        width: windowWidth / 6,
        height: windowWidth / 6,
        marginRight: 10,
        borderColor: '#2d6ff4',
        borderWidth: 2,
    },
    profTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center'
    },
    postStoryContainer: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 15,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 10,
        right: 10,
        zIndex: 999
    },
    storyContent: {
        width: windowWidth,
        height: windowHeight - 10
    },
    listHead: {
        marginTop: -20,
        color: "orange",
        marginBottom: 20,
        fontWeight: "700",
        fontSize: 20,
        marginLeft: 10
    },
    editButton: {
        fontSize: 20,
        marginTop: 5,
        color: "orange",
        marginLeft: 5,
    },
    editIcon: {
        marginTop: 5,
        marginLeft: 10
    },
    button: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    closeButton: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF3974',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    splashScreenHeroImage: {
        height: screenHeight * 0.65,
        width: windowWidth,
        opacity: 0.8
    },
    loginScreenHeroImg: {
        height: screenHeight * 0.4,
        width: windowWidth,
    },
    splashScreenBottomContainer: {
        width: windowWidth,
        flex: 1,
        padding: 20,

    },
    yoloPill: {
        width: 100,
        alignItems: 'center',
        height: 35,
        borderRadius: 10,
        backgroundColor: yoloColor,
    },
    yoloPillXL: {
        width: 200,
        marginLeft: 30,
        alignItems: 'center',
        height: 70,
        borderRadius: 10,
        marginTop: 75,
        backgroundColor: yoloColor,
    },
    splashButton: {
        backgroundColor: yoloColor,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 50,
        height: 50,
        borderRadius: 12.5,
        alignItems: 'center',

    }

})