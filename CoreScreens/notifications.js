import React, { useContext } from "react";
import { View } from "react-native";
import Context from "../Context/context";
import { styles } from "../styles";
import Request from "../Friends/request";

export default () => {
    const context = useContext(Context);

    return (
        <View style = { styles.container }>
            {
                context.friendRequests.map((requesterId, index) => {
                    return <Request key = {index} id = {requesterId} />
                })
            }
        </View>
    )
}