import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    FULLNAME_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    CREATE_USER,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD,
    SIGN_OUT
} from '../actions/types';

const INITIAL_STATE = {
                      email: '',
                      password: '',
                      user: null,
                      fullname: '',
                      error: '',
                      loading: false
                    };

export default (state = INITIAL_STATE, action) => {
switch (action.type) {
  case LOGIN_USER_SUCCESS:
    return { ...state, ...INITIAL_STATE, user: action.payload };
  case EMAIL_CHANGED:
    return { ...state, email: action.payload };
  case PASSWORD_CHANGED:
    return { ...state, password: action.payload };
  case FULLNAME_CHANGED:
    return { ...state, fullName: action.payload };
    break;
  case LOGIN_USER_FAIL:
    return { ...state, error: 'Неверный логин/пароль', password: '', loading: false };
  case LOGIN_USER:
    return { ...state, loading: true };
  case CREATE_USER:
    return { ...state, loading: true, error: '' };
    break;
  case CREATE_USER_SUCCESS:
    return { ...state, ...INITIAL_STATE, user: action.payload };
    break;
  case CREATE_USER_FAIL:
    return { ...state, error: 'Пользователь с таким e-mail уже зарегистрирован!', password: '', loading: false };
    break;
  case RESET_PASSWORD:
    return { ...state, error: '' };
    break;
  case RESET_PASSWORD_SUCCESS:
    return { ...state, ...INITIAL_STATE, user: action.payload };
    break;
  case RESET_PASSWORD_FAIL:
    return { ...state, error: 'Данный e-mail не зарегистрирован!' };
    break;
  case SIGN_OUT:
    return { ...state, INITIAL_STATE };
  default:
    return state;
}
};
