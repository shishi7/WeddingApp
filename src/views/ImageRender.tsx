import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { toGallery } from '../actions';

const {width} = Dimensions.get('window');
const itemWidth = (width) / 3;

class ImageRender extends Component {

  onImagePress() {
    this.props.toGallery({ navigation: this.props.navigation, event: this.props.image.item });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.onImagePress.bind(this)}
        style={{ flex: 1 }}
      >
        <Image
           style={{ flex: 1, height: 200, width: itemWidth }}
           source={{ uri: `${this.props.image.item}` }}
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
  toGallery
})(ImageRender);
