import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./yoloStylesheet";

export class AuthStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            loginIcon: {
                color: 'white',
                marginRight: 10,
            },
        })
    }
}