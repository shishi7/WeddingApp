const INITIAL_STATE = {
                      email: '',
                      password: '',
                      user: null,
                      error: '',
                      loading: false
                    };
import {
EMAIL_CHANGED,
PASSWORD_CHANGED,
LOGIN_USER_SUCCESS,
LOGIN_USER_FAIL,
LOGIN_USER
} from '../actions/types';

export default (state = INITIAL_STATE, action) => {
switch (action.type) {
  case LOGIN_USER_SUCCESS:
    return { ...state, ...INITIAL_STATE, user: action.payload };
  case EMAIL_CHANGED:
    return { ...state, email: action.payload };
  case PASSWORD_CHANGED:
    return { ...state, password: action.payload };
  case LOGIN_USER_FAIL:
    return { ...state, error: 'Неверный логин/пароль', password: '', loading: false };
  case LOGIN_USER:
    return { ...state, loading: true };
  default:
    return state;
}
};
