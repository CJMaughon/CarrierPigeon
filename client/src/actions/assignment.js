import axios from 'axios';
import {
    ADD_FAIL,
    ADD_SUCCESS,
    GET_ASSIGNMENTS
} from './types';

// Add new assigment 
export const createNewAssigment = (
    name,
    detail,
    assignedInstructors,
    dueDate,
) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        name,
        detail,
        assignedInstructors,
        dueDate,
    });
    try {
        console.log(body);
        const res = await axios.post('/api/assignments', body, config);
        // setError('Successfully created new account!', 'success');
        dispatch({
            type: ADD_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            console.log(errors);
        }
        dispatch({
            type: ADD_FAIL
        });
    }
};

// Get posts
export const getAssignments = () => async dispatch => {
    try {
        const res = await axios.get('/api/assignments');
        dispatch({
            type: GET_ASSIGNMENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ADD_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};