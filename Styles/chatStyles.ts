import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./yoloStylesheet";

export class ChatStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            messageScrollView: {
                height: this.windowHeight - 170
            },
            chatMessageContainer: {
                flex: 10,
                padding: 10,
                paddingTop: 0,
                marginBottom: -5,
                flexDirection: "column"
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
                width: this.windowHeight / 15,
                height: this.windowHeight / 15,
                borderRadius: 50,
            },
        })
    }
}