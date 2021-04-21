// events actions

export const fetchMainEvent = () => ({
    type: 'FETCH_MAIN_EVENT',
    data: null,
})

export const addFetchedMainEvent = (data) => ({
    type: 'ADD_FETCHED_MAIN_EVENT',
    data: data,
})

export const fetchAllEvents = () => ({
    type: 'FETCH_ALL_EVENTS',
    data: null,
})
  
export const addFetchedEvents = (data) => ({
    type: 'ADD_FETCHED_EVENTS',
    data: data,
})

export const addNewEvent = (data) => ({
    type: 'ADD_NEW_EVENT',
    data: data,
})

export const deleteEvent = (data) => ({
    type: 'DELETE_EVENT',
    data: data,
})

export const editEvent = (data) => ({
    type: 'EDIT_EVENT',
    data: data,
})