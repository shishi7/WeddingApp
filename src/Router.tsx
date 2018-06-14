import React from 'react';
import { Scene, Router, Actions, Navigator } from 'react-native-router-flux';
import LoginForm from './views/LoginForm';
import AccCreate from './views/AccCreate';
import EventList from './views/EventList';
import ResetPass from './views/ResetPass';


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

            <Scene
              key="accCreate"
              component={AccCreate}
              hideNavBar
            />

            <Scene
              key="resetPass"
              component={ResetPass}
              hideNavBar
            />

          </Scene>
          <Scene key='eventList' component={EventList} title='Weddings' />
        </Scene>
      </Router>
  );
};

export default RouterComponent;
