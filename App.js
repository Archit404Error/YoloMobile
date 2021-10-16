import React from 'react';
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
import ProfileScreen from './CoreScreens/profile';
import NotifScreen from './CoreScreens/notifications';
import GlobalState from './Context/globalState';

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

function AddStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name = "Create Event"
        component = { CreateScreen }
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
      tabBarIcon: ({ focused, color, size }) => {
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

        return <Ionicons name = {iconName} size = {size} color = {color} />;
      },
      activeTintColor: '#2d6ff4',
      inactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name = "Events" component = {HomeStack} options = {{ headerShown: false }} />
      <Tab.Screen name = "Friends" component = {FriendScreen} />
      <Tab.Screen name = "Create"
        options = {{
          headerShown: false
        }}
        component = {AddStack} />
      <Tab.Screen name = "Chats" component = {ChatStack} options = {{ headerShown: false }} />
      <Tab.Screen name = "Profile" component = {ProfileScreen} />
    </Tab.Navigator>
  );
}

function Authentication() {
  return (
    <Stack.Navigator screenOptions = {{ headerShown: false, headerBackTitleVisible: false }}>
      <Stack.Screen name = "Login" component = {LoginScreen} />
      <Stack.Screen name = "Register" component = {RegisterScreen} />
      <Stack.Screen name = "App" component = {MainTab} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GlobalState>
      <NavigationContainer>
        <Authentication />
      </NavigationContainer>
    </GlobalState>
  );
}
