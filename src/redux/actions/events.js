import axios from 'axios';
import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_MAIN_EVENT } from './types';
import {
    SETUP_URL,
    EVENTS_URL,
  } from '../../config';

  export const getMainEvent = () => {
    try {
        return async dispatch => {
          const response = await axios.get(`${SETUP_URL}`);
          console.log('initial', response.data.data )
          if (response.data) {
            dispatch({
              type: GET_MAIN_EVENT,
              payload: response.data.data
            });
          } else {
            console.log('Unable to fetch data from the API !');
          }
        }
    } catch (error) {
        console.log(error);
      }
};

export const getEvents = () => {
    try {
        return async dispatch => {
          const response = await axios.get(`${EVENTS_URL}`);
          if (response.data) {
            dispatch({
              type: GET_EVENTS,
              payload: response.data.data[0].data
            });
          } else {
            console.log('Unable to fetch data from the API for events !');
          }
        }
    } catch (error) {
        console.log(error);
      }
};

export const editEvent = (event, id, presenter, stage) => {
    let url = `${EVENTS_URL}`+'/' + id;
    try {
        return async dispatch => {
            await axios.put(url, 
            {"event": event,
            "linkEventStage": {
              "operation": "CREATE",
              "sourceId": id,
              "destinationId": stage
            },
            "linkEventPresenters": [
              {
                "operation": "CREATE",
                "sourceId": id,
                "destinationId": presenter
              }
            ]})
                .then(response => {
                    dispatch({
                        type: EDIT_EVENT,
                        payload: response
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const deleteEvent = (id) => {
    let url = `${EVENTS_URL}` +'/' + id;
    try {
        return async dispatch => {
            await axios.delete(url)
                .then(response => {
                    dispatch({
                        type: DELETE_EVENT,
                        payload: id
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const addEvent = (event, presenter, stage) => {
    try {
        return async dispatch => {
            await axios.post(`${EVENTS_URL}`,
            {"event": event,
            "linkEventStage": {
              "operation": "CREATE",
              "destinationId": stage
            },
            "linkEventPresenters": [
              {
                "operation": "CREATE",
                "destinationId": presenter
              }
            ]})
                .then(response => {
                    dispatch({
                        type: ADD_EVENT,
                        payload: event
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};