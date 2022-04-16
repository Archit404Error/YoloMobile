import React from "react";

import DisplayProfile from "./displayProfile";
import Context from '../Context/context';

export default class extends React.Component {

    static contextType = Context;

    state = {
        id: -1,
        name: 'Sample Name',
        profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        friends: [],
        events: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.context.id;
        this.state.name = this.context.fullName;
        this.state.events = this.context.acceptedEvents;
        this.state.friends = this.context.friends;
        this.state.profPic = this.context.profilePic;
        this.setState(this.state);
    }

    render() {
        return (
            <DisplayProfile
                id={this.state.id}
                name={this.state.name}
                events={this.state.events}
                friends={this.state.friends}
                profilePic={this.state.profPic}
                navigation={this.props.navigation}
                editable={true}
            />
        );
    }
}