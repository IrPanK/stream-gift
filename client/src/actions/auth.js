import decode from "jwt-decode";
import * as api from "../api";
import { AUTH, FETCH_USER, LOGOUT } from "../constants/constants";

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
        dispatch(getUser());

        navigate("/");
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });
        dispatch(getUser());

        navigate("/");
    } catch (error) {
        console.log(error);
        console.log(error.response.data);
    }
};

export const getUser = () => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem("profile"));

        if (user) {
            const token = user?.token;

            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({ type: LOGOUT });
            }

            const userId = decodedToken?.sub || decodedToken?.existingUser?._id;
            const name = decodedToken?.name || decodedToken?.existingUser?.name;

            dispatch({ type: FETCH_USER, data: { userId, name } });
        }
    } catch (error) {
        console.log(error);
    }
};
