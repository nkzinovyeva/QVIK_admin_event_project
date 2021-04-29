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
            dispatch({
              type: GET_PRESENTERS,
              payload: response.data.data,
              
            });
          } else {
            console.log('Unable to fetch data from the API for presenters!');
          }
        }
    } catch (error) {
        console.log(error);
      }
};
