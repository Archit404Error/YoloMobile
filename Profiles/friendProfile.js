import React from "react";

import DisplayProfile from "./displayProfile";

export default class extends React.Component {

    state = {
        id: -1,
        name: 'Sample Username',
        profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        friends: [1, 2, 3],
        events: [1, 2, 3],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const url = `http://eventcore.herokuapp.com/getUser?${this.props.route.params.id}`;
        fetch(url)
        .then(res => res.json())
        .then(resJson => {
            this.state.id = resJson[0];
            this.state.name = resJson[3];
            this.state.friends = resJson[7].split(", ");
            this.state.events = resJson[6].split(", ");
            this.state.profPic = resJson[9];
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
            />
        );
    }
}
