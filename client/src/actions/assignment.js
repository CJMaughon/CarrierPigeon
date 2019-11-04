import axios from 'axios';
import {
    ADD_FAIL,
    ADD_SUCCESS,
    GET_ASSIGNMENTS,
    GET_ASSIGNMENT
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

// Get assigments
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

// Get assigments
export const getAssignment = assignmentId => async dispatch => {
    try {
        const res = await axios.get(`/api/assignments/${assignmentId}`);
        dispatch({
            type: GET_ASSIGNMENT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ADD_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get Instructor Assignments
export const getInstructorAssignments = (userId) => async dispatch => {
    try {
        const url = '/api/assignments/assigned/' + userId;
        const res = await axios.get(url);
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