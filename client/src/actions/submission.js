import axios from 'axios';
import {
    GET_SUBMISSIONS,
    ADD_FAIL

} from './types';

// Get submissions

// Get submissions
export const getSubmissions = assignmentId => async dispatch => {
    try {
        const res = await axios.get(`/api/submissions/${assignmentId}`);
        dispatch({
            type: GET_SUBMISSIONS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ADD_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};