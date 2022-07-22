import React from "react";
import { View, Text, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";
import InviteModal from "../Components/sendInviteModal";
import Context from "../Context/context";
import { styles } from "../styles";

export default class extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.flexContainer}>
                <InviteModal
                    ref={ref => this.sendModal = ref}
                    id={this.props.route.params.id}
                    title={this.props.route.params.title}
                    message={"Send invites for this event!"}
                    listData={this.context.friends}
                    closeFunc={() => { }}
                />
                <Text style={[styles.title, { alignSelf: "center" }]}>
                    Event created!
                </Text>
                <Button
                    title="Send out invites!"
                    onPress={() => this.sendModal.open()}
                />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Create", {
                        screen: "Notifications"
                    })}
                    style={[styles.subText, { alignSelf: 'center' }]}
                >
                    <Text>
                        To share the link for this event directly, tap here.
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}