import * as api from "../api";
import { CREATE_VIDEO, FETCH_ALL_VIDEO } from "../constants/constants";

export const getVideoni = () => async (dispatch) => {
    try {
        const { data } = await api.fetchVideoni();

        dispatch({ type: FETCH_ALL_VIDEO, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createVideoni = (videoni) => async (dispatch) => {
    try {
        const { data } = await api.createVideoni(videoni);

        dispatch({ type: CREATE_VIDEO, payload: data });
    } catch (error) {
        console.log(error);
    }
};
