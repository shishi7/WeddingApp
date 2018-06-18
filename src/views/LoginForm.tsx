import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

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

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <CustomButton
        onPress={this.onButtonPress.bind(this)}
        style={styles.buttonStyle}>
        Войти
      </CustomButton>
    );
  }
  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image
          source={require('../icon.png')}
        />
        </View>

        <Card>
          <CardItem>
            <Input
              label="Email"
              placeholder="email@example.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardItem>

          <CardItem>
            <Input
              secureTextEntry
              label="password"
              placeholder="******"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardItem>
        </Card>

        <Card>
          {this.renderError()}

          <CardItem style={{backgroundColor:'#FAC7A8'}}>
            {this.renderButton()}
          </CardItem>

        </Card>

        <View style={{flex: 1}}>
          <TouchableWithoutFeedback
            onPress = {this.onForgotPassPress.bind(this)}
          >
          <View style={styles.lowerButtonsStyle}>
            <Text style={styles.lowerTextStyle}>
              Forgot password?
            </Text>
          </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress = {this.onCreateAccPress.bind(this)}
          >
          <View style={styles.lowerButtonsStyle}>
            <Text style={styles.lowerTextStyle}>
              Create account
            </Text>
          </View>
          </TouchableWithoutFeedback>
        </View>
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
    backgroundColor: PEACH,
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
