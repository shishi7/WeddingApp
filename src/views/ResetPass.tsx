import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, resetPass } from '../actions';
import { Card, CardItem, Input, CustomButton, Header, Spinner } from '../components';

class ResetPass extends Component {
  static navigationOptions = {
    header: null
  };
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onButtonPress() {
    const { email, navigation } = this.props;

    this.props.resetPass({ email, navigation });

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
    return (
      <CustomButton
        onPress={this.onButtonPress.bind(this)}
        style={styles.buttonStyle}>
        Отправить
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
                placeholder="example@gmail.com"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
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
  const { email, error } = auth;
  return { email, error };
};

export default connect(mapStateToProps, {
  emailChanged, resetPass
})(ResetPass);
