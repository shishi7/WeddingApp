import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardItem } from './CardItem';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {

  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {}}
      trasparent
      visible={visible}
    >
      <View style={styles.containerStyle}>
        <CardItem style={styles.cardSectionStyle}>
          <Text style={styles.textStyle}>{children}</Text>
        </CardItem>

        <CardItem>
          <Button onPress={onAccept}>YES</Button>
          <Button onPress={onDecline}>NO</Button>
        </CardItem>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justyfyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundCollor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justyfyContent: 'center'
  }

};

export { Confirm };
