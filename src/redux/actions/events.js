import axios from 'axios';
import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from './types';
import {
    SETUP_URL,
    EVENTS_URL,
    RESTAURANT_URL,
    PRESENTERS_URL,
    STAGES_URL,
    VENUES_URL,
    UPDATE_URL
  } from '../../config';

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
            console.log('Unable to fetch data from the API !');
          }
        }
    } catch (error) {
        console.log(error);
      }
};

export const editEvent = (event, id) => {
    let url = `${EVENTS_URL}`+'/' + id;
    try {
        return async dispatch => {
            await axios.put(url, event)
                .then(response => {
                    dispatch({
                        type: EDIT_EVENT,
                        payload: event
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const deleteEvent = (id) => {
    let url = `${EVENTS_URL}` + id;
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

export const addEvent = (event) => {
    try {
        return async dispatch => {
            await axios.post('', event)
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