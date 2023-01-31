import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    SIGNUP_USER_FAILED,
    SIGNUP_USER_SUCCESS,
    ALL_USER_SUCCESS,
    ALL_USER_FAILED,
    ALL_MESSAGES_SUCCESS,
    ALL_MESSAGES_FAILED,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILED,
    FETCH_CHAT_FAILED,
    FETCH_CHAT_SUCCESS,
    SHOW_SETTINGS_MODAL,
    ADD_GROUP_MODAL,
    ACCESS_CHAT_FAILED,
    ACCESS_CHAT_SUCCESS,
    CREATE_CHAT_SUCCESS,
    CREATE_CHAT_FAILED
} from './action';

const initialState = {
    user: [],
    alluser: [],
    err: '',
    token: '',
    messages: [],
    sendmessage: [],
    allchat: [],
    settingModal: false,
    groupmodal: false,
    chat: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS: {
            return { ...state, user: action.payload, token: action.payload.token };
        }
        case LOGIN_USER_FAILED: {
            return { ...state, err: action.payload.message };
        }
        case SIGNUP_USER_SUCCESS: {
            return { ...state, user: action.payload, token: action.payload.token };
        }
        case SIGNUP_USER_FAILED: {
            return { ...state, err: action.payload.message };
        }
        case ALL_USER_SUCCESS: {
            return { ...state, alluser: action.payload };
        }
        case ALL_USER_FAILED: {
            return { ...state, err: action.payload.message };
        }
        case ALL_MESSAGES_SUCCESS: {
            return { ...state, messages: action.payload };
        }
        case ALL_MESSAGES_FAILED: {
            return { ...state, err: action.payload.message };
        }
        case SEND_MESSAGE_FAILED: {
            return { ...state, err: action.payload.message };
        }
        case SEND_MESSAGE_SUCCESS: {
            return { ...state, sendmessage: action.payload };
        }
        case ACCESS_CHAT_SUCCESS: {
            return { ...state, chat: action.payload };
        }
        case ACCESS_CHAT_FAILED: {
            return { ...state, err: action.payload.message };
        }
        case FETCH_CHAT_SUCCESS: {
            return { ...state, allchat: action.payload };
        }
        case FETCH_CHAT_FAILED: {
            return { ...state, err: action.payload.message };
        }
        case CREATE_CHAT_SUCCESS: {
            return { ...state, allchat: action.payload };
        }
        case CREATE_CHAT_FAILED: {
            return { ...state, err: action.payload.message };
        }
        case SHOW_SETTINGS_MODAL: {
            return { ...state, settingModal: action.payload };
        }
        case ADD_GROUP_MODAL: {
            return { ...state, groupmodal: action.payload }
        }
        default: {
            return state;
        }
    }
}

export default rootReducer;
