import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet } from "react-native";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 0,
    },
    fullScreenContainer: {
        backgroundColor: "white",
        borderRadius: 0,
        width: windowWidth,
        minHeight: windowHeight,
        justifyContent: 'center',
    },
    messageContainer: {
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
    rsvpNoContainer: {
        position: 'absolute',
        top: 350,
        left: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    rsvpNoBlock: {
        width: windowWidth / 2, 
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10,
    },
    rsvpYesContainer: {
        position: 'absolute',
        top: 350,
        right: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    rsvpYesBlock: {
        width: windowWidth / 2, 
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
    },
    infoContainer: {
        position: 'absolute',
        top: 350,
        right: windowWidth / 2 - 22.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    iconBg: {
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center',
        width: 55,
        padding: 5,
    },
    messageScrollView: {
        height: windowHeight - 170
    },
    chatMessageContainer: {
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
    chatTitle: {
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
        height: windowHeight / 1.75 - 5,
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
        backgroundColor: 'black', 
        borderRadius: 0, 
        width: 300,
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
        borderRadius: 500,
        width: windowWidth / 3,
        height: windowWidth / 3,
        alignSelf: 'center'
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
    }
})