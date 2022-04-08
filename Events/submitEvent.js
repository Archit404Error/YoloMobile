import React from "react";
import { View, Text, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import InviteModal from "../Components/sendInviteModal";
import Context from "../Context/context";
import { styles } from "../styles";

export default class extends React.Component {

    static contextType = Context

    constructor(props) {
        super(props);
        this.handleInvitesSent = this.handleInvitesSent.bind(this)
    }

    handleInvitesSent() {
        showMessage({ message: "Invites have been sent!", type: 'success' })
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
                    closeFunc={this.handleInvitesSent}
                />
                <Text style={styles.title}>
                    Event created!
                </Text>
                <Button
                    title="Send out invites!"
                    onPress={() => this.sendModal.open()}
                />
            </View>
        )
    }
}