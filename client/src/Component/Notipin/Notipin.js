import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { createNotipin } from "../../actions/notipin";

import Sidebar from "../Sidebar/Sidebar";
import "./Notipin.css";

const Notipin = ({ currentSocket }) => {
    const params = useParams();
    const dispatch = useDispatch();

    const [notipinData, setNotipinData] = useState({
        creator: "",
        message: "",
        destination: params.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createNotipin(notipinData));

        setNotipinData({ ...notipinData, creator: "", message: "" });

        currentSocket.emit("notipin", { notipinData });
    };

    const handleChange = (e) => {
        setNotipinData({ ...notipinData, [e.target.name]: e.target.value });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    return (
        <div className="notipin-container">
            <Sidebar active={"notipin"} />
            <form className="notipin-form" onSubmit={handleSubmit}>
                <label for="creator">Namamu</label>
                <input
                    id="creator"
                    name="creator"
                    className="notipin-input"
                    type={"text"}
                    onChange={handleChange}
                    value={notipinData.creator}
                    maxLength="17"
                    required
                />
                <label for="message">Pesanmu</label>
                <textarea
                    className="text-area"
                    id="message"
                    name="message"
                    onChange={handleChange}
                    onKeyPress={handleKey}
                    value={notipinData.message}
                    required
                ></textarea>
                <button className="notipin-submit" type="submit">
                    SUBMIT
                </button>
            </form>
        </div>
    );
};

export default Notipin;
