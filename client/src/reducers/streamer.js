import { CREATE_STREAMER, FETCH_ALL_STREAMER } from "../constants/constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default (streamer = [], action) => {
    switch (action.type) {
        case FETCH_ALL_STREAMER:
            return action.payload;
        case CREATE_STREAMER:
            return [...streamer, action.payload];
        default:
            return streamer;
    }
};
