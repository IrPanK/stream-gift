import { CREATE_VIDEO, FETCH_ALL_VIDEO } from "../constants/constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default (videoni = [], action) => {
    switch (action.type) {
        case FETCH_ALL_VIDEO:
            return action.payload;
        case CREATE_VIDEO:
            return [...videoni, action.payload];
        default:
            return videoni;
    }
};
