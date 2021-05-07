import axios from 'axios';
import { GET_RESTAURANTS, ADD_RESTAURANT, DELETE_RESTAURANT, EDIT_RESTAURANT } from './types';
import {
    RESTAURANT_URL,
} from '../../config';

export const getRestaurants = () => {
    try {
        return async dispatch => {
            const response = await axios.get(`${RESTAURANT_URL}`);
            if (response.data) {
                dispatch({
                    type: GET_RESTAURANTS,
                    payload: response.data.data.restaurants,
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const addRestaurant = (rest) => {
    try {
        return async dispatch => {
            await axios.post(`${RESTAURANT_URL}`, rest)
                .then(response => {
                    dispatch({
                        headers: { 'accept': 'application/json', 'operation': 'CREATE', 'Content-Type': 'application/json' },
                        type: ADD_RESTAURANT,
                        payload: rest
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const editRestaurant = (rest, id) => {
    let url = `${RESTAURANT_URL}` + '/' + id;
    console.log('edit', rest);
    try {
        return async dispatch => {
            await axios.put(url, rest)
                .then(response => {
                    dispatch({
                        type: EDIT_RESTAURANT,
                        payload: response
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const deleteRestaurant = (id) => {
    let url = `${RESTAURANT_URL}` + '/' + id;
    try {
        return async dispatch => {
            await axios.delete(url)
                .then(response => {
                    dispatch({
                        type: DELETE_RESTAURANT,
                        payload: id
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};