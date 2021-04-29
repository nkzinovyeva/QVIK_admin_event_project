import axios from 'axios';
import { LINK_PRESENTER, LINK_STAGE} from './types';
import {
    LINK_EVENT_STAGE_URL,
    LINK_EVENT_PRESENTER_URL
  } from '../../config';

export const linkEventPresenter = (event, presenter) => {
    try {
        return async dispatch => {
            await axios.post(`${LINK_EVENT_PRESENTER_URL}`, event, presenter)
                .then(response => {
                    dispatch({
                        type: LINK_PRESENTER,
                        payload: event, presenter
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};
export const linkEventStage = (event, stage) => {
    try {
        return async dispatch => {
            await axios.post(`${LINK_EVENT_STAGE_URL}`, event, stage)
                .then(response => {
                    dispatch({
                        type: LINK_STAGE,
                        payload: event, stage
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};