import {
    ADD_SUCCESS,
    ADD_FAIL,
} from '../actions/types';

const initialState = {

};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_SUCCESS:
            return {
                ...state
            };
        case ADD_FAIL:
            return {
                ...state
            };
        default:
            return state;
    }
}
