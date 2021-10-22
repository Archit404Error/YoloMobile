import React from "react";
import { TouchableOpacity, Image } from "react-native";

import { styles } from "../styles";

export default class extends React.Component {
    state = {
        profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        viewed: false,
        id: -1,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.props.id;
        this.setState(this.state);
    }

    render() {
        return (
            <TouchableOpacity onPress = {() => console.log(this.state.id)}>
                <Image 
                    style = { this.state.viewed ? styles.storyImg : styles.storyImgNew } 
                    source = {{ uri: this.state.profPic }} 
                />
            </TouchableOpacity>
        )
    }
}