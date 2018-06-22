import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { toEvent } from '../actions';

class Event extends Component {

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
        <Image
           style={{ flex: 1, height: 200, resizeMode: 'contain' }}
           source={{ uri: `${this.state.url}` }}
        />
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.event.event
  };
};

export default connect(mapStateToProps, {
})(Event);
