import React, { useState } from "react"
import { Text, SafeAreaView, ScrollView } from "react-native"
import Friend from "../Friends/friend"
import { styles } from "../styles"

export default ({ navigation, route }) => {
    const [members, setMembers] = useState(route.params.members)
    return (
        <SafeAreaView>
            <ScrollView style={{ backgroundColor: "white" }}>
                <Text style={styles.boldSectionHeader}>Members</Text>
                {
                    members.map(member =>
                        <Friend key={member._id + "chatSetting"} id={member._id} isUser={true} navigation={navigation} />)
                }
            </ScrollView>
        </SafeAreaView>
    )
}