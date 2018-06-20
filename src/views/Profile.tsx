import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { SignOut } from '../actions';

class Profile extends Component {

  onSignOutPress() {
    this.props.SignOut({ navigation: this.props.navigation });
  }

  render() {
    return (
      <View>
        <View>
          <Text> { firebase.auth().currentUser.email } </Text>
        </View>

        <View>
          <TouchableNativeFeedback
            onPress={this.onSignOutPress.bind(this)}
          >
            <Text>SignOut</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

export default connect(undefined, {
  SignOut
})(Profile);
