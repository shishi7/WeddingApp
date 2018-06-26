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
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'

import { eventNameChanged, description_changed, addEvent } from '../actions';
import { Card, CardItem } from '../components';
import { Button } from 'react-native-elements';

const storage = firebase.storage()
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (keyId, uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${keyId}`).child('main')

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}

class AvatarSet extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  _pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.launchImageLibrary({}, response  => {
      uploadImage(this.props.keyId, response.uri)
        .then(url => {
          const { currentUser } = firebase.auth();
          firebase.database().ref(`/users/${currentUser.uid}/events`)
          .once('value', snapshot => {
            var listOfEvents =[];
            listOfEvents = snapshot.val();
            if (listOfEvents !== null) listOfEvents.push(this.props.keyId);
            else listOfEvents = [this.props.keID];
            firebase.database().ref(`/users/${currentUser.uid}/events`)
            .update( listOfEvents );
          })
        })
        .catch(error => console.log(error))
    })
  }

  render()
  {
    console.log(this.props.keyId);
    return(
      <View>
        <View style={styles.headerStyle}>
        <Image
          source={require('../small_logo.png')}
        />
        </View>



        <View>
            <Button
                onPress={ () => this._pickImage() }
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
              {
                (() => {
                  switch (this.state.uploadURL) {
                    case null:
                      return null
                    case '':
                      return <ActivityIndicator />
                    default:
                      return (
                        <View>
                          <Image
                            source={{ uri: this.state.uploadURL }}
                            style={{ height: 200, resizeMode: 'contain' }}
                          />
                        </View>
                      )
                  }
                })()
              }
        </View>
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
    keyId: state.event.keyId
  };
};

export default connect(mapStateToProps, {
})(AvatarSet);
