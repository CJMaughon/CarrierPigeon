import {
    ADD_SUCCESS,
    ADD_FAIL,
    GET_ASSIGNMENTS,
    GET_ASSIGNMENT
} from '../actions/types';

const initialState = {
    assignments: [],
    assignment: null,
    loadingAssignment: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_SUCCESS:
            return {
                ...state
            };
        case GET_ASSIGNMENTS:
            return {
                ...state,
                assignments: payload,
                loadingAssignment: false,
            };
        case GET_ASSIGNMENT:
            return {
                ...state,
                assignment: payload,
                loadingAssignment: false,
            };
        case ADD_FAIL:
            return {
                ...state
            };
        default:
            return state;
    }
}
