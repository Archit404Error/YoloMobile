import React, { useState } from "react"
import { Text, SafeAreaView, ScrollView } from "react-native"
import Friend from "../Friends/friend"
import { styles } from "../styles"

export default ({ navigation, route }) => {
    return (
        <SafeAreaView>
            <ScrollView style={{ backgroundColor: "white", minHeight: '100%' }}>
                <Text style={styles.boldSectionHeader}>Admin</Text>
                <Friend key={route.params.adminId + "chatSettingAdmin"} id={route.params.adminId} isUser navigation={navigation} />
                <Text style={styles.boldSectionHeader}>Members</Text>
                {
                    route.params.members.map(member =>
                        <Friend key={member._id + "chatSetting"} id={member._id} isUser navigation={navigation} />)
                }
            </ScrollView>
        </SafeAreaView>
    )
}