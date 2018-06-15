import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginForm from './views/LoginForm';
import AccCreate from './views/AccCreate';
import EventList from './views/EventList';
import ResetPass from './views/ResetPass';

const Router = StackNavigator(
  {
    login: {screen: LoginForm},
    accCreate: {screen: AccCreate},
    resetPass: {screen: ResetPass},
    eventList: {screen: EventList}
  },
  {
    initialRouteName: 'login'
  }
);


export default Router;
