import React from "react";
import { TouchableOpacity, Image, Modal } from "react-native";

import StoryContainer from './storyContainer';

import { styles } from "../styles";

export default class extends React.Component {
    state = {
        profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        visible: false,
        viewed: false,
        timeOpen: 0,
        storyInterval: -1,
        id: -1,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.id = this.props.id;
        const openStory = () => {
            if (this.state.visible) {
                this.state.timeOpen++;
                if (this.state.timeOpen >= 500) {
                    this.state.visible = false;
                    this.state.timeOpen = 0;
                }
                this.setState(this.state);
            }
        }
        this.state.storyInterval = setInterval(() => openStory(), 10);
        this.setState(this.state);
    }

    componentWillUnmount() {
        clearInterval(this.state.storyInterval);
    }

    render() {
        return (
            <>
                <TouchableOpacity onPress = {() => {
                    this.state.visible = true;
                    this.setState(this.state);
                }}>
                    <Image 
                        style = { this.state.viewed ? styles.storyImg : styles.storyImgNew } 
                        source = {{ uri: this.state.profPic }} 
                    />
                </TouchableOpacity>
                <StoryContainer id = {this.state.id} visible = {this.state.visible} time = {this.state.timeOpen} />
            </>
        )
    }
}