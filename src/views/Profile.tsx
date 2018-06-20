import React, { Component } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { View, Text} from 'react-native';

class Chat extends Component {
=======
=======
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86
import { View, Text, TouchableNativeFeedback } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { SignOut } from '../actions';

class Profile extends Component {

  onSignOutPress() {
    this.props.SignOut({ navigation: this.props.navigation });
  }
<<<<<<< HEAD
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86
=======
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86

  render() {
    return (
      <View>
<<<<<<< HEAD
<<<<<<< HEAD
        <Text> TODO Chat</Text>
=======
=======
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86
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
<<<<<<< HEAD
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86
=======
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86
      </View>
    )
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
export default Chat;
=======
export default connect(undefined, {
  SignOut
})(Profile);
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86
=======
export default connect(undefined, {
  SignOut
})(Profile);
>>>>>>> 7b1d62c7fc6921dc83b0107824625c5d76d58d86
