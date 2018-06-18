import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import { emailChanged, passwordChanged, fullNameChanged, loginUser, createUser } from '../actions';
import { Card, CardItem, Input, CustomButton, Header, Spinner } from '../components';
import { PEACH } from '../consts/colors';

class AccCreate extends Component {
  static navigationOptions = {
    header: null
  };

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onNameChange(text) {
    this.props.fullNameChanged(text);
  }

  onButtonPress() {
    const { email, password, fullName, navigation } = this.props;

    this.props.createUser({ email, password, fullName, navigation });

  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: PEACH }}>
          <Text style={{ fontSize: 18, alignSelf: 'center', color: 'red' }}>
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
        Зарегистрироваться
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
                label="Full Name"
                placeholder="John Doe"
                onChangeText={this.onNameChange.bind(this)}
                value={this.props.fullName}
              />
            </CardItem>

            <CardItem>
              <Input
                label="Email"
                placeholder="example@gmail.com"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
              </CardItem>

            <CardItem>
              <Input
                secureTextEntry
                label="password"
                placeholder="**********"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </CardItem>
          </Card>

          <Card>
            {this.renderError()}

            <CardItem style={{backgroundColor:PEACH}}>
              {this.renderButton()}
            </CardItem>

          </Card>

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
    },
    imageStyle: {
      height: 40,
      width: 40
    }
  }

const mapStateToProps = ({ auth }) => {
  const { email, password, fullName, error, loading } = auth;
  return { email, password, fullName, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, fullNameChanged, createUser
})(AccCreate);
