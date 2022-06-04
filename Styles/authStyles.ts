import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./stylesheet";

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