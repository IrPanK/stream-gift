import { CREATE, FETCH_ALL } from "../constants/constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default (notipin = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...notipin, action.payload];
        default:
            return notipin;
    }
};
