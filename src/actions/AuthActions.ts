import firebase from 'firebase';

import { EMAIL_CHANGED,
        PASSWORD_CHANGED,
        FULLNAME_CHANGED,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_FAIL,
        LOGIN_USER,
        VOID_ACTION,
        CREATE_USER_SUCCESS,
        CREATE_USER_FAIL,
        CREATE_USER,
        RESET_PASSWORD,
        RESET_PASSWORD_SUCCESS,
        RESET_PASSWORD_FAIL,
        SIGN_OUT,
        EVENTNAME_CHANGED,
        DESCRIPTION_CHANGED,
        ADD_EVENT,
        EVENTS_FETCH_SUCCESS,
        EVENT_CHOSEN
} from './types';

export const toForgotPassword = ({ navigation }) => {
  return (dispatch) => {
    dispatch({ type: VOID_ACTION });
    navigation.navigate('resetPass');
  };
};

export const SignOut = ({ navigation }) => {
  return (dispatch) => {
    dispatch({ type: SIGN_OUT });
    firebase.auth().signOut();
    navigation.navigate('loading');
  };
};

export const toAccCreate = ({ navigation }) => {
  return (dispatch) => {
    dispatch({ type: VOID_ACTION });
    navigation.navigate('accCreate');
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const fullNameChanged = (text) => {
  return {
    type: FULLNAME_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password, navigation }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        user => loginUserSuccess(dispatch, user, navigation))
      .catch(() => loginUserFail(dispatch));
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  console.log('login success');
  navigation.navigate('Main');
};

export const createUser = ({ email, password, fullName, navigation }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => helper(dispatch, user, fullName, navigation))
      .catch(() => createUserFail(dispatch));
  };
};

const createUserFail = (dispatch) => {
  dispatch({
    type: CREATE_USER_FAIL
  });
};

const helper = (dispatch, user, fullName, navigation) => {
  var arr = ['-LFWLDcN1EECemxKaESF', '-LFWRl04vMJVEAJhlVcA']
  createUserSuccess(dispatch, user, navigation);
  const user2 = firebase.auth().currentUser;
  const { currentUser } = firebase.auth();
  user2.updateProfile({displayName: fullName});
  firebase.database().ref(`/users/${currentUser.uid}`)
    .set({ name: fullName });
  firebase.database().ref(`/users/${currentUser.uid}/events/`)
    .set( arr );
/*  firebase.database().ref(`/users/${currentUser.uid}/events/-LFWRl04vMJVEAJhlVcA`)
    .set({ uid: 'ddd' });
  firebase.database().ref(`/users/${currentUser.uid}/events/-LFWWAU_oc7oQaa_mmCS`)
    .set({ uid: 'aa' }); */
  };
const createUserSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: CREATE_USER_SUCCESS,
    payload: user
  });

  navigation.navigate('Main');
};

export const resetPass = ({ email, navigation }) => {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD });

    firebase.auth().sendPasswordResetEmail(email)
      .then(
        user => resetPassSuccess(dispatch, user, navigation))
      .catch(() => resetPassFail(dispatch));
  };
};

const resetPassFail = (dispatch) => {
  dispatch({ type: RESET_PASSWORD_FAIL });
};

const resetPassSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: RESET_PASSWORD_SUCCESS,
    payload: user
  });

  navigation.navigate('login');
}

export const toAddWedding = ({ navigation }) => {
  return (dispatch) => {
    dispatch({ type: VOID_ACTION });
    navigation.navigate('AddWedding');
  };
};

export const eventNameChanged = (text) => {
  return{
    type: EVENTNAME_CHANGED,
    payload: text
  };
};

export const description_changed = (text) => {
  return{
    type: DESCRIPTION_CHANGED,
    payload: text
  };
};

export const addEvent = ({ name, description }) => {
  const key;
  return(dispatch) => {
    dispatch({ type:ADD_EVENT });
    firebase.database().ref(`/events`)
      .push({
      name: name,
      description: description
    })
      .then((response) => {
//              var arr = ['first', 'second'];
              key = response.key;
              console.log(key);
              const { currentUser } = firebase.auth();
              var host = [currentUser.uid];
              firebase.database().ref(`/events/${key}/guests`)
              .set( host );
              var list = [];
/*              firebase.database().ref(`/events/${key}/guests`)
              .on('value', snapshot => {
                list = snapshot.val();
                console.log(list);
                .on('child_added', data => {
                  firebase.database().ref(`/events/${key}/guests`)
                    .once('value', snapshot => {
                    list = snapshot.val();
                    list.push('third');
                    }) */
               firebase.database().ref(`/events/${key}/guests`)
               .update( list );
            });
  }
}

export const eventsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/events`)
      .on('value', snapshot => {
        dispatch({ type: EVENTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const toEvent = ({ navigation, event }) => {
  return (dispatch) => {
    dispatch({ type: EVENT_CHOSEN, payload: event });
    navigation.navigate('Event');
  };
};
