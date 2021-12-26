import React from 'react';
import Event from '../Events/event';
import { SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import Context from '../Context/context';

const windowHeight = Dimensions.get('window').height;
export default class extends React.Component{
  static contextType = Context;

  state = {
    ids : []
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ ids : this.context.events })
  }

  render() {
      return (
          <SafeAreaView>
            <ScrollView 
              vertical = {true} 
              decelerationRate = {0} 
              snapToInterval = {windowHeight / 1.5 + 125} 
              snapToAlignment = {"center"}
            >
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
