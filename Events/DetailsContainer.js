import React from "react";
import Details from './EventDetails';

export default ({ navigation, route }) => {
    return (
        <Details 
            id = {route.params["id"]} 
            title = {route.params["title"]}
            image = {route.params["image"]}
            description = {route.params["description"]}
            location = {route.params["location"]}
        />
    )
}