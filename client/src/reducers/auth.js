import { AUTH, FETCH_USER, LOGOUT, USER_LOGOUT } from "../constants/constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action?.data })
            );
            return { ...state, authData: action?.data };

        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null };

        case FETCH_USER:
            return action.data;

        case USER_LOGOUT:
            return { ...state, authData: null };

        default:
            return state;
    }
};
