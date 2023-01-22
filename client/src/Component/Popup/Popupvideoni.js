import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { io } from "socket.io-client";
import { Link, useLocation } from "react-router-dom";

import "./Popup.css";

const Popupvideoni = () => {
    const { search } = useLocation();
    const parameters = new URLSearchParams(search);

    const [videoni, setVideoni] = useState("");
    const [duration, setDuration] = useState(0);
    const [play, setPlay] = useState(0);
    const [popupData, setPopupData] = useState("");
    const [userId, setUser] = useState(parameters.get("user"));

    const ENDPOINT = process.env.SERVER_URL;

    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.on("popupVideoni", ({ videoniData }) => {
            if (videoniData.destination === userId) {
                setVideoni(videoniData);
                setDuration(Number(`${videoniData.duration}000`));
                setPlay(Number(videoniData.start));
            }
        });

        if (popupData === "") {
            setPopupData(videoni);
        }
    }, [videoni]);

    useEffect(() => {
        setTimeout(() => {
            setVideoni("");
            setPopupData("");
        }, duration);
    }, [popupData]);

    return (
        <div>
            {userId ? (
                popupData ? (
                    <div className="popin">
                        <ReactPlayer
                            url={popupData.url}
                            config={{
                                youtube: {
                                    playerVars: {
                                        start: play,
                                        autoPlay: 1,
                                    },
                                },
                            }}
                            playing
                            volume={0.25}
                            className="video"
                        />
                        <div className="popup-container">
                            <h1 className="popup-text">
                                {popupData.creator}
                                &nbsp;
                                <span className="popup-span">curhat</span>
                            </h1>
                            <h1 className="popup-text popup-message">
                                {popupData.message}
                            </h1>
                        </div>
                    </div>
                ) : null
            ) : (
                <div className="popup-notloggedin-container">
                    <h1>You're Not Logged Yet</h1>
                    <Link to={"/auth"} className="popup-notloggedin-button">
                        Sign In
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Popupvideoni;
