import React from "react";
import { Text, SafeAreaView, ScrollView, View, Picker} from "react-native";
import Context from "../Context/context";
import {SearchBar, ThemeConsumer} from "react-native-elements";
import SearchableDropdown from 'react-native-searchable-dropdown';

import { SuggestionCell } from "../Components/suggestionCell";

import Friend from './friend';

import Story from './storyPreview';
import UploadStory from "./uploadStory";



export default class extends React.Component {
    static contextType = Context;

    state = {
        friends: [],
        stories: [],
        suggestions: new Set()
    }

    constructor(props) {
        super(props);
    }

    resetSuggestions = () => {
        this.state.suggestions = new Set()
        this.setState(this.state)
    }

    fetchSuggestions = (query) => {
        fetch(`http://yolo-backend.herokuapp.com/searchSuggestions/${query}`)
        .then(resp => resp.json())
        .then(res => {
            for (const elem of res){
                this.state.suggestions.add(elem)
            }
            this.setState(this.state)
        })
    }

    componentDidMount() {
        this.setState({ friends: this.context.friends })
        fetch(`http://yolo-backend.herokuapp.com/storyIds/${this.context.id}`)
            .then(resp => resp.json())
            .then(res => {
                this.state.stories = res;
                this.setState(this.state);
            })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView>
                    <ScrollView horizontal={true} style={{padding:20}}>
                        <UploadStory />
                        {
                            this.state.stories.map((storyObj, index) => {
                                return (
                                    <Story key={index} id={storyObj._id} image={storyObj.storyImage} />
                                )
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
                {
                    this.state.friends.map((id, index) => {
                        return (
                            <Friend key={index} id={id} navigation={this.props.navigation} />
                        );
                    })
                }
                <SearchBar
                        placeholder="Search for people and events..."
                        lightTheme={true}
                        value={this.state.filtered}
                        platform={Platform.OS}
                        containerStyle={{ height: 70 }}
                        inputContainerStyle={{ height: 1}}
                        onChangeText={(text) => {
                            this.resetSuggestions()
                            this.fetchSuggestions(text)
                            this.setState(this.state);
                            this.state.filtered = text;  
                        }}
                        style={{ fontSize: 15 }}
                    />
                    {
                        Array.from(this.state.suggestions).map((res) => {
                            return (
                                <SuggestionCell data={res}/>
                            );
                        })
                    }
                {/* <SuggestionsList suggestions = {this.state.suggestions}></SuggestionsList> */}
            </View>
        );
    }
    
}

SuggestionsList = (props) => {
    if(props.suggestions.length==0){
        return(
            <View>
            </View>
        )
    }else{
        var text_ids = []
        for(const elem of props.suggestions){
            text_ids.push(
                <Text> {elem} </Text>
            )
        }
        return text_ids
    }
    
}
 