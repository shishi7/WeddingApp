import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { emailChanged, resetPass } from '../actions';
import { Card, CardItem, Input, CustomButton, Header, Spinner } from '../components';
import { PEACH } from '../consts/colors';

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
      <Button
        title="Send"
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
              placeholder="example@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardItem>
        </Card>
        <View style={{    alignSelf: 'center'}}>
          {this.renderButton()}
        </View>

          {this.renderError()}
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
  const { email, error } = auth;
  return { email, error };
};

export default connect(mapStateToProps, {
  emailChanged, resetPass
})(ResetPass);
