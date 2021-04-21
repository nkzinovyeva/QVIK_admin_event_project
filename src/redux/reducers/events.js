const INITIAL_STATE = {
    eventsData: []
  };
  
const eventReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_FETCHED_EVENTS': {
      return { ...state, eventsData: action.data };
    }
    default: {
      return state;
    }
  }
}

export default eventReducer;