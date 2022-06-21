import React, { useState, useEffect, PropsWithRef } from "react"
import { TouchableOpacity, Image, Text } from "react-native"
import { fetchUserData } from "../Helpers/fetchHelperFuncs"
import { styles } from "../styles"

interface friendProps {
    id : string,
    navigation : any
}

export default ({ id, navigation } : PropsWithRef<friendProps>) => {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [img, setImg] = useState("")

    useEffect(() => {(async () => {
        const json = await fetchUserData(id)
        setName((await json).name)
        setUsername((await json).username)
        setImg((await json).profilePic)
    })()}, [])

    return (
        <TouchableOpacity 
            onPress = {() => {navigation.navigate(
                "Friends",
                {
                    screen: "View Profile",
                    params: {
                        id: id
                    }
                },
            )}} 
            style = {styles.friendCard}
        >
            <Image source={{ uri : img }} style={styles.friendCardImg} />
            <Text style = {styles.centeredSubHeader}>{username}</Text>
            <Text style = {styles.subText}>{name}</Text>
        </TouchableOpacity>
    )
}