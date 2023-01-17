import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { createVideoni } from "../../actions/videoni";

import Sidebar from "../Sidebar/Sidebar";
import "./Videoni.css";

const initialState = {
    creator: "",
    message: "",
    url: "",
    start: "",
    duration: "",
    destination: "",
};

const Videoni = ({ currentSocket }) => {
    const dispatch = useDispatch();
    const params = useParams();

    const [videoniData, setVideoniData] = useState({
        ...initialState,
        destination: params.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createVideoni(videoniData));

        setVideoniData({ ...initialState, destination: params.id });

        currentSocket.emit("videoni", { videoniData });
    };

    const handleChange = (e) => {
        setVideoniData({ ...videoniData, [e.target.name]: e.target.value });
    };

    return (
        <div className="videoni-container">
            <Sidebar active={"videoni"} />
            <form className="videoni-form" onSubmit={handleSubmit}>
                <label htmlFor="creator">Namamu</label>
                <input
                    id="creator"
                    name="creator"
                    className="videoni-input"
                    type="text"
                    onChange={handleChange}
                    value={videoniData.creator}
                    maxLength="14"
                    required
                />
                <label htmlFor="message">Pesanmu</label>
                <input
                    id="message"
                    name="message"
                    className="videoni-input"
                    type="text"
                    onChange={handleChange}
                    value={videoniData.message}
                    maxLength="52"
                    required
                />
                <label htmlFor="url">Linknya Bang</label>
                <input
                    id="url"
                    name="url"
                    className="videoni-input"
                    type="text"
                    onChange={handleChange}
                    value={videoniData.url}
                    placeholder="youtube only bang"
                    required
                />
                <div className="videoni-setting">
                    <div>
                        <label htmlFor="start">Mulai dari</label>
                        <input
                            id="start"
                            name="start"
                            className="videoni-input"
                            type="number"
                            onChange={handleChange}
                            value={videoniData.start}
                            placeholder="Mulai dari detik ke..."
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="duration">Durasi</label>
                        <input
                            id="duration"
                            name="duration"
                            className="videoni-input"
                            type="number"
                            onChange={handleChange}
                            value={videoniData.duration}
                            placeholder="..... detik"
                            max="180"
                            required
                        />
                    </div>
                </div>
                <button className="videoni-submit" type="submit">
                    KIRIM
                </button>
            </form>
        </div>
    );
};

export default Videoni;
