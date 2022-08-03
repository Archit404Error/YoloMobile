import { StyleSheet } from "react-native";
import { YoloStylesheet } from './yoloStylesheet';
import { Dimensions } from 'react-native';


export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const yoloColor = "#F2994A"
export class SplashStyles extends YoloStylesheet {

    getStyles() {
        return StyleSheet.create({
            splashScreenContainer: {
                borderRadius: 0,
                width: windowWidth,
                flex: 1
            },
            splashScreenHeroImage: {
                width: windowWidth,
                height: .65 * screenHeight,
                opacity: 0.8
            },
            splashScreenBottomContainer: {
                width: windowWidth,
            },
            yoloPill: {
                width: 100,
                alignItems: 'center',
                height: 35,
                borderRadius: 10,
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
    }
}