import React, { Component } from 'react';
import { View, Text} from 'react-native';
import firebase from 'firebase';

class Profile extends Component {

  render() {
    return (
      <View>
        <Text> { firebase.auth().currentUser.email } </Text>
      </View>
    )
  }
}

export default Profile;
