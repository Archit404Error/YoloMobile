import React from 'react';
import { Dimensions } from 'react-native';

export abstract class YoloStylesheet {
    windowWidth: number;
    windowHeight: number;
    screenWidth: number;
    screenHeight: number;
    abstract getStyles() : any;

    constructor() {
        // Height of the entire phone window
        this.windowWidth = Dimensions.get('window').width;
        this.windowHeight = Dimensions.get('window').height;

        // Height of screen minus nav bar
        this.screenWidth = Dimensions.get('screen').width;
        this.screenHeight = Dimensions.get('screen').height;
    }
}