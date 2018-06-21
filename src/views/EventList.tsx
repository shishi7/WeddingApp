import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, TouchableNative, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';
import { toAddWedding } from '../actions';
import { Card, CardItem, Input, CustomButton, Header, Spinner } from '../components';
import { PEACH } from '../consts/colors';

class EventList extends Component {
  static navigationOptions = {
    header: null
  };

  onPlusPress() {
    this.props.toAddWedding({ navigation: this.props.navigation });
  }

  constructor(props) {
  super(props);
  this.state = { url:  '' } ;
}

 componentWillMount(){
   const imageRef = firebase.storage().ref().child('abc/wed2.JPG');
   const sampleImage = imageRef.getDownloadURL().then(result =>  this.setState({ url: result }));
 }


  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.headerStyle}>
        <Image
          source={require('../small_logo.png')}
        />
        </View>
        <Card>
          <CardItem>
            <Button
                onPress={this.onPlusPress.bind(this)}
                icon={{
                  name: 'add-circle',
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
            </CardItem>
          <ScrollView>
            <View style={{
              flex: 1,
              overflow: 'hidden',
              alignItems: 'center',
              position: 'relative',
              margin: 10
            }}>
              <Image
                style={{width: 100, height: 100}}
                source={{ uri: `${this.state.url}` }}
              />
            </View>
            <Image
              source={require('../sample.jpg')}
            />
            <Image
              source={require('../sample.jpg')}
            />
          </ScrollView>
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

const styles = {
  viewStyle: {
    backgroundColor: '#fff',
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
  },
  headerStyle: {
    backgroundColor: PEACH,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3
  }
}


export default connect(mapStateToProps, {
  toAddWedding
})(EventList);
