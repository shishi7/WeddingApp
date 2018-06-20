import React, { Component } from 'react';
import { View, Image, TextInput, Text } from 'react-native';
import { PEACH } from '../consts/colors';
import { Card, CardItem } from '../components';
import { Button } from 'react-native-elements';
class EventCreationPage extends Component {

  onAddPress() {

  }

  constructor(props) {
  super(props);
  this.state = {text: ''};
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
            onChangeText={(text) => this.setState({text})}
          />
        </View>

        <Card>
          <TextInput multiline style={{ height: 100, backgroundColor: '#ccc' }} />
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

export default EventCreationPage;
