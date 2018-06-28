import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';
import { Spinner } from '../components';
import { PEACH } from '../consts/colors';

const config = {
  apiKey: "AIzaSyCmI91MLgc1lAPV7eZRec8i3hJUOE1iiEU",
  authDomain: "weddingapp-11218121926.firebaseapp.com",
  databaseURL: "https://weddingapp-11218121926.firebaseio.com",
  projectId: "weddingapp-11218121926",
  storageBucket: "weddingapp-11218121926.appspot.com",
  messagingSenderId: "903720917602"
};
firebase.initializeApp(config);

class Loading extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Auth');
    })
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: PEACH,
        }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Image
            source={require('../icon.png')}
          />
          </View>

          <Spinner />
      </View>
    );
  }
}

export default Loading;
