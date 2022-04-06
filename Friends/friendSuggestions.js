import React from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import Context from "../Context/context";
import { SearchBar } from "react-native-elements";

import { SuggestionCell } from "../Components/suggestionCell";

import Friend from './friend';
import PingCell from "../Components/pingCell";

import Story from './storyPreview';
import UploadStory from "./uploadStory";
import { styles } from "../styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {FriendList} from "../Components/Lists/friendList";


export default class extends React.Component {
    static contextType = Context;

    state = {
        toPing: new Set(),
        friendSuggestions: [],
        stories: [],
        friends:new Set(),
        pingMode: false,
        pingMessage:"",
        searchSuggestions: new Set()
    }

    constructor(props) {
        super(props);
    }

    resetSuggestions = () => {
        this.state.searchSuggestions = new Set()
        this.setState(this.state)
    }
    fetchFriends = () => {
        fetch(`http://yolo-backend.herokuapp.com/user/${this.context.id}`)
        .then(resp => resp.json())
        .then(res => {
            for (const elem of res.friends) {
                this.state.friends.add(elem)
            }
            this.setState(this.state)
        })
    }
    addPing = (id) => {
        this.state.toPing.add(id)
    }
    removePing = (id) => {
        this.state.toPing.delete(id)
    }
    fetchSuggestions = (query) => {
        fetch(`http://yolo-backend.herokuapp.com/searchSuggestions/${query}`)
            .then(resp => resp.json())
            .then(res => {
                for (const elem of res) {
                    this.state.searchSuggestions.add(elem)
                }
                this.setState(this.state)
            })
            console.log(this.state.friends)
    }

    componentDidMount() {
        this.setState({ friendSuggestions: this.context.friendSuggs })
        this.fetchFriends()
        fetch(`http://yolo-backend.herokuapp.com/storyIds/${this.context.id}`)
            .then(resp => resp.json())
            .then(res => {
                this.state.stories = res;
                this.setState(this.state);
            })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView>
                    <ScrollView horizontal={true} style={{ padding: 20 }}>
                        <UploadStory />
                        {
                            this.state.stories.map((storyObj, index) => {
                                return < Story key={index} id={storyObj._id} image={storyObj.storyImage} />
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
               
                <SearchBar
                    placeholder= "Search for people and events..."
                    lightTheme={true}
                    value={this.state.filtered}
                    platform={Platform.OS}
                    containerStyle={{ height: 70 }}
                    inputContainerStyle={{ height: 1 }}
                    onChangeText={(text) => {
                        this.resetSuggestions()
                        this.fetchSuggestions(text)
                        this.setState(this.state);
                        this.state.filtered = text;
                    }}
                    style={{ fontSize: 15 }}
                />
                
                {
                    Array.from(this.state.searchSuggestions).map(res =>
                        <SuggestionCell data={res} navigation={this.props.navigation} />
                    )
                }
                <TouchableOpacity onPress={()=>{
                    this.state.pingMode = !this.state.pingMode;
                    this.setState(this.state);
                }}>
                    <Text style={{
                        fontFamily: 'Arial',
                        fontSize: 22,
                        fontWeight: 'bold',
                        color:"orange",
                        margin: 20,
                    }}>Ping your friends</Text>
                </TouchableOpacity>
                
                {this.state.pingMode && 
                Array.from(this.state.friends).map(res =>
                    <PingCell addPing={this.addPing} removePing ={this.removePing} key={res} id={res} isUser={true} navigation={this.props.navigation} />
                )} 
                {this.state.pingMode && 
                    <TextInput
                    onChangeText={text => {
                        this.state.pingMessage = text;
                        this.setState(this.state)
                    }}
                    placeholder="Enter ping message"
                    style={{
                        marginLeft:20,
                        marginTop:10,
                        paddingVertical:5
                    }}></TextInput>
                }
                {this.state.pingMode && 
                <TouchableOpacity onPress={()=>{
                    console.log(this.state.toPing)
                }}>
                    <Text style={{
                        fontFamily: 'Arial',
                        fontSize: 18,
                        fontWeight: 'bold',
                        color:"orange",
                        margin: 20,
                    }}>Send ping</Text>
                </TouchableOpacity>
            }
                
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 25,
                    fontWeight: 'bold',
                    margin: 20,
                }}>Friend Suggestions</Text>
                {
                    this.state.friendSuggestions.map((id, index) => {
                        return (
                            <Friend isUser={false} key={index} id={id} navigation={this.props.navigation} />
                        );
                    })
                }
            </View>
        );
    }
}

SuggestionsList = (props) => {
    if (props.suggestions.length == 0) {
        return (
            <View>
            </View>
        )
    } else {
        var text_ids = []
        for (const elem of props.suggestions) {
            text_ids.push(
                <Text> {elem} </Text>
            )
        }
        return text_ids
    }

}
