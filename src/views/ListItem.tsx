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

class ListItem extends Component {

  constructor(props) {
   super(props);
   this.state = { url:  '' } ;
  }

  componentWillMount(){
    const imageRef = firebase.storage().ref().child(`images/${this.props.event.item}/main`);
    const sampleImage = imageRef.getDownloadURL().then(result =>  this.setState({ url: result }));
  }

  onEventPress() {
    this.props.toEvent({ navigation: this.props.navigation, event: this.props.event.item });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.onEventPress.bind(this)}
        style={{ flex: 1 }}
      >
        <Image
           style={{ flex: 1, height: 200, resizeMode: 'contain' }}
           source={{ uri: `${this.state.url}` }}
        />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.event.name
  };
};

export default connect(mapStateToProps, {
  toEvent
})(ListItem);
