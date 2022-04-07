import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import Event from '../Events/event';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native'
import { windowHeight } from '../styles';
import Context from '../Context/context';

export default ({ navigation }) => {
  const context = useContext(Context);
  const eventCardHeight = windowHeight - useBottomTabBarHeight() - useHeaderHeight()

  const [ids, setIds] = useState(context.pendingEvents);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef)

  useEffect(context.registerTokenAsync, [])

  useFocusEffect(
    useCallback(() => {
      const updateEventList = () => {
        if (context.timeSinceUpdate() >= 3.) {
          scrollRef.current.scrollTo({ y: 0, animated: true })
          refreshEvents(false)
          context.modifyState(["pendingEvents"], [ids])
        }
      }
      return () => updateEventList()
    }, [navigation])
  )

  const refreshEvents = (showUpdate) => {
    if (showUpdate)
      setRefreshing(true);
    fetch(`http://yolo-backend.herokuapp.com/user/${context.id}`)
      .then(res => res.json())
      .then(json => {
        setIds(json.pendingEvents);
        context.modifyState(["pendingEvents"], [ids])
        context.storeCreds()
        if (showUpdate)
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
            onRefresh={() => refreshEvents(true)}
          />
        }
        style={{ height: eventCardHeight * ids.length }}
        ref={scrollRef}
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
