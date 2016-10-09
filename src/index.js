'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  ListView,
  AlertIOS,
} from 'react-native';

import config from './config';
import * as firebase from 'firebase';

const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const styles = require('./styles.js');

const firebaseApp = firebase.initializeApp(config.firebase);

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
    this.itemsRef = firebaseApp.database().ref().child('items');
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      const items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key,
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  _renderItem(item) {
    const onPress = () => {
      AlertIOS.prompt('Complete', null,
        [
          { text: 'Complete', onPress: (_text) => this.itemsRef.child(item._key).remove() },
          // eslint-disable-next-line
          { text: 'Cancel', onPress: (_text) => console.log('Cancel') },
        ],
        'default'
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

  _addItem() {
    AlertIOS.prompt('Add New Item', null,
      [{
        text: 'Add',
        onPress: (text) => {
          this.itemsRef.push({ title: text });
        },
      }],
      'plain-text'
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} style={styles.listview} />

        <ActionButton title="Add" onPress={this._addItem.bind(this)} />

      </View>
    );
  }
}

module.exports = Index;
