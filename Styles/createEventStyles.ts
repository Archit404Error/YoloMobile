import { StyleSheet } from "react-native";
import { YoloStylesheet } from './stylesheet';

export class CreateEventStyles extends YoloStylesheet {
    getStyles() {
        return StyleSheet.create({
            datePickerHeading: {
                flex: 1,
                alignSelf: 'center',
                fontSize: 18,
                margin: 10
            },
            datePicker: {
                flex: 2,
                marginBottom: 10,
            },
            titleInput: {
                padding: 10,
                height: 40,
                backgroundColor: 'white',
                borderBottomColor: '#f2f2f2',
                borderBottomWidth: 1,
            },
            descInput: {
                padding: 10,
                height: 80,
                backgroundColor: 'white',
                borderBottomColor: '#f2f2f2',
                borderBottomWidth: 1,
            },
        })
    }
}