import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Friend from "../../Friends/friend";
export default class extends React.Component {

    
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            
           <SafeAreaView>
            {

                this.props.route.params.friends.map(key =>
                <Friend key={key} id={key} navigation={this.props.navigation} />
                )
             }
            </SafeAreaView>
        );
    }
}
