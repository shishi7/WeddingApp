import {
  EVENTNAME_CHANGED,
  DESCRIPTION_CHANGED,
  ADD_EVENT
} from  '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENTNAME_CHANGED:
      return { ...state, name: action.payload };
    case DESCRIPTION_CHANGED:
      return { ...state, description:action.payload };
    case ADD_EVENT:
      return { ...state, INITIAL_STATE };
    default:
      return state;
  }
}
