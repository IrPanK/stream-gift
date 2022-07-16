import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

import AuthForm from "./AuthForm/AuthForm";

import "./Auth.css";
import { AUTH } from "../../constants/constants";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
};

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCallbackResponse = (res) => {
        const credential = jwt_decode(res?.credential);
        const id = credential?.sub;
        const token = res.credential;

        dispatch({ type: AUTH, data: { id, token } });

        navigate("/");
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:
                "1074214648578-391aqfjv4huoumm0hj37plfvqtffj4ge.apps.googleusercontent.com",
            callback: handleCallbackResponse,
            // ux_mode: "redirect",
        });

        google.accounts.id.renderButton(
            document.getElementById("auth-google"),
            {
                theme: "outline",
                size: "medium",
                text: "Sign in with Google",
                width: 400,
                logo_alignment: "center",
            }
        );
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form className="auth-container" onSubmit={handleSubmit}>
                {isSignup && (
                    <>
                        <AuthForm
                            className="auth-firstName"
                            name={"firstName"}
                            type={"text"}
                            label={"First Name"}
                            handleChange={handleChange}
                        />
                        <AuthForm
                            className="auth-lastName"
                            name={"lastName"}
                            type={"text"}
                            label={"Last Name"}
                            handleChange={handleChange}
                        />
                    </>
                )}
                <AuthForm
                    className="auth-email"
                    name={"email"}
                    type={"email"}
                    label={"Email"}
                    handleChange={handleChange}
                />
                <AuthForm
                    className="auth-password"
                    name={"password"}
                    type={showPassword ? "text" : "password"}
                    label={"Password"}
                    handleChange={handleChange}
                    seePassword={true}
                    showPassword={showPassword}
                />
                {isSignup && (
                    <AuthForm
                        className="auth-confirmPass"
                        name={"confirmPass"}
                        type={"password"}
                        label={"Confirm Password"}
                        handleChange={handleChange}
                    />
                )}
                <button className="auth-button" type="submit">
                    {isSignup ? "Sign Up" : "Sign In"}
                </button>
                <button id="auth-google" className="auth-google"></button>
                <button
                    className="auth-issignup"
                    onClick={() => setIsSignup((prevIsSignup) => !prevIsSignup)}
                    type="button"
                >
                    {isSignup
                        ? "Already Have Account? Sign In"
                        : "Don't Have Account? Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default Auth;
