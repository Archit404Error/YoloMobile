import React from "react";
import { Text, SafeAreaView, ScrollView, View, KeyboardAvoidingView, Modal, TextInput, TouchableOpacity } from "react-native";
import Context from "../Context/context";
import { SearchBar } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';

import { SuggestionCell } from "../Components/suggestionCell";

import FriendCard from "./friendCard";
import PingCell from "../Components/pingCell";

import Story from './story';
import UploadStory from "./uploadStory";
import { styles } from "../styles";
import UpcomingEvents from "../Components/upcomingEvents";


export default class extends React.Component {
    static contextType = Context;

    state = {
        toPing: new Set(),
        stories: [],
        friendIds: new Set(),
        friendRes: new Set(),
        filteredFriends: new Set(),
        pingMode: false,
        pingMessage: "",
        friendText: "",
        modalVisible: false,
        searchSuggestions: new Set()
    }

    constructor(props) {
        super(props);
    }

    resetFilter = () => {
        this.state.filteredFriends = new Set()
        this.setState(this.state)
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
                    this.state.friendIds.add(elem)
                }
                this.setState(this.state)
                this.state.friendIds.forEach(elem => {
                    fetch(`http://yolo-backend.herokuapp.com/user/${elem}`)
                        .then(resp => resp.json())
                        .then(res => {
                            this.state.friendRes.add({
                                name: res.name,
                                id: res._id,
                                didCheck: false
                            })
                            this.setState(this.state)
                        })
                })
            })
    }

    filterFriends = (query) => {
        query = query.toLowerCase();
        for (const friend of this.state.friendRes) {
            if (friend.name.toLowerCase().includes(query)) {
                this.state.filteredFriends.add(friend)
                this.setState(this.state)
            }
        }
    }

    addPing = (id) => {
        this.state.toPing.add(id)

        for (const elem of this.state.friendRes) {
            if (elem.id === id) {
                elem.didCheck = true
            }
        }
    }

    removePing = (id) => {
        this.state.toPing.delete(id)
        for (const elem of this.state.friendRes) {
            if (elem.id === id)
                elem.didCheck = false
        }
    }

    fetchSuggestions = (query) => {
        fetch(`http://yolo-backend.herokuapp.com/searchSuggestions/${context.id}/${query}`)
            .then(resp => resp.json())
            .then(res => {
                for (const elem of res) {
                    this.state.searchSuggestions.add(elem)
                }
                this.setState(this.state)
            })
    }

    fetchStories() {
        fetch(`http://yolo-backend.herokuapp.com/eventStories/${this.context.id}`)
            .then(resp => resp.json())
            .then(res => {
                this.state.stories = res;
                this.setState(this.state);
            })
    }

    componentDidMount() {
        this.fetchFriends()
        this.fetchStories()
        this.setState(this.state)

        this.props.navigation.setOptions({
            headerLeft: () => (<></>)
        })

        this.context.socket.on("newStoryUpdate", this.fetchStories)
        this.context.socket.on("eventsUpdated", this.fetchStories)
    }

    componentWillUnmount() {
        this.context.socket.off("newStoryUpdate", this.fetchStories)
        this.context.socket.off("eventsUpdated", this.fetchStories)
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView>
                    <ScrollView horizontal>
                        <View style={{ flexDirection: "row", padding: 20 }}>
                            <UploadStory />
                            {
                                this.state.stories.map((storyObj, index) =>
                                    <Story
                                        key={index}
                                        id={storyObj.id}
                                        preview={storyObj.preview}
                                        images={storyObj.storyImages}
                                    />
                                )
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => {
                                this.state.modalVisible = false;
                                this.setState(this.state);
                            }}>
                                <Ionicons name="close" size={30} color="orange"></Ionicons>
                            </TouchableOpacity>

                            <SearchBar
                                placeholder="Search for your friends"
                                lightTheme={true}
                                value={this.state.friendText}
                                platform={Platform.OS}
                                containerStyle={{ height: 70 }}
                                inputContainerStyle={{ height: 1 }}
                                onChangeText={(text) => {
                                    this.resetFilter()
                                    this.setState(this.state)
                                    this.filterFriends(text)
                                    this.state.friendText = text
                                }}
                                style={{ fontSize: 15 }} />
                            {
                                Array.from(this.state.filteredFriends).map(res =>
                                    <PingCell addPing={this.addPing} removePing={this.removePing} didCheck={res.didCheck} key={res.id} id={res.id} />
                                )
                            }
                            <TextInput
                                onChangeText={text => {
                                    this.state.pingMessage = text;
                                    this.setState(this.state)
                                }}
                                placeholderTextColor="grey"
                                placeholder="Enter ping message"
                                style={{
                                    marginLeft: 20,
                                    paddingVertical: 5
                                }}
                            />

                            <TouchableOpacity onPress={() => {
                                console.log(this.state.toPing)
                            }}>
                                <Text style={{
                                    fontFamily: 'OpenSans_500Medium',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: "orange",
                                    margin: 20,
                                }}>Send ping</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <SearchBar
                    placeholder="Search for people and events..."
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
                {/* <TouchableOpacity onPress={() => {
                    this.state.modalVisible = !this.state.modalVisible;
                    this.setState(this.state);
                }}>
                    <Text style={{
                        fontFamily: 'OpenSans_500Medium',
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: "orange",
                        margin: 20,
                    }}>Ping your friends</Text>
                </TouchableOpacity> */}

                <Text style={styles.boldSectionHeader}>
                    Friend Suggestions
                </Text>

                <Context.Consumer>
                    {ctx =>
                        <ScrollView horizontal>
                            {
                                ctx.friendSuggs.map((id, index) =>
                                    <FriendCard id={id} key={index} navigation={this.props.navigation} />
                                )
                            }
                        </ScrollView>
                    }
                </Context.Consumer>

                <Text style={styles.boldSectionHeader}>Your Upcoming Events</Text>

                <UpcomingEvents id={this.context.id} navigation={this.props.navigation} />
            </ScrollView>
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
