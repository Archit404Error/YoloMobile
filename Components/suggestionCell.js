import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Context from "../Context/context";
import { styles } from "../styles";
import { ItemPreview } from "./itemPreview";

export const SuggestionCell = ({ data, navigation }) => {

    if ('title' in data) {
        //event
        return <TouchableOpacity onPress={() => {
            fetch(`http://yolo-backend.herokuapp.com/event/${data._id}`)
                .then(response => response.json())
                .then(res => {
                    console.log(res);
                    navigation.navigate("Details", {
                        id: data._id,
                        title: res.title,
                        image: res.image,
                        description: res.description,
                        tags: res.tags,
                        location: res.location,
                        startDate: new Date(res.startDate),
                        endDate: new Date(res.endDate),
                        attendees: res.attendees
                    })
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