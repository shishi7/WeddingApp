import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableNative,
  FlatList
 } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { toAddWedding, eventsFetch } from '../actions';
import { Card, CardItem, Input, CustomButton, Header, Spinner } from '../components';
import ListItem from './ListItem';
import { PEACH } from '../consts/colors';

class EventList extends Component {
  static navigationOptions = {
    header: null
  };

  onPlusPress() {
    this.props.toAddWedding({ navigation: this.props.navigation });
  }


componentWillMount() {
  this.createDataSource();
}

createDataSource() {
  this.props.eventsFetch();
}

 renderRow(event) {
   return <ListItem event={event}
                    navigation={ this.props.navigation }
          />;
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
        </Card>
        <FlatList
          data={this.props.events}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={event => event.uid}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.event.events
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
  toAddWedding,
  eventsFetch
})(EventList);
