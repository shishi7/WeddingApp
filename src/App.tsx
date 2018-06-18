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
      apiKey: 'AIzaSyDS5rCta4AfPr0cy73O9u7t5Q2zmGNRLx0',
      authDomain: 'weddingapp-1337.firebaseapp.com',
      databaseURL: 'https://weddingapp-1337.firebaseio.com',
      projectId: 'weddingapp-1337',
      storageBucket: 'weddingapp-1337.appspot.com',
      messagingSenderId: '587460572824'
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
