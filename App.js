import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import firebase from "firebase/compat/app";
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import FlashMessage from 'react-native-flash-message';
import { Alert, TouchableOpacity, AppState, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './CoreScreens/home';
import DetailsScreen from './Events/detailsContainer';
import FriendScreen from './Friends/friendSuggestions';
import CreateScreen from './Events/createEvent';
import ChatScreen from './Chats/userChats';
import ChatSettingsScreen from './Chats/chatSettings';
import PreviewScreen from './Events/previewEvent';
import SubmitScreen from './Events/submitEvent';
import MessageScreen from './Chats/chat';
import LoginScreen from './CoreScreens/login';
import RegisterScreen from './CoreScreens/register';
import ProfileScreen from './Profiles/userProfile';
import FriendProfileScreen from './Profiles/friendProfile';
import EventNotifScreen from './CoreScreens/eventNotifications';
import EventStatScreen from './Notifications/eventStats';
import UserNotifScreen from './CoreScreens/userNotifications';
import FriendList from './Components/Lists/friendList';
import EventList from './Components/Lists/eventList';

import GlobalState from './Context/globalState';

import firebaseInit from './Context/firebaseInit';
import Context from './Context/context';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
      />
      <Stack.Screen
        name="Updates"
        component={updateStack}
      />
    </Stack.Navigator>
  )
}

function updateStack() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 10 },
      }}
    >
      <TopTab.Screen
        name="Notifications"
        component={UserNotifScreen}
      />
      <TopTab.Screen
        name="Event Updates"
        component={eventStatStack}
      />
    </TopTab.Navigator>
  )
}

function eventStatStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Created Events"
        component={EventNotifScreen}
      />
      <Stack.Screen
        name="Event Stats"
        component={EventStatScreen}
      />
    </Stack.Navigator>
  )
}

function FriendStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Friend List"
        component={FriendScreen}
      />
      <Stack.Screen
        name="View Profile"
        options={{ headerBackTitle: 'friends' }}
        component={FriendProfileScreen}
      />
      <Stack.Screen
        name="View friends"
        options={{ headerBackTitle: 'Back' }}
        component={FriendList}
      />
      <Stack.Screen
        name="View events"
        options={{ headerBackTitle: 'Back' }}
        component={EventList}
      />
    </Stack.Navigator>
  )
}

function AddStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Event"
        component={CreateScreen}
        options={{
          headerLeft: () => {
            return <></>
          },
        }}
      />
      <Stack.Screen
        name="Preview Event"
        component={PreviewScreen}
      />
      <Stack.Screen
        name="Submit Event"
        component={SubmitScreen}
      />
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerBackTitleVisible: false, gestureEnabled: false }}>
      <Stack.Screen
        name="Profile"
        options={{ headerBackTitle: 'Back' }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="View friends"
        options={{ headerBackTitle: 'Back' }}
        component={FriendList}
      />
      <Stack.Screen
        name="View events"
        options={{ headerBackTitle: 'Back' }}
        component={EventList}
      />

    </Stack.Navigator>
  )
}

function ChatStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen
        name="Chat List"
        component={ChatScreen}
        options={{
          headerLeft: () => {
            return <></>
          },
        }}
      />
      <Stack.Screen
        name="Messages"
        component={MessageScreen}
        options={{ headerTitle: props => <Text>{props.headerTitle}</Text> }}
      />
      <Stack.Screen
        name="Chat Settings"
        component={ChatSettingsScreen}
      />
    </Stack.Navigator>
  )
}

function MainTab({ navigation, setLoggedIn }) {
  const context = useContext(Context)

  const handleAppState = newState => {
    if (newState === "active") {
      context.socket.emit("appOpened", context.id)
      context.socket.emit("notificationsUpdated", context.id)
    }
  }

  useEffect(() => {
    AppState.addEventListener("change", handleAppState)
    // Need to use deprecated method for now because of expo RN version
    return () => AppState.removeEventListener("change", handleAppState)
  }, [])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Events') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'people-sharp' : 'people-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={30} color={focused ? '#ec632f' : 'gray'} />;
        },
      })}
    >
      <Tab.Screen name="Events" component={HomeStack} options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tab.Screen name="Friends" component={FriendStack} options={{ tabBarShowLabel: false }} />
      <Tab.Screen name="Create" options={{ headerShown: false, tabBarShowLabel: false }} component={AddStack} />
      <Tab.Screen name="Chats" component={ChatStack} options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{
        tabBarShowLabel: false,
        headerRight: () => (
          <TouchableOpacity onPress={() => {
            Alert.alert(
              "Log out",
              "Are you sure you would like to log out?",
              [
                {
                  text: "No",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    context.removeCreds();
                    if (setLoggedIn)
                      setLoggedIn(false)
                    else
                      navigation.navigate("Login", {
                        username: "",
                        password: ""
                      })
                  }
                }
              ]
            )
          }}>
            <MaterialIcons name={"logout"} size={25} style={{ marginRight: 15 }} />
          </TouchableOpacity>
        )
      }} />

    </Tab.Navigator>
  );
}

function Authentication() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerBackTitleVisible: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="App" component={MainTab} />
    </Stack.Navigator>
  );
}

function DetermineScreen() {
  const context = useContext(Context)
  const [loggedIn, setLoggedIn] = useState(false);
  const [config, setConfig] = useState({ screens: { Events: { screens: { Details: 'event/:id' } } } });

  const linkConfig = {
    prefixes: [Linking.createURL('/')],
    config,
  }

  // A test for login stuff: context.removeCreds()

  useEffect(() => {
    (async () => {
      let loginStatus = await context.fetchCreds()
      setLoggedIn(await loginStatus)
      console.log(await loginStatus)
      if (!await loginStatus && context.id !== -1)
        setConfig({ screens: { App: { screens: { Events: { screens: { Details: 'event/:id' } } } } } })
    })()
  }, [context.id])

  useEffect(() => {
    if (!loggedIn)
      setConfig({ screens: { Events: { screens: { Details: 'event/:id' } } } })
  }, [loggedIn])

  return (
    <NavigationContainer linking={linkConfig}>
      {loggedIn ?
        <MainTab setLoggedIn={setLoggedIn} /> :
        <Authentication />
      }
      <FlashMessage position="bottom" />
    </NavigationContainer>
  )
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default function App() {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseInit.firebaseConfig)
  }

  return (
    <GlobalState>
      <DetermineScreen />
    </GlobalState>
  );
}
