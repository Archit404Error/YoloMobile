import React, {useRef, useState} from "react";
import {Animated, PanResponder, Text, TextInput} from "react-native";

export const DraggableText = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState("Enter Text...");
    const panHandler = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                panHandler.setOffset({
                    x: panHandler.x._value,
                    y: panHandler.y._value
                })
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    {dx: panHandler.x, dy: panHandler.y}
                ],
                {useNativeDriver: false}
            ),
            onPanResponderRelease: () => panHandler.flattenOffset()
        })
    ).current

    return (
        <Animated.View
            style={{
                transform: [{translateX: panHandler.x}, {translateY: panHandler.y}],
                position: 'absolute',
                left: 50,
                top: 50
            }}
            {...panResponder.panHandlers}
        >
            {
                isEditing ?
                    <TextInput autoFocus placeholder={text} onChangeText={setText}
                               onSubmitEditing={() => setIsEditing(false)}
                               style={{position: 'absolute', fontSize: 40}}/> :
                    <Text onPress={() => setIsEditing(true)} style={{fontSize: 40}}>{text}</Text>
            }
        </Animated.View>
    )
}