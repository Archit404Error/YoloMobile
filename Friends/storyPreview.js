import React from "react";
import { TouchableOpacity, Image, Modal } from "react-native";

import StoryContainer from './storyContainer';

import { styles } from "../styles";

export default class extends React.Component {
    state = {
        profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        visible: false,
        viewed: false,
        forUpload: false,
        id: -1,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.props.id;
        if (this.props.forUpload) this.state.forUpload = true;
        fetch(`http://eventcore.herokuapp.com/getUser?${this.state.id}`)
        .then(res => res.json())
        .then(resJson => {
            this.state.profPic = resJson[9]; 
            this.setState(this.state)
        })
        this.setState(this.state);
    }

    render() {
        return (
            <>
                <TouchableOpacity onPress = {() => {
                    this.state.visible = true && !this.state.forUpload;
                    this.setState(this.state);
                }}>
                    <Image 
                        style = { this.state.viewed ? styles.storyImg : styles.storyImgNew } 
                        source = {{ uri: this.state.profPic }} 
                    />
                </TouchableOpacity>
                <StoryContainer id = {this.state.id} visible = {this.state.visible} />
            </>
        )
    }
}