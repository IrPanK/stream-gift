import * as api from "../api";

import { CREATE_STREAMER, FETCH_ALL_STREAMER } from "../constants/constants";

export const getStreamer = () => async (dispatch) => {
    try {
        const { data } = await api.fetchStreamer();

        dispatch({ type: FETCH_ALL_STREAMER, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createStreamer = (streamer) => async (dispatch) => {
    try {
        const { data } = await api.createStreamer(streamer);

        dispatch({ type: CREATE_STREAMER, payload: data });
    } catch (error) {
        console.log(error);
    }
};
