
import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { PEACH } from '../consts/colors';
import { Card, CardItem, Input, CustomButton, Header, Spinner } from '../components';

import { toForgotPassword, SignOut } from '../actions';

class Profile extends Component {

  onForgotPassPress() {
    this.props.toForgotPassword({ navigation: this.props.navigation });
  }

  onSignOutPress() {
    this.props.SignOut({ navigation: this.props.navigation });
  }

  render() {
    return (


      <View style={styles.viewStyle}>
        <View style={styles.headerStyle}>

          <Image
            source={require('../small_logo.png')}
          />


        </View>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image
          source={require('../icon3.png')}
        />
        </View>
        <Card>

          <CardItem>
            <Text style={{fontSize: 18}}>Your email: { firebase.auth().currentUser.email !== null ? firebase.auth().currentUser.email : '' } </Text>
          </CardItem>

          <CardItem>
            <Text style={{fontSize: 18}}>Your Name: { firebase.auth().currentUser.displayName !== null ? firebase.auth().currentUser.displayName : '' } </Text>
          </CardItem>

        </Card>

        <View style={{flex: 1, marginTop: 70}}>

            <Button
              title="Change password"
                onPress = {this.onForgotPassPress.bind(this)}
              color='black'
              titleStyle={{ fontWeight: "700", color: "#ff00ff" }}
              buttonStyle={{
                backgroundColor: 'white',
                width: 300,
                height: 45,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 1,
                alignSelf: 'center'
              }}
              containerViewStyle={{width: '100%', marginLeft: 0}}
              containerStyle={{ marginTop: 20 }}
            />

            <Button
              title="Sign out"
              onPress={this.onSignOutPress.bind(this)}
              color='black'
              titleStyle={{ fontWeight: "700", color: "#ff00ff" }}
              buttonStyle={{
                backgroundColor: 'white',
                width: 300,
                height: 45,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 1,
                alignSelf: 'center'
              }}
              containerViewStyle={{width: '100%', marginLeft: 0}}
              containerStyle={{ marginTop: 20 }}
            />






        </View>


      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1
  },

  buttonStyle: {
    backgroundColor: '#fff',
    borderColor: '#EEDFA6',
    borderWidth: 2,

  },

  imageStyle: {
    height: 40,
    width: 40
  },

  lowerButtonsStyle: {
    alignSelf: 'center',
    height: 45,
    width: 160,
    backgroundColor: PEACH,
    borderColor: 'black',
    borderBottomWidth: 1,
},

lowerButtonsStyle1: {
  alignSelf: 'center',
  height: 45,
  width: 160,
  backgroundColor: PEACH,
  borderColor: 'transparent'
},

  lowerTextStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1
  },
  headerStyle: {
    backgroundColor: PEACH,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3,
    flexDirection: 'row',
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {
  SignOut, toForgotPassword
})(Profile);
