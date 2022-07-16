import * as api from "../api";
import { AUTH } from "../constants/constants";

export const signin = (formData, navigate) => async (dispacth) => {
    try {
        const { data } = await api.signIn(formData);

        dispacth({ type: AUTH, data });

        navigate("/");
    } catch (error) {
        alert(error.response.data.message);
    }
};

export const signup = (formData, navigate) => async (dispacth) => {
    try {
        const { data } = await api.signUp(formData);

        dispacth({ type: AUTH, data });

        navigate("/");
    } catch (error) {
        console.log(error);
        console.log(error.response.data);
    }
};
