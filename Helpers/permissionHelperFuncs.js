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