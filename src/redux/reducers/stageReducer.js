import { GET_STAGES, ADD_STAGE, DELETE_STAGE, EDIT_STAGE } from '../actions/types';

const initialState = {
    stages: []
}

const stageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STAGES:
            return { ...state, stages: action.payload };
        case ADD_STAGE:
            return { ...state,  };
        case EDIT_STAGE:
            return { ...state, stages: action.payload  };
        case DELETE_STAGE:
            return { ...state,  };
        default:
            return state;
    }
}

export default stageReducer;