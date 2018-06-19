import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDS5rCta4AfPr0cy73O9u7t5Q2zmGNRLx0',
  authDomain: 'weddingapp-1337.firebaseapp.com',
  databaseURL: 'https://weddingapp-1337.firebaseio.com',
  projectId: 'weddingapp-1337',
  storageBucket: 'weddingapp-1337.appspot.com',
  messagingSenderId: '587460572824'
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
      <View>
        <Text>loading</Text>
      </View>
    );
  }
}

export default Loading;
