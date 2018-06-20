import React, { Component } from 'react';
<<<<<<< HEAD
import { View, Text} from 'react-native';

class Chat extends Component {
=======
import { View, Text, TouchableNativeFeedback } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { SignOut } from '../actions';

class Profile extends Component {

  onSignOutPress() {
    this.props.SignOut({ navigation: this.props.navigation });
  }
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86

  render() {
    return (
      <View>
<<<<<<< HEAD
        <Text> TODO Chat</Text>
=======
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
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86
      </View>
    )
  }
}

<<<<<<< HEAD
export default Chat;
=======
export default connect(undefined, {
  SignOut
})(Profile);
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86
