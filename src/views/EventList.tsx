import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, TouchableNative, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';
import { emailChanged, passwordChanged, loginUser, toForgotPassword, toAccCreate } from '../actions';
import { Card, CardItem, Input, CustomButton, Header, Spinner } from '../components';
import { PEACH } from '../consts/colors';

class LoginForm extends Component {
  static navigationOptions = {
    header: null
  };

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password, navigation } = this.props;

    this.props.loginUser({ email, password, navigation });
  }

  onForgotPassPress() {
    this.props.toForgotPassword({ navigation: this.props.navigation });
  }

  onCreateAccPress() {
    this.props.toAccCreate({ navigation: this.props.navigation });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.headerStyle}>
        <Image
          source={require('../small_logo.png')}
        />
        </View>
        <Card>
          <CardItem>
            <Button
                icon={{
                  name: 'fa-plus-square',
                  size: 30,
                  color: 'black'
                }}
                containerViewStyle={{width: '100%', marginLeft: 0}}
                buttonStyle={{
                  backgroundColor: "#fff",
                  borderColor: "#000",
                  borderWidth: 2,
                  borderRadius: 8
                }}
              />
            </CardItem>
          <ScrollView>
            <View style={{
              flex: 1,
              overflow: 'hidden',
              alignItems: 'center',
              position: 'relative',
              margin: 10
            }}>
              <Image
                resizeMode='cover'
                resizeMethod='scale'
                source={require('../sample.jpg')}
              />
            </View>
            <Image
              source={require('../sample.jpg')}
            />
            <Image
              source={require('../sample.jpg')}
            />
          </ScrollView>
        </Card>

      </View>
    );
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

const styles = {
  viewStyle: {
    backgroundColor: '#fff',
    flex: 1
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderColor: '#EEDFA6',
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
    borderColor: "transparent"
  },
  lowerTextStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 16,
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
    shadowOpacity: 0.3
  }
}


export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  toForgotPassword,
  toAccCreate
})(LoginForm);
