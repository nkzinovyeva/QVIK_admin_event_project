import { GET_RESTAURANTS, ADD_RESTAURANT, EDIT_RESTAURANT, DELETE_RESTAURANT } from '../actions/types';

const initialState = {
    restaurants: []
}

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESTAURANTS:
            return { ...state, restaurants: action.payload };
        case ADD_RESTAURANT:
            return { ...state, restaurants: [...state.restaurants, action.payload] };
        case EDIT_RESTAURANT:
            return { ...state, restaurants: action.payload };
        case DELETE_RESTAURANT:
            return { ...state, };
        default:
            return state;
    }
}

export default restaurantReducer;