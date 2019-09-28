import axios from 'axios';
import {
    GET_USERS,
    USERS_ERROR,
    SET_SELECTED_USERS
} from './types';

// Get posts
export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/users/approved');
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: USERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const setSelectedUsers = selectedUsers => async dispatch => {
    dispatch({
        type: SET_SELECTED_USERS,
        payload: selectedUsers
    });
};

export const getUnapprovedUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/users/unapproved');
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: USERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const approveUsers = selectedUsers => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ selectedUsers });
        const res = await axios.post('/api/users/approve_user', body, config);
        console.log(res);
    } catch (err) {
        dispatch({
            type: USERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};