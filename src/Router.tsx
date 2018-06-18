import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginForm from './views/LoginForm';
import AccCreate from './views/AccCreate';
import EventList from './views/EventList';
import ResetPass from './views/ResetPass';
import Chat from './views/Chat';
import Profile from './views/Profile';
import { PITCH } from './consts/colors';


const AuthNavigator = createStackNavigator({
    login: {
        screen: LoginForm,
    },
    accCreate: {
        screen: AccCreate
    },
    resetPass: {
        screen: ResetPass
    }
}, {
    initialRouteName: 'login',
    headerMode: 'none',
    animationEnabled: 'true'
});

const MainNavigator = createMaterialBottomTabNavigator({
    home: {
        screen: EventList,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon size={24} name={ 'home' } style={{ color: tintColor }} />
          )
        }
    },
    chat: {
        screen: Chat,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon size={24} name={ 'comment' } style={{ color: tintColor }} />
          )
        }
    },
    profile: {
        screen: Profile,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon size={24} name={ 'user' } style={{ color: tintColor }} />
          )
        }
    }
}, {
    initialRouteName: 'home',
    order: ['profile', 'home', 'chat'],
    activeTintColor: '#000000',
    inactiveTintColor: '#000000',
    barStyle: { backgroundColor: PITCH },
    shifting: true
});

const Router = createStackNavigator({
    Auth: { screen: AuthNavigator},
    Main: { screen: MainNavigator },
}, {
    initialRouteName: 'Auth',
    headerMode: 'none',
    animationEnabled: 'true'
});

export default Router;
