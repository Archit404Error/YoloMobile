import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./yoloStylesheet";

export class FriendStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            friendCard: {
                width: this.screenWidth / 2,
                margin: 5,
                padding: 5,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#f2f2f2",
                borderRadius: 10,
                alignItems: "center"
            },
            friendCardImg: {
                width: this.windowHeight / 12,
                height: this.windowHeight / 12,
                borderRadius: 50
            },
        })
    } 
}