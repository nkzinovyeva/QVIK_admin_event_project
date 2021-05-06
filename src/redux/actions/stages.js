import axios from 'axios';
import { GET_STAGES, ADD_STAGE, DELETE_STAGE, EDIT_STAGE } from './types';
import {
    STAGES_URL,
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

export const editStage = (stage, id) => {
  let url = `${STAGES_URL}`+'/' + id;
  try {
      return async dispatch => {
          await axios.put(url, stage)
              .then(response => {
                  dispatch({
                      type: EDIT_STAGE,
                      payload: response
                  });
              });
      };
  } catch (error) {
      console.log(error);
  }
};
 
export const addStage = (stage) => {
  try {
      return async dispatch => {
          await axios.post(`${STAGES_URL}`, stage)
              .then(response => {
                  dispatch({
                      headers: { 'accept': 'application/json', 'operation': 'CREATE', 'Content-Type': 'application/json'},
                      type: ADD_STAGE,
                      payload: stage
                  });
              });
      };
  } catch (error) {
      console.log(error);
  }
};

export const deleteStage = (id) => {
  let url = `${STAGES_URL}` +'/' + id;
  try {
      return async dispatch => {
          await axios.delete(url)
              .then(response => {
                  dispatch({
                      type: DELETE_STAGE,
                      payload: id
                  });
              });
      };
  } catch (error) {
      console.log(error);
  }
};