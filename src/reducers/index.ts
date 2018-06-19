import AuthReducer from './AuthReducer';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const config = {
  key: 'primary',
  storage
}

export default persistCombineReducers(config, {
  auth: AuthReducer
});
