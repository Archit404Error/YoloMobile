import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CondensedEvent from "../../Events/condensedEvent";
import { Text} from "react-native";
import { styles } from "../../styles";

export default class extends React.Component {

    
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.route.params.events)
        return (
            
           <SafeAreaView>
            <Text style={styles.listHead}> Events </Text>
            {

                this.props.route.params.events.map(event =>
                    <CondensedEvent key={event._id} id={event._id} navigation={this.props.navigation} />
                )
             }
            </SafeAreaView>
        );
    }
}
