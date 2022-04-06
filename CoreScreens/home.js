import React, { useState, useContext, useEffect } from 'react';
import Event from '../Events/event';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/elements'
import { styles, windowHeight } from '../styles';
import Context from '../Context/context';

export default ({ navigation }) => {
  const context = useContext(Context);
  const eventCardHeight = windowHeight - useBottomTabBarHeight() - useHeaderHeight()

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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        vertical={true}
        decelerationRate={0}
        snapToInterval={eventCardHeight}
        snapToAlignment={"start"}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshEvents}
          />
        }
        style={{ height: eventCardHeight * ids.length }}
      >
        {
          ids.map(id => {
            return (
              <Event
                key={id}
                id={id}
                cardHeight={eventCardHeight}
                navigation={navigation}
              />
            )
          })
        }
        <StatusBar />
      </ScrollView>
    </SafeAreaView>
  );
}
