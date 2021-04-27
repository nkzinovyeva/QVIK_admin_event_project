import axios from 'axios';
import { GET_PRESENTERS, ADD_PRESENTER, DELETE_PRESENTER, EDIT_PRESENTER } from './types';
import {
    SETUP_URL,
    EVENTS_URL,
    RESTAURANT_URL,
    PRESENTERS_URL,
    STAGES_URL,
    VENUES_URL,
    UPDATE_URL
  } from '../../config';

export const getPresenters = () => {
    try {
        return async dispatch => {
          const response = await axios.get(`${PRESENTERS_URL}`);
          if (response.data) {
              console.log(response)
            dispatch({
              type: GET_PRESENTERS,
              payload: response.data.data,
              
            });
          } else {
            console.log('Unable to fetch data from the API !');
          }
        }
    } catch (error) {
        console.log(error);
      }
};
/*
export const editStage = (event, id) => {
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

export const deleteStage = (id) => {
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

export const addStage = (event) => {
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
*/