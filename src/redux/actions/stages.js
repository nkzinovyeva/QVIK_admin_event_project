import axios from 'axios';
import { GET_STAGES, ADD_STAGE, DELETE_STAGE, EDIT_STAGE } from './types';
import {
    SETUP_URL,
    EVENTS_URL,
    RESTAURANT_URL,
    PRESENTERS_URL,
    STAGES_URL,
    VENUES_URL,
    UPDATE_URL
  } from '../../config';

export const getStages = () => {
    try {
        return async dispatch => {
          const response = await axios.get(`${STAGES_URL}`);
          if (response.data) {
            dispatch({
              type: GET_STAGES,
              payload: response.data.data,
              
            });
          } else {
            console.log('Unable to fetch data from the API for stages !');
          }
        }
    } catch (error) {
        console.log(error);
      }
};
 