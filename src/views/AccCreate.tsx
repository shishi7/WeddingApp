import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, fullNameChanged, loginUser, createUser } from '../actions';
import { Card, CardItem, Input, CustomButton, Header, Spinner } from '../components';

class AccCreate extends Component {
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
    const { email, password, fullName } = this.props;

    this.props.createUser({ email, password, fullName });

  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: '#FAC7A8' }}>
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
                placeholder="Двое Кимов, не считая Шина"
                onChangeText={this.onNameChange.bind(this)}
                value={this.props.fullName}
              />
            </CardItem>

            <CardItem>
              <Input
                label="Email"
                placeholder="sidimiperdim@gmail.com"
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

            <CardItem style={{backgroundColor:'#FAC7A8'}}>
              {this.renderButton()}
            </CardItem>

          </Card>

          </View>
      );
    }
  }



  const styles = {
    viewStyle: {
      backgroundColor: '#FAC7A8',
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
