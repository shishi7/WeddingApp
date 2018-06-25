import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
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
      <Button
        title="Login"
        onPress={this.onButtonPress.bind(this)}
        color='black'
        titleStyle={{ fontWeight: "700", color: "#ff00ff" }}
        buttonStyle={{
          marginTop: 20 ,
          backgroundColor: 'white',
          width: 300,
          height: 45,
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 1
        }}
        containerViewStyle={{width: '100%', marginLeft: 0}}
        containerStyle={{ marginTop: 20 }}
      />
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
        <View style={{    alignSelf: 'center',}}>
          {this.renderButton()}
        </View>
        {this.renderError()}

        <View style={{flex: 1, marginTop: 70}}>
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
          <View style={styles.lowerButtonsStyle1}>
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

const styles = {
  viewStyle: {
    backgroundColor: PEACH,
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
  emailChanged,
  loginUser,
  passwordChanged,
  toForgotPassword,
  toAccCreate
})(LoginForm);
