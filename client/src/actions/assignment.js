import axios from 'axios';
import {
    ADD_FAIL,
    ADD_SUCCESS,
    GET_ASSIGNMENTS,
    GET_ASSIGNMENT,
    SET_UPLOADING,
    SUBMIT_SUCCESS,
    SUBMIT_FAIL

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


// Loading assigments
export const loadingAssignment = () => async dispatch => {
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

// set uploading
export const setUploading = () => async dispatch => {
    dispatch({
        type: SET_UPLOADING,
    });
};

// submit assignment
export const submitAssignment = (
    userId,
    assignmentId,
    comment,
    files,
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const data = new FormData();
        for (var i = 0; i < files.length; i++) {
            console.log(data);
            data.append('file', files[i]);
            console.log(data);
        }

        if (!comment.length) {
            comment = "No comment provided";
        }
        await axios.post(`/api/assignments/submit_assignment/${userId}/${assignmentId}/${comment}`, data, config);
        dispatch({
            type: SUBMIT_SUCCESS
        });
    } catch (err) {
        console.log(err);
        if (err) {
            console.log(err);
        }
        dispatch({
            type: SUBMIT_FAIL
        });
    }
};