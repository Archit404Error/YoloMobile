import { StyleSheet } from "react-native";
import { YoloStylesheet } from "./yoloStylesheet";

export class TextStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            subSectionHeading: {
                fontFamily: 'Arial',
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 5,
                marginLeft: 5
            },
            title: {
                fontFamily: 'Arial',
                fontSize: 25,
                margin: 10,
                marginTop: 35,
                marginBottom: -5,
                fontWeight: 'bold',
            },
            subText: {
                fontFamily: 'Arial',
                color: "grey",
                fontSize: 15,
                margin: 10,
                marginLeft: 12.5,
                marginBottom: 30,
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
                fontFamily: 'Arial',
                fontSize: 25,
                fontWeight: 'bold',
                margin: 20,
            },
            boldSubHeader: {
                fontFamily: 'Arial',
                fontSize: 20,
                fontWeight: 'bold',
            },
            centeredSubHeader: {
                alignSelf: 'center',
                fontFamily: 'Arial',
                fontSize: 20,
                fontWeight: 'bold',
            },
            matchTitle: {
                fontFamily: 'Arial',
                fontSize: 20,
                fontWeight: 'bold',
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
                fontSize: 30,
                fontWeight: 'bold',
                marginTop: 10,
                alignSelf: 'center'
            },
            listHead: {
                marginTop: -20,
                color: "orange",
                marginBottom: 20,
                fontWeight: "700",
                fontSize: 20,
                marginLeft: 10
            },
        })
    }
}