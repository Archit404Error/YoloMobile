import { Dimensions } from 'react-native';
import { AuthStyles } from './Styles/authStyles';
import { ButtonStyles } from './Styles/buttonStyles';
import { ChatStyles } from './Styles/chatStyles';
import { ContainerStyles } from './Styles/containerStyles';
import { CreateEventStyles } from './Styles/createEventStyles';
import { EventStyles } from './Styles/eventStyles';
import { FriendStyles } from './Styles/friendStyles';
import { ProfileStyles } from './Styles/profileStyles';
import { StoryStyles } from './Styles/storyStyles';
import { TextStyles } from './Styles/textStyles';
import { SplashStyles } from './Styles/splashStyles';

import { StyleSheet } from 'react-native';
// Height of the entire phone window
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

// Height of screen minus nav bar
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

const stylesheets = [
    new AuthStyles(),
    new ButtonStyles(),
    new ChatStyles(),
    new ContainerStyles(),
    new CreateEventStyles(),
    new EventStyles(),
    new FriendStyles(),
    new ProfileStyles(),
    new StoryStyles(),
    new TextStyles(),
    new SplashStyles()
]

export const styles : any = StyleSheet.flatten(stylesheets.map(sheet => sheet.getStyles()))