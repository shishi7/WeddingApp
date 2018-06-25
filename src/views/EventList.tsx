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
import Dialog from 'react-native-dialog';

import { toAddWedding, eventsFetch, invite_code_changed, joinWedding } from '../actions';
import { Card, CardItem, Input, CustomButton, Header, Spinner } from '../components';
import ListItem from './ListItem';
import { PEACH } from '../consts/colors';

class EventList extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    dialogVisible: false
  };

  onPlusPress() {
    this.props.toAddWedding({ navigation: this.props.navigation });
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel() {
    this.setState({ dialogVisible: false})
  }

  handleJoin() {
    this.props.joinWedding( this.props.inviteCode );
  }

componentWillMount() {
  this.createDataSource();
}

createDataSource() {
  this.props.eventsFetch();
}

onCodeChange(text){
  this.props.invite_code_changed(text);
}

 renderRow(event) {
   return <ListItem event={event}
                    navigation={ this.props.navigation }
          />;
 }

  render() {
    return (
      <View style={styles.viewStyle}>
        <View>
          <Dialog.Container
            visible={this.state.dialogVisible}>
            <Dialog.Title>Join the wedding</Dialog.Title>
            <Dialog.Description>
              Type the invite code here:
            </Dialog.Description>
            <Dialog.Input
              onChangeText={this.onCodeChange.bind(this)}
              value={this.props.inviteCode}
            />
            <Dialog.Button label="Cancel" onPress={this.handleCancel.bind(this)} />
            <Dialog.Button label="Join" onPress={this.handleJoin.bind(this)} />
          </Dialog.Container>
        </View>
        <View style={styles.headerStyle}>

          <Image
            source={require('../small_logo.png')}
          />
          <Button
              onPress={this.showDialog.bind(this)}
              icon={{
                name: 'add-circle',
                size: 20,
                color: 'black'
              }}
              containerViewStyle={{width: '30%'}}
              buttonStyle={{
                backgroundColor: "#fff",
                borderColor: "#000",
                borderWidth: 2,
                borderRadius: 8,
                width: 60,
                height: 60,
              }}
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
    width: 40,
    flex: 1
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
    shadowOpacity: 0.3,
    flexDirection: 'row',
  }
}

const mapStateToProps = state => {
  return {
    events: state.event.events,
    inviteCode: state.event.inviteCode
  };
};

export default connect(mapStateToProps, {
  toAddWedding,
  eventsFetch,
  invite_code_changed,
  joinWedding
})(EventList);
