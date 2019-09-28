import axios from 'axios';
import {
    ADD_FAIL,
    ADD_SUCCESS
} from './types';

// Add new assigment 
export const createNewAssigment = (
    name,
    detail,
    instructors,
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
        instructors,
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