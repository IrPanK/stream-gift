import * as api from "../api";
import { CREATE, FETCH_ALL } from "../constants/constants";

export const getNotipin = () => async (dispatch) => {
    try {
        const { data } = await api.fetchNotipin();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createNotipin = (notipin) => async (dispatch) => {
    try {
        const { data } = await api.createNotipin(notipin);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
