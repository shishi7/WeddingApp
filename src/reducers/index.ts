import AuthReducer from './AuthReducer';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import EventReducer from './EventReducer';

const config = {
  key: 'primary',
  storage
}

export default persistCombineReducers(config, {
  auth: AuthReducer,
  event: EventReducer
});
