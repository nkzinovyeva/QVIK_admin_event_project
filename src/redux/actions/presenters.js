import axios from 'axios';
import { GET_PRESENTERS, ADD_PRESENTER, DELETE_PRESENTER, EDIT_PRESENTER } from './types';
import {
    PRESENTERS_URL,
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
