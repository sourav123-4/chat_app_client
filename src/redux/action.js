export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILED = 'SIGNUP_USER_FAILED';
export const ALL_USER_SUCCESS = 'ALL_USER_SUCCESS';
export const ALL_USER_FAILED = 'ALL_USER_FAILED';
export const ALL_MESSAGES_FAILED = 'ALL_MESSAGES_FAILED';
export const ALL_MESSAGES_SUCCESS = 'ALL_MESSAGES_SUCCESS';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const ACCESS_CHAT_SUCCESS = 'ACCESS_CHAT_SUCCESS';
export const ACCESS_CHAT_FAILED = 'ACCESS_CHAT_FAILED';
export const FETCH_CHAT_SUCCESS = 'FETCH_CHAT_SUCCESS';
export const FETCH_CHAT_FAILED = 'FETCH_CHAT_SUCCESS';
export const SHOW_SETTINGS_MODAL = 'SHOW_SETTINGS_MODAL';
export const ADD_GROUP_MODAL = 'ADD_GROUP_MODAL';
export const CREATE_CHAT_FAILED = 'CREATE_CHAT_FAILED';
export const CREATE_CHAT_SUCCESS = 'CREATE_CHAT_SUCCESS';
export const URL = 'http://localhost:8080';

export const loginUser = data => dispatch => {
  fetch(`${URL}/api/user/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.message) {
        dispatch({
          type: LOGIN_USER_FAILED,
          payload: responseJson,
        });
      } else {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: responseJson,
        });
      }
    });
};

export const signupUser = data => dispatch => {
  fetch(`${URL}/api/user/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.message) {
        dispatch({
          type: SIGNUP_USER_FAILED,
          payload: responseJson,
        });
      } else {
        dispatch({
          type: SIGNUP_USER_SUCCESS,
          payload: responseJson,
        });
      }
    });
};

export const allUser = (token, searchData) => dispatch => {
  fetch(`${URL}/api/user/searchuser`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ search: searchData }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.message) {
        dispatch({
          type: ALL_USER_FAILED,
          payload: responseJson,
        });
      } else {
        dispatch({
          type: ALL_USER_SUCCESS,
          payload: responseJson,
        });
      }
    })
};

export const accessChat = (token, id) => dispatch => {

  fetch(`http://localhost:8080/api/chat`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ userId: id }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.message) {
        dispatch({
          type: ACCESS_CHAT_FAILED,
          payload: responseJson,
        });
      } else {
        // fetchChat(token);
        dispatch({
          type: ACCESS_CHAT_SUCCESS,
          payload: responseJson,
        });
      }
    })
}

export const allmessages = (token, id) => dispatch => {
  fetch(`${URL}/api/message/chatId`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ id: id }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.message) {
        dispatch({
          type: ALL_MESSAGES_FAILED,
          payload: responseJson,
        });
      } else {
        dispatch({
          type: ALL_MESSAGES_SUCCESS,
          payload: responseJson,
        });
      }
    })
};

export const sendMessages = (message, token, id) => dispatch => {
  fetch(`${URL}/api/message`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ content: message, chatId: id })
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.message) {
        dispatch({
          type: SEND_MESSAGE_FAILED,
          payload: responseJson,
        });
      } else {
        dispatch({
          type: SEND_MESSAGE_SUCCESS,
          payload: responseJson,
        });
      }
    })
};

export const fetchChat = (token) => dispatch => {
  fetch(`${URL}/api/chat`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.message) {
        dispatch({
          type: FETCH_CHAT_FAILED,
          payload: responseJson,
        });
      } else {
        dispatch({
          type: FETCH_CHAT_SUCCESS,
          payload: responseJson,
        });
      }
    })
};

export const createGroup = (token, selectedUser, chatName) => {

  console.log("action", selectedUser, chatName, token)
  const usersId = selectedUser && selectedUser?.map((u) => {
    return u._id
  })
  fetch(`http://localhost:8080/api/chat/group`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ users: usersId, name: chatName })
  }).then(response => response.json())
    .then(responseJson => {
      if (responseJson.message) {
        dispatch({
          type: CREATE_CHAT_FAILED,
          payload: responseJson,
        });
      } else {
        dispatch({
          type: CREATE_CHAT_SUCCESS,
          payload: responseJson,
        });
      }
    })
}

export const showSettingsModel = (data) => dispatch => {
  return dispatch({
    type: SHOW_SETTINGS_MODAL,
    payload: data
  })
}

export const addGroupModal = (data) => dispatch => {
  return dispatch({
    type: ADD_GROUP_MODAL,
    payload: data
  })
}