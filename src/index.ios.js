/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import config from './config'
import * as firebase from 'firebase';

const styles = require('./styles.js');

const firebaseApp = firebase.initializeApp(config.firebase);

class FirebaseRN extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I’m a container lol!</Text>
      </View>
    );
  }
}



AppRegistry.registerComponent('FirebaseRN', () => FirebaseRN);
