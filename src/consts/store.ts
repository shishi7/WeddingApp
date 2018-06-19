import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import reducers from '../reducers';

const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(thunk)
  )
);

const persistor = persistStore(store);

export default { store, persistor };
