import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./yoloStylesheet";

export class ProfileStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            profImg: {
                marginTop: 10,
                borderColor: "orange",
                borderWidth: 2,
                borderRadius: 500,
                width: this.windowWidth / 3,
                height: this.windowWidth / 3,
                alignSelf: 'center'
            },
            mediumProfImg: {
                borderColor: "orange",
                borderWidth: 2,
                borderRadius: 500,
                width: this.windowWidth / 5,
                height: this.windowWidth / 5,
                alignSelf: 'center'
            },
            flexSmallProfImg: {
                marginTop: 10,
                marginLeft: 10,
                marginBottom: 10,
                flex: 1,
                borderWidth: 1,
                borderColor: "orange",
                borderRadius: 50
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
        })
    }
}