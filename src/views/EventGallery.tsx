import React, { Component } from 'react';
import Gallery from 'react-native-image-gallery';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { toEvent } from '../actions';
import { Button } from 'react-native-elements';

class EventGallery extends Component {

  constructor(props) {
   super(props);
   this.state = { url:  '' } ;
  }

  componentWillMount(){
    const imageRef = firebase.storage().ref().child(`images/${this.props.event}/main.jpg`);
    const sampleImage = imageRef.getDownloadURL().then(result =>  this.setState({ url: result }));
  }

  render() {
   return (
     <Gallery
       style={{ flex: 1, backgroundColor: 'black' }}
       images={[
         { source: { uri: 'https://i.ebayimg.com/images/g/JE0AAOSwUEVYD3X5/s-l225.jpg'}, dimensions: { width: 150, height: 150 } },
         { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
         { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
         { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
         { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
       ]}
     />
   );
 }
 /*render() {
    return (
        <Image
           style={{ flex: 1, height: 200, resizeMode: 'contain' }}
           source={{ uri: `${this.state.url}` }}
        />
    );
  }*/
}

const mapStateToProps = state => {
  return {
    event: state.event.event
  };
};

export default connect(mapStateToProps, {
})(EventGallery);
