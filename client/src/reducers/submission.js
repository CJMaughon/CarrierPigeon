import {
    GET_SUBMISSIONS,
} from '../actions/types';

const initialState = {
    submissions: [],
    loadingSubmissions: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SUBMISSIONS:
            return {
                ...state,
                submissions: payload,
                loadingSubmissions: false,
            };
        default:
            return state;
    }
}
