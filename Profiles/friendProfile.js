import React from "react";

import DisplayProfile from "./displayProfile";

export default class extends React.Component {

    state = {
        id: -1,
        name: 'Sample Username',
        profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        friends: [],
        events: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const url = `http://yolo-backend.herokuapp.com/user/${this.props.route.params.id}`;
        fetch(url)
            .then(res => res.json())
            .then(resJson => {
                this.state.id = this.props.route.params.id;
                this.state.name = resJson.name;
                this.state.friends = resJson.friends;
                this.state.events = resJson.acceptedEvents;
                this.state.profPic = resJson.profilePic;
                this.setState(this.state);
            })
    }

    render() {
        return (
            <DisplayProfile 
                id = {this.state.id}
                name = {this.state.name}
                friends = {this.state.friends}
                events = {this.state.events}
                profilePic = {this.state.profPic}
                navigation = {this.props.navigation}
            />
        );
    }
}
