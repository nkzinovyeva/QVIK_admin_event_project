import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from '../actions/types';

const initialState = {
    events: [],
    mainEvent: []
}

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return { ...state, events: action.payload };
        case ADD_EVENT:
            return { ...state,  };
        case EDIT_EVENT:
            return { ...state,  };
        case DELETE_EVENT:
            return { ...state,  };
        default:
            return state;
    }
}

export default eventReducer;