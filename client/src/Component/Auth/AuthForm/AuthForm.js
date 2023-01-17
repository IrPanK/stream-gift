import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import "./AuthForm.css";

const AuthForm = ({
    name,
    label,
    type,
    className,
    handleChange,
    seePassword,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={className}>
            <label className={`label-${className} auth-label`} htmlFor={name}>
                {label}
            </label>
            <input
                className={`input-${className} auth-input`}
                name={name}
                id={name}
                type={!seePassword ? type : showPassword ? "text" : "password"}
                onChange={handleChange}
                required
            />
            {seePassword ? (
                <div
                    className="button-pass"
                    type="button"
                    onClick={() =>
                        setShowPassword((prevShowPassword) => !prevShowPassword)
                    }
                >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                </div>
            ) : null}
        </div>
    );
};

export default AuthForm;
