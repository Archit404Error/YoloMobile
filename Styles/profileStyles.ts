import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./stylesheet";

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