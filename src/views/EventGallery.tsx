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
import { Button } from 'react-native-elements';
import Gallery from 'react-native-photo-gallery';

class EventGallery extends Component {

  constructor(props) {
   super(props);
   this.state = {}
  }

  componentWillMount(){
    let data = [];
    const { images } = this.props;
    for(var i = 0; i < images.length; i++)
    {
      data[i] = {
        id: i.toString(),
        image: { uri: `${images[i]}` }
      };
      console.log(data[i]);
    }

    this.setState({ dataSource: data });

  }

  render() {
    return <Gallery data={this.state.dataSource} />;
  }
}

const mapStateToProps = state => {
  return {
    event: state.event.event,
    images: state.event.images
  };
};

export default connect(mapStateToProps, {
})(EventGallery);
