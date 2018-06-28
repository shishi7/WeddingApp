import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { toEvent, fetchImages } from '../actions';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import ImageRender from './ImageRender';


const storage = firebase.storage()
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (event, uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${event}`).child(`${sessionId}`)

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

class Event extends Component {

  constructor(props) {
   super(props);
   this.state = {}
  }

  componentWillMount(){
    this.props.fetchImages(this.props.event);
  }

  renderImage(image) {
    return <ImageRender image={image}
                  navigation={ this.props.navigation }
           />;
  }

  //Upload
  //arr = [nameOfPhoto];
  _pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.launchImageLibrary({}, response  => {
      uploadImage(this.props.event, response.uri)
        .then(url => {
          var listOfPhotos =[];
          firebase.database().ref(`events/${this.props.event}/photos`)
          .once('value', snapshot => {
            listOfPhotos = snapshot.val();
            if (listOfPhotos !== null){
            listOfPhotos.push(url);
          } else {
            listOfPhotos = [ url ];
          }
          firebase.database().ref(`events/${this.props.event}/photos`)
          .update( listOfPhotos );
          })
        })
        .catch(error => console.log(error))
    })
  }


  render() {
    return (
      <View>
        <Button
            onPress={ () => this._pickImage() }
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
            <FlatList
              data={this.props.images}
              numColumns={3}
              renderItem={this.renderImage.bind(this)}
              keyExtractor={(item, index) => index.toString()}
            />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.event.event,
    images: state.event.images
  };
};

export default connect(mapStateToProps, {
  fetchImages
})(Event);
