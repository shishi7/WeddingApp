import React from 'react';
import { Scene, Router, Actions, Navigator } from 'react-native-router-flux';
import LoginForm from './views/LoginForm';
import EventList from './views/EventList';


const RouterComponent = () => {
  return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="auth">
            <Scene
            key="login"
            component={LoginForm}
            hideNavBar
            initial
            />
          </Scene>
          <Scene key='eventList' component={EventList} title='Weddings' />
        </Scene>
      </Router>
  );
};

export default RouterComponent;
