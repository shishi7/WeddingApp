import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChaged, loginUser } from '../actions';
import { Card, CardItem, Input, Button, Header, Spinner } from '../components';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChaged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
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
    <Button onPress={this.onButtonPress.bind(this)}>
      login
    </Button>
  );
}
  render() {
    return (
      <View>
        <Header headerText="LogIn" />
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

          {this.renderError()}

          <CardItem>
            {this.renderButton()}
          </CardItem>

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

export default connect(mapStateToProps, { emailChanged, passwordChaged, loginUser })(LoginForm);
