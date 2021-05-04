import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_MAIN_EVENT } from '../actions/types';

const initialState = {
    events: [],
    mainEvent: {}
}

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MAIN_EVENT:
            return { ...state, mainEvent: action.payload };
        case GET_EVENTS:
            return { ...state, events: action.payload };
        case ADD_EVENT:
            return { ...state, events: [...state.events, action.payload]  };
        case EDIT_EVENT:
            return { ...state, events: action.payload  };
        case DELETE_EVENT:
            return { ...state,  };
        default:
            return state;
    }
}

export default eventReducer;