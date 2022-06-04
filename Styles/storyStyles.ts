import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./yoloStylesheet";

export class StoryStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
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
                bottom: 10,
                right: 10,
                zIndex: 999
            },
            storyContent: {
                width: this.windowWidth,
                height: this.windowHeight - 10
            },
        })
    }
}