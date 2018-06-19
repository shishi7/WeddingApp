import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, TouchableNative, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
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

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: '#FAC7A8' }}>
          <Text style={{ fontSize: 20, alignSelf: 'center', color: 'red' }}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  // renderButton() {
  //   if (this.props.loading) {
  //     return <Spinner />;
  //   }
  //   return (
  //     <CustomButton
  //       onPress={this.onButtonPress.bind(this)}
  //       style={styles.buttonStyle}>
  //       Войти
  //     </CustomButton>
  //   );
  // }

  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={{
          alignItems: 'center'
        }}>
        <Image
          source={require('../small_logo.png')}
        />
        </View>
        <Card>
          <CardItem>
          {/* {this.renderError()} */}
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
  }
}


export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  toForgotPassword,
  toAccCreate
})(LoginForm);
