import React, { Component } from 'react';
import { View, Text} from 'react-native';
import firebase from 'firebase';

class EventList extends Component {
  const storageRef = firebase.storage().ref();
  const imagesRef = storageRef.child('abc');
  const wedRef = imagesRef.child('wedI.jpg');

  render() {
    return (
      <View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image
            source={{ uri: wedRef }}
          />
        </View>
        <Text> TODO </Text>
        <Text> list of weddings </Text>
        <Text> Wedding asdf </Text>
        <Text> Wedding asdf </Text>
        <Text> Wedding asdf </Text>
        <Text> Wedding asdf </Text>
        <Text> Wedding asdf </Text>
        <Text> Wedding asdf </Text>
      </View>
    )
  }
}

export default EventList;
