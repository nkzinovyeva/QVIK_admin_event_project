import { GET_PRESENTERS, ADD_PRESENTER, DELETE_PRESENTER, EDIT_PRESENTER } from '../actions/types';

const initialState = {
    presenters: []
}

const presenterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRESENTERS:
            return { ...state, presenters: action.payload };
        case ADD_PRESENTER:
            return { ...state,  };
        case EDIT_PRESENTER:
            return { ...state,  };
        case DELETE_PRESENTER:
            return { ...state,  };
        default:
            return state;
    }
}

export default presenterReducer;