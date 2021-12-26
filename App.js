import React from 'react';
import * as firebase from "firebase";
import FlashMessage from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './CoreScreens/home';
import DetailsScreen from './Events/DetailsContainer';
import FriendScreen from './Friends/friendSuggestions';
import CreateScreen from './Events/createEvent';
import NoChatScreen from './Chats/emptyChat';
import ChatScreen from './Chats/userChats';
import PreviewScreen from './Events/previewEvent';
import SubmitScreen from './Events/submitEvent';
import MessageScreen from './Chats/chat';
import LoginScreen from './CoreScreens/login';
import RegisterScreen from './CoreScreens/register';
import ProfileScreen from './Profiles/userProfile';
import FriendProfileScreen from './Profiles/friendProfile';
import NotifScreen from './CoreScreens/notifications';
import GlobalState from './Context/globalState';

import firebaseInit from './Context/firebaseInit';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name = "Explore"
        component = { HomeScreen }
        options = {{ 
          headerLeft: () => {
            return <></>
          }, 
          headerRight: () => { 
            return (
              <TouchableOpacity onPress = {() => navigation.navigate("Updates")}>
                <Ionicons name = {"notifications-outline"} size = {25} style = {{ marginRight: 15 }} />
              </TouchableOpacity>
            )
          } 
        }}
      />
      <Stack.Screen 
        name = "Details"
        component = { DetailsScreen }
      />
      <Stack.Screen 
        name = "Updates"
        component = { updateStack }
      />
    </Stack.Navigator>
  )
}

function updateStack() {
  return (
    <TopTab.Navigator
      screenOptions = {{
        tabBarLabelStyle: { fontSize: 10 },
      }}
    >
      <TopTab.Screen
        name = "Notifications"
        component = { NotifScreen }
      />
      <TopTab.Screen 
        name = "Event Updates"
        component = { NotifScreen }
      />
    </TopTab.Navigator>
  )
}

function FriendStack() {
  return (
    <Stack.Navigator screenOptions = {{ headerShown: false }}>
      <Stack.Screen 
        name = "Friend List" 
        component = { FriendScreen }
      />
      <Stack.Screen 
        name = "View Profile"
        component = { FriendProfileScreen }
      />
    </Stack.Navigator>
  )
}

function AddStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name = "Create Event"
        component = { CreateScreen }
        options = {{ 
          headerLeft: () => {
            return <></>
          }, 
        }}
      />
      <Stack.Screen 
        name = "Preview Event"
        component = { PreviewScreen }
      />
      <Stack.Screen
        name = "Submit Event"
        component = { SubmitScreen }
      />
    </Stack.Navigator>
  )
}

function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen 
        name = "Chat List"
        component = {ChatScreen}
        options = {{ 
          headerLeft: () => {
            return <></>
          }, 
        }}
      />
      <Stack.Screen 
        name = "Messages"
        component = {MessageScreen}
      />
    </Stack.Navigator>
  )
}

function MainTab() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
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

        return <Ionicons name = {iconName} size = {30} color = {color} />;
      },
      activeTintColor: '#2d6ff4',
      inactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name = "Events" component = {HomeStack} options = {{ headerShown: false, tabBarShowLabel: false }} />
      <Tab.Screen name = "Friends" component = {FriendStack} options = {{ tabBarShowLabel: false }} />
      <Tab.Screen name = "Create" options = {{ headerShown: false, tabBarShowLabel: false }} component = {AddStack} />
      <Tab.Screen name = "Chats" component = {ChatStack} options = {{ headerShown: false, tabBarShowLabel: false }} />
      <Tab.Screen name = "Profile" component = {ProfileScreen} options = {{ tabBarShowLabel: false }} />
    </Tab.Navigator>
  );
}

function Authentication() {
  return (
    <Stack.Navigator 
      screenOptions = {{ headerShown: false, headerBackTitleVisible: false, gestureEnabled: false }}
    >
      <Stack.Screen name = "Login" component = {LoginScreen} />
      <Stack.Screen name = "Register" component = {RegisterScreen} />
      <Stack.Screen name = "App" component = {MainTab} />
    </Stack.Navigator>
  );
}

export default function App() {

  if (!firebase.apps.length) { 
    firebase.initializeApp(firebaseInit.firebaseConfig) 
  }
  
  return (
    <GlobalState>
      <NavigationContainer>
        <Authentication />
        <FlashMessage position = "bottom"/>
      </NavigationContainer>
    </GlobalState>
  );
}
