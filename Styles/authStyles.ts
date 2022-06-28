import { Dimensions } from 'react-native';
import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./yoloStylesheet";

// Height of the entire phone window
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

// Height of screen minus nav bar
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;
export const yoloColor = "#F2994A"

export class AuthStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            buttonDisabledTitleLogin: {
                color: 'grey',
                fontFamily: 'OpenSans',
                fontSize: 22
            },
            buttonTitleLogin: {
                color: "white",
                fontFamily: 'OpenSans',
                fontSize: 22
            },
            confirmButtonLogin: {
                backgroundColor: yoloColor,
                borderWidth: 1,
                color:'white',
                borderColor: 'white',
                borderRadius: 8,
                width: 300,
                padding: 12,
                marginTop: 50
            },
            confirmButtonDisabledLogin: {
                backgroundColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 8,
                width: 300,
                padding: 12,
                marginTop: 50
            },

            loginIcon: {
                color: yoloColor,
                marginRight: 10,
            },
            loginScreenHeroImg: {
                height: screenHeight * 0.4,
                width: windowWidth,
                borderBottomWidth: 2,
                borderBottomColor: yoloColor,
            },
            loginScreenContainer: {
                borderRadius: 0,
                width: windowWidth,
                flex: 1,
                backgroundColor: 'white'
            },
            
            yoloPillXL: {
                width: 200,
                marginLeft: 30,
                alignItems: 'center',
                height: 65,
                borderRadius: 10,
                marginTop: 75,
                backgroundColor: yoloColor,
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
            confirmButtonDisabled: {
                backgroundColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 8,
                width: 300,
                padding: 12,
                marginTop: 50
            }
        })
    }
}