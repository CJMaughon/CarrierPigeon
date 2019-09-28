import {
    GET_USERS,
    USERS_ERROR,
    SET_SELECTED_USERS
} from '../actions/types';

const initialState = {
    users: [],
    selectedUsers: [],
    user: null,
    loading: true,
    error: {},
    isToCreateAssignmentPage: null,
};
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload,
                loading: false,
                isToCreateAssignmentPage: false
            };
        case SET_SELECTED_USERS:
            return {
                ...state,
                selectedUsers: payload,
                loading: false,
                isToCreateAssignmentPage: true
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
