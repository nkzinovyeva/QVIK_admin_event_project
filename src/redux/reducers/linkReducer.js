import { LINK_PRESENTER, LINK_STAGE } from '../actions/types';

const initialState = {
    presenter: "",
    stage: ""
}

const linkReducer = (state = initialState, action) => {
    switch (action.type) {
        case LINK_PRESENTER:
            return { ...state, };
        case LINK_STAGE:
            return { ...state,  };
        default:
            return state;
    }
}

export default linkReducer;