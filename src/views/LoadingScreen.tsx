import React from 'react';
import { Text, Image, View } from 'react-natve';
import { Spinner } from '../components';

class LoginForm extends Component {
  render(){
    <View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image
        source={require('../icon.png')}
      />
      </View>

      <Spinner />
    </View>
  }
}

export default LoadingScreen;
