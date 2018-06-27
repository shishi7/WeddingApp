import {
  EVENTNAME_CHANGED,
  DESCRIPTION_CHANGED,
  ADD_EVENT,
  EVENTS_FETCH_SUCCESS,
  EVENT_CHOSEN,
  INVITE_CODE_CHANGED,
  JOIN_WEDDING,
  IMAGES_FETCH_SUCCESS
} from  '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  events: [],
  event: '',
  keyId: '',
  inviteCode: '',
  images: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENTNAME_CHANGED:
      return { ...state, name: action.payload };
    case DESCRIPTION_CHANGED:
      return { ...state, description:action.payload };
    case ADD_EVENT:
      return { ...state, keyId: action.payload };
    case EVENTS_FETCH_SUCCESS:
      return { ...state, events: action.payload };
    case EVENT_CHOSEN:
      return { ...state, event: action.payload };
    case INVITE_CODE_CHANGED:
      return { ...state, inviteCode: action.payload }
    case JOIN_WEDDING:
      return { ...state, inviteCode: action.payload}
    case IMAGES_FETCH_SUCCESS:
      return { ...state, images: action.payload };
    default:
      return state;
  }
}
