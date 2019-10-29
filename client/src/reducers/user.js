import {
    GET_USERS,
    USERS_ERROR,
    SET_SELECTED_USERS
} from '../actions/types';

const initialState = {
    users: [],
    selectedUsers: [],
    selectedUsersName: [],
    user: null,
    loading: true,
    error: {},
};
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload,
                loading: false,
            };
        case SET_SELECTED_USERS:
            return {
                ...state,
                selectedUsers: payload.ids,
                selectedUsersName: payload.names,
                loading: false,
            };
        case USERS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
