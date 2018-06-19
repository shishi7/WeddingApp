import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import reducers from './reducers';
import Router from './Router';
import Store from './consts/store';

class App extends Component {

  render() {
    return (
      <Provider store={Store.store}>
        <PersistGate persistor={Store.persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
