import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import Event from '../Events/event';
import { SafeAreaView, ScrollView, RefreshControl, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { windowHeight } from '../styles';
import Context from '../Context/context';
import EmptyScreen from "../Components/emptyScreen";
import FilterEvents from '../Events/filterEvents';

export default ({ navigation }) => {
  const context = useContext(Context);
  const eventCardHeight = windowHeight - useBottomTabBarHeight() - useHeaderHeight()

  const [ids, setIds] = useState(context.pendingEvents);
  const [filters, setFilters] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef)

  navigation.setOptions({
    headerLeft: () => <></>,
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <FilterEvents setFilters={setFilters} />
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name={"notifications-outline"} size={25} style={{ marginRight: 15 }} />
        </TouchableOpacity>
      </View>
    ),
  })

  useEffect(() => {
    context.registerTokenAsync();
    context.socket.on("appOpened", refreshEvents)
    return () => context.socket.off("appOpened", refreshEvents)
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (context.timeSinceUpdate() >= 3.) {
        scrollRef.current.scrollTo({ y: 0, animated: true })
        refreshEvents(false)
        context.modifyState(["pendingEvents"], [ids])
      }
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
          ids.length == 0 &&
          <EmptyScreen
            header="No events right now!"
            desc="Cooking up fresh events for you, check back soon!"
          />
        }
        {
          ids.map(id => {
            return (
              <Event
                key={id + "homeSugg"}
                id={id}
                cardHeight={eventCardHeight}
                filters={filters}
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
