import React from 'react';
import { StyleSheet } from "react-native";
import { YoloStylesheet } from './yoloStylesheet';

export class ContainerStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
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
                width: this.windowWidth,
                justifyContent: 'center',
                flex: 1
            },
            loginScreenContainer: {
                borderRadius: 0,
                width: this.windowWidth,
                justifyContent: 'center',
                flex: 1
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
                borderBottomColor: '#f2f2f2',
                borderBottomWidth: 1,
                padding: 10,
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
        })
    }
}