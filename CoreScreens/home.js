import React from 'react';
import Event from '../Events/event';
import { SafeAreaView, ScrollView } from 'react-native';
import { styles } from '../styles';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
export default class extends React.Component{
  state = {
    ids : []
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const url = "http://eventcore.herokuapp.com/queryId";
    fetch(url)
    .then(res => res.json())
    .then(resJson => {
      var currids = [];
      for(let i = 1; i <= resJson; i++) {
        currids.push(i);
      }
      this.state.ids = currids;
      this.setState(this.state);
    })
  }

  render() {
      return (
          <SafeAreaView>
            <ScrollView vertical = {true} decelerationRate = {0} snapToInterval = {windowHeight / 1.5 + 125} snapToAlignment = {"center"}>
              {
                this.state.ids.map((id) => {
                  return <Event key = {id} id = {id} navigation = {this.props.navigation} />
                })
              }
              <StatusBar />
            </ScrollView>
          </SafeAreaView>
        );
  }
}
