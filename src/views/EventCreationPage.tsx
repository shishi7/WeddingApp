import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator
} from 'react-native';
import { PEACH } from '../consts/colors';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { eventNameChanged, description_changed, addEvent } from '../actions';
import { Card, CardItem } from '../components';
import { Button } from 'react-native-elements';

class EventCreationPage extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  onAddPress() {
    const { name, description, navigation } = this.props;
    //this.props.loginUser({ email, password, navigation });
    this.props.addEvent({ name, description, navigation });
  }

  onNameChange(text){
    this.props.eventNameChanged(text);
  }

  onDescriptionChanged(text){
    this.props.description_changed(text);
  }


  render()
  {
    return(
      <View>
        <View style={styles.headerStyle}>
        <Image
          source={require('../small_logo.png')}
        />
        </View>
        <View style={{
          padding: 10,
          flexDirection: 'row',
          flex: 1,
          marginBottom: 50
      }}>
          <TextInput
            style={{
              flex: 2,
              height: 40,
            }}
            placeholder="Type here to translate!"
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.name}
          />
        </View>

        <Card>
          <TextInput
            multiline
            style={{ height: 100, backgroundColor: '#ccc' }}
            onChangeText={this.onDescriptionChanged.bind(this)}
            value={this.props.description}
           />
        </Card>
        <Card>
          <Button
              onPress={this.onAddPress.bind(this)}
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
        </Card>
      </View>
    )
  }
}

const styles ={
  headerStyle: {
    backgroundColor: PEACH,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputStyle: {
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 40,
    flex: 2
  },

  labelStyle: {
    color: 'black',
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },

  containerStyle: {
    marginTop: 20,
    height: 80,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

const mapStateToProps = state => {
  return {
    name: state.event.name,
    description: state.event.description,
  };
};

export default connect(mapStateToProps, {
  eventNameChanged,
  description_changed,
  addEvent
})(EventCreationPage);
