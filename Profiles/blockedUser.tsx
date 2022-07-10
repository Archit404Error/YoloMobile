import React, {useContext, useState} from "react";
import Context from "../Context/context";
import {Alert} from "react-native";
import {CircleProfile} from "../Components/circleProfile";

export const BlockedUser = ({id}) => {
    const [visible, setVisible] = useState(true);
    const context: any = useContext(Context);

    const unblockSelf = () => {
        Alert.alert("Unblock User", "Are you sure you would like to unblock this user?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: () => {
                    fetch('http://yolo-backend.herokuapp.com/blockUser', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            user: context.id,
                            blockedUser: id,
                            isBlocking: false
                        })
                    })
                    context.modifyState(["blockedUsers"], [context.blockedUsers.filter(blockId => blockId === id)]);
                    setVisible(false);
                }
            }
        ])
    }
    if (!visible) return <></>
    return (
        <CircleProfile id={id} pressHandler={unblockSelf}/>
    )
}