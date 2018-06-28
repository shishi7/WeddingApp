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
        EVENT_CHOSEN,
        INVITE_CODE_CHANGED,
        JOIN_WEDDING,
        IMAGES_FETCH_SUCCESS
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

function getInviteCode(k) {
  var inviteC = k;
  inviteC = inviteC.substr(3,7);
  return inviteC;
}

const helper = (dispatch, user, fullName, navigation) => {
  createUserSuccess(dispatch, user, navigation);
  const user2 = firebase.auth().currentUser;
  const { currentUser } = firebase.auth();
  user2.updateProfile({displayName: fullName});
  firebase.database().ref(`/users/${currentUser.uid}`)
    .set({ name: fullName });
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

export const invite_code_changed = (text) => {
  return {
      type: INVITE_CODE_CHANGED,
      payload: text
  };
};

export const joinWedding = ( inviteCode ) => {
  const { currentUser } = firebase.auth();
  console.log(currentUser.uid)
  var listOfGuests = [];
  var listOfEvents = [];
  return(dispatch) => {
    firebase.database().ref('/events/')
    .orderByChild('inviteCode').equalTo(inviteCode)
    .on('value', snaps => {
      const snapKey;
      console.log(snaps.val());
      snaps.forEach(function(childSnapshot) {
        snapKey = childSnapshot.key;
      });
      console.log("sk " + snapKey);
      firebase.database().ref(`/events/${snapKey}/guests`)
      .once('value', snapshot => {
      listOfGuests = snapshot.val();
      if (listOfGuests === null ){
        console.log('Nope')
      }
      else {
          firebase.database().ref(`/events/${snapKey}/guests`)
          .once('value', snapshot => {
          listOfGuests = snapshot.val();
          if (!listOfGuests.includes(currentUser.uid)) {
            listOfGuests.push(currentUser.uid);
            firebase.database().ref(`/users/${currentUser.uid}/events`)
            .on('value', snap => {
              listOfEvents = snap.val();
              if (listOfEvents !== null){
                if (!listOfEvents.includes(snapKey)){
                  listOfEvents.push(snapKey);
                  firebase.database().ref(`users/${currentUser.uid}/events`)
                  .set( listOfEvents );
              }
            }
            else {
              console.log('inv' + snapKey);
              listOfEvents = [ snapKey ];
              firebase.database().ref(`users/${currentUser.uid}/events`)
              .set( listOfEvents );
            }
            })
          }
          else {
            console.log('No')
          }
          firebase.database().ref(`/events/${snapKey}/guests`)
          .update( listOfGuests );
      })
    }
    });
})
}
}

export const addEvent =  ({ name, description, navigation }) => {
return(dispatch) => {
  const eventKey;
  firebase.database().ref(`/events`)
    .push()
    .then((response) => {
            eventKey = response.key;
            const { currentUser } = firebase.auth();
            var host = [currentUser.uid];
              console.log(eventKey);
            firebase.database().ref(`/events/${eventKey}`)
              .set({
                name: name,
                description: description,
                inviteCode: getInviteCode(eventKey)
              })
              firebase.database().ref(`/events/${eventKey}/guests`)
                .set( host );
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
          })
          .then(() => {
              console.log(eventKey)
              dispatch({ type:ADD_EVENT, payload: eventKey });
              navigation.navigate('Avatar');
    })
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

export const fetchImages = (event) => {
  return (dispatch) => {
    firebase.database().ref(`/events/${event}/photos`)
      .on('value', snapshot => {
        dispatch({ type: IMAGES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const toEvent = ({ navigation, event }) => {
  return (dispatch) => {
    dispatch({ type: EVENT_CHOSEN, payload: event });
    navigation.navigate('Event');
    console.log(event);
  };
};

export const toGallery = ({ navigation, event }) => {
  return (dispatch) => {
    dispatch({ type: EVENT_CHOSEN, payload: event });
    navigation.navigate('Gallery');
    console.log(event);
  };
};
