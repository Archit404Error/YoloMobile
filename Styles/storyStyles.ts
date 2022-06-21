import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./yoloStylesheet";

export class StoryStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            storyInfoFont: {
                fontSize: 40, 
                position: 'absolute', 
                zIndex: 999, 
                top: 45,
                color: "white",
                textShadowColor: "black",
                textShadowRadius: 5,
            },
            storyImg: {
                borderRadius: 500,
                width: this.windowWidth / 6,
                height: this.windowWidth / 6,
                marginRight: 10,
                borderColor: '#c9c9c9',
                borderWidth: 2,
            },
            storyImgNew: {
                borderRadius: 500,
                width: this.windowWidth / 6,
                height: this.windowWidth / 6,
                marginRight: 10,
                borderColor: '#2d6ff4',
                borderWidth: 2,
            },
            postStoryContainer: {
                borderRadius: 10,
                backgroundColor: 'white',
                padding: 15,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                bottom: 20,
                right: 20,
                zIndex: 999
            },
            storyContent: {
                width: this.windowWidth,
                height: this.windowHeight - 10
            },
        })
    }
}