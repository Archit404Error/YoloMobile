import React, { useContext } from "react";
import { View } from "react-native";
import Context from "../Context/context";
import { styles } from "../styles";
import { ItemPreview } from "./itemPreview";

export const SuggestionCell = ({data}) => {
    if('title' in data){
        //event
        return <ItemPreview picture={data.image} title={data.title} description = {data.location}/>
    }else{
        //person
        return <ItemPreview picture={data.profilePic} title={data.name} description = {data.username}/>
    }
}