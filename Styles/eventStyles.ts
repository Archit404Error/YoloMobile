import { StyleSheet } from "react-native";
import { YoloStylesheet } from './stylesheet';

export class EventStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            eventCard: {
                width: this.screenWidth - 20,
                marginLeft: 5,
                marginRight: 5,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                    width: -2,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                borderRadius: 10,
                marginBottom: 10
            },
            eventCardImg: {
                width: '100%',
                height: this.windowHeight / 5,
                alignSelf: 'center',
                marginBottom: -20,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
            },
            rsvpContainer: {
                position: 'absolute',
                top: this.windowHeight / 1.85,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                width: this.windowWidth - 10,
                alignSelf: 'center',
            },
            rsvpNoContainer: {
                flex: 1,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                alignItems: 'flex-start'
            },
            rsvpNoBlock: {
                color: 'red',
                width: this.windowWidth / 2,
                borderTopColor: 'red',
                borderTopWidth: 2,
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 10,
            },
            rsvpYesContainer: {
                flex: 1,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                alignItems: 'flex-end'
            },
            rsvpYesBlock: {
                color: 'green',
                borderTopColor: 'green',
                borderTopWidth: 2,
                width: this.windowWidth / 2,
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 10,
            },
            infoContainer: {
                flex: 1,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                alignItems: 'center'
            },
            iconBg: {
                backgroundColor: 'white',
                borderRadius: 50,
                alignItems: 'center',
                width: 55,
                padding: 5,
            },
            eventImg: {
                width: '100%',
                height: this.windowHeight / 1.75,
                alignSelf: 'center'
            },
            detailsImg: {
                width: '100%',
                height: this.windowHeight / 5,
                alignSelf: 'center',
                opacity: 0.5,
            },
            tag: {
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                marginTop: 5,
                marginLeft: 5,
                color: '#eb7b4d',
                borderColor: '#eb7b4d',
                borderWidth: 1,
                borderRadius: 10,
                fontWeight: "600",
            },
        })
    }
}