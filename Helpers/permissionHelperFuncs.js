import { Alert, Linking } from 'react-native'

const permissionRejection = (type, action) => {
    Alert.alert(`You must enable ${type} permissions to use YOLO`,
        `You will be redirected to settings to enable ${action}`,
        [
            { text: "Ok", onPress: () => Linking.openURL('app-settings:') }
        ])
}

export const handleLocRejection = () => permissionRejection("location", "location tracking")
export const handleImgRejection = () => permissionRejection("image", "image picking")

/**
 * Newer permission rejection funcs (phase out old ones gradually)
 */
const permissionWarning = (perm) => {
    Alert.alert(`${perm} was rejected`,
        `We recommend that you enable ${perm} for the best experience. You can enable ${perm} any time in YOLO > Settings`,
        [{ text: "Ok" }]
    )
}

export const locWarning = () => {
    Alert.alert(`Location Access was rejected`,
        `Event locations will be inaccurate due to the rejection of location permissions. You can enable then any time in settings.`,
        [
            { text: "Enable", onPress: () => Linking.openURL('app-settings:') },
            { text: "Ok" }
        ]
    )
}