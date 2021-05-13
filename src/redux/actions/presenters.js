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

export const editPresenter = (presenter, id) => {
  let url = `${PRESENTERS_URL}` + '/' + id;
  try {
      return async dispatch => {
          await axios.put(url, presenter)
              .then(response => {
                  dispatch({
                      type: EDIT_PRESENTER,
                      payload: response
                  });
              });
      };
  } catch (error) {
      console.log(error);
  }
};

export const addPresenter = (presenter) => {
  try {
      return async dispatch => {
          await axios.post(`${PRESENTERS_URL}`, presenter)
              .then(response => {
                  dispatch({
                      type: ADD_PRESENTER,
                      payload: presenter
                  });
              });
      };
  } catch (error) {
      console.log(error);
  }
};

export const deletePresenter = (id) => {
  let url = `${PRESENTERS_URL}` + '/' + id;
  try {
      return async dispatch => {
          await axios.delete(url)
              .then(response => {
                  dispatch({
                      type: DELETE_PRESENTER,
                      payload: id
                  });
              });
      };
  } catch (error) {
      console.log(error);
  }
};