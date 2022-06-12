import React from 'react';
import { View, Text, InputAccessoryView, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';

export const doneWrapperId = "doneButton"

export const DoneWrapper = () => (
    <InputAccessoryView nativeID={doneWrapperId}>
        <View style={{ backgroundColor: "#eff0f2", borderTopColor: "#b7b8b9", borderTopWidth: 1, padding: 2.5 }} >
            <Button
                title={<Text style={{ color: "#2f7df3", fontWeight: "600" }}>Done</Text>}
                onPress={Keyboard.dismiss}
                buttonStyle={{ alignSelf: "flex-end", backgroundColor: "#eff0f2" }}
            />
        </View>
    </InputAccessoryView>
)