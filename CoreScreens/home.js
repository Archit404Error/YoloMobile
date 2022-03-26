import React, { useState, useContext, useEffect } from 'react';
import Event from '../Events/event';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { windowHeight } from '../styles';
import Context from '../Context/context';

export default ({ navigation }) => {
  const context = useContext(Context);

  const [ids, setIds] = useState(context.pendingEvents);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(context.registerTokenAsync, [])

  const refreshEvents = () => {
    setRefreshing(true);
    fetch(`http://yolo-backend.herokuapp.com/user/${context.id}`)
      .then(res => res.json())
      .then(json => {
        setIds(json.pendingEvents);
        setRefreshing(false);
      })
  }

  return (
    <SafeAreaView>
      <ScrollView
        vertical={true}
        decelerationRate={0}
        snapToInterval={windowHeight / 1.5 + 112}
        snapToAlignment={"center"}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshEvents}
          />
        }
      >
        {
          ids.map(id => {
            return <Event key={id} id={id} navigation={navigation} />
          })
        }
        <StatusBar />
      </ScrollView>
    </SafeAreaView>
  );
}
