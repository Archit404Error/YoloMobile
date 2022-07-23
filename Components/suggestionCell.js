import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Context from "../Context/context";
import { styles } from "../styles";
import { ItemPreview } from "./itemPreview";

export const SuggestionCell = ({ data, navigation }) => {

    if ('title' in data) {
        //event
        return <TouchableOpacity onPress={() => {
            navigation.navigate("Details", {
                id: data._id,
                title: data.title,
                description: data.description,
                image: data.image,
                location: data.location,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                attendees: data.attendees,
                pulledData: data,
            })
        }}>
            <ItemPreview picture={data.image} title={data.title} description={data.location} />
        </TouchableOpacity>

    } else {
        //person
        return <TouchableOpacity onPress={() => {
            navigation.navigate(
                "Friends",
                {
                    screen: "View Profile",
                    params: {
                        id: data._id
                    }
                },
            )
        }}>
            <ItemPreview picture={data.profilePic} title={data.name} description={data.username} />
        </TouchableOpacity>

    }
}