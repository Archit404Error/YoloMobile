import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./yoloStylesheet";

export class TextStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            subSectionHeading: {
                fontFamily: 'OpenSans_500Medium',
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 5,
                marginLeft: 5
            },
            title: {
                fontFamily: 'OpenSans_500Medium',
                fontSize: 25,
                margin: 10,
                marginTop: 35,
                marginBottom: -5,
                fontWeight: 'bold',
            },
            subText: {
                fontFamily: 'OpenSans_500Medium',
                color: "grey",
                fontSize: 15,
                margin: 10,
                marginLeft: 12.5,
                marginBottom: 30,
            },
            centeredSubText: {
                fontFamily: 'OpenSans_500Medium',
                color: "grey",
                fontSize: 15,
                alignSelf: 'center',
            },
            addressText: {
                fontFamily: 'Menlo',
                color: 'grey',
                fontSize: 15,
                marginLeft: 12.5,
                margin: 10,
                marginBottom: 0,
                fontWeight: 'bold',
                textTransform: 'uppercase'
            },
            boldSectionHeader: {
                fontFamily: 'OpenSans_600SemiBold',
                fontSize: 25,
                fontWeight: 'bold',
                margin: 20,
            },
            boldSubHeader: {
                fontFamily: 'OpenSans_600SemiBold',
                fontSize: 20,
            },
            centeredSubHeader: {
                alignSelf: 'center',
                fontFamily: 'OpenSans_600SemiBold',
                fontSize: 20,
            },
            matchTitle: {
                fontFamily: 'OpenSans_600SemiBold',
                fontSize: 20,
                textDecorationLine: 'underline'
            },
            resTitleText: {
                fontSize: 16,
                marginLeft: 10,
                color: "black",
            },
            resDescText: {
                fontSize: 16,
                marginLeft: 10,
                color: "grey",
            },
            profTitle: {
                fontFamily: "OpenSans_500Medium",
                fontSize: 30,
                fontWeight: 'bold',
                marginTop: 10,
                alignSelf: 'center'
            },
            profSubTitle: {
                fontFamily: "OpenSans_500Medium",
                fontSize: 20,
                color: "gray",
                marginTop: 10,
                alignSelf: 'center'
            },
            eventCreatorUsername: {
                fontFamily: "OpenSans_500Medium",
                fontSize: 17.5,
                color: "black",
                alignSelf: 'center',
                marginLeft: 10
            },
            listHead: {
                marginTop: -20,
                color: "orange",
                marginBottom: 20,
                fontWeight: "700",
                fontSize: 20,
                marginLeft: 10
            },
            underlinedParaText: {
                color: "grey",
                alignSelf: 'center',
                marginTop: 30,
                textDecorationLine: 'underline'
            },
        })
    }
}