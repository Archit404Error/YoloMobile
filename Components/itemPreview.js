import React, { useContext } from "react";
import { View, Image, Text } from "react-native";
import Context from "../Context/context";
import { styles } from "../styles";

export const ItemPreview = ({picture, title, description}) =>{
    return (
        <View style={{flexDirection:"row", backgroundColor:"white"}}>
            <Image source={{uri: picture}} style={styles.smallProfImg}/>
            <View style={{flexDirection:"column", alignSelf:"center"}}>
                <Text style={styles.resTitleText}> {title} </Text>
                <Text style={styles.resDescText}> {description} </Text>
            </View>
        </View>
    )
}