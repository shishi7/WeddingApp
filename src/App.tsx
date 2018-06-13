import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';


class App extends Component {

  componentWillMount() {
    const config = {
  apiKey: 'AIzaSyCEv4XB9voMhXujQzEv2aMOY_HZP_3bOXw',
  authDomain: 'manager-f4e93.firebaseapp.com',
  databaseURL: 'https://manager-f4e93.firebaseio.com',
  projectId: 'manager-f4e93',
  storageBucket: 'manager-f4e93.appspot.com',
  messagingSenderId: '724494845718'
};

firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
