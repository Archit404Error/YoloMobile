import { StyleSheet } from "react-native";
import { YoloStylesheet } from './yoloStylesheet';

export class ButtonStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            confirmButton: {
                backgroundColor: 'rgba(255,255,255,1)',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 8,
                width: 300,
                padding: 12,
                marginTop: 50
            },
            invertedConfirmButton: {
                backgroundColor: 'orange',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 8,
                width: 300,
                padding: 12,
                alignSelf: 'center'
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
        })
    }
}