import axios from 'axios';
import { LINK_PRESENTER, LINK_STAGE} from './types';
import {
    LINK_EVENT_STAGE_URL,
    LINK_EVENT_PRESENTER_URL
  } from '../../config';

export const linkEventPresenter = (event, presenter) => {
    try {
        return async dispatch => {
            await axios({
                method: 'post',
                url: `${LINK_EVENT_PRESENTER_URL}`,
                headers: { 'accept': 'application/json', 'operation': 'CREATE', 'Content-Type': 'application/json'},
                data: {
                    sourceId: event,
                    destinationId: presenter
                }
              })
            //await axios.post(`${LINK_EVENT_PRESENTER_URL}`, presenter, event)
                .then(response => {
                    dispatch({
                        type: LINK_PRESENTER,
                        payload: response
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
            await axios({
                method: 'post',
                url: `${LINK_EVENT_STAGE_URL}`,
                headers: { 'accept': 'application/json', 'operation': 'CREATE', 'Content-Type': 'application/json'},
                data: {
                    sourceId: event,
                    destinationId: stage
                }
              })
            //await axios.post(`${LINK_EVENT_STAGE_URL}`, event, stage)
                .then(response => {
                    dispatch({
                        type: LINK_STAGE,
                        payload: response
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};