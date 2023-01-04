import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { io } from "socket.io-client";

import "./Popup.css";

const Popupvideoni = () => {
    const params = useParams();

    const [videoni, setVideoni] = useState("");
    const [duration, setDuration] = useState(0);
    const [play, setPlay] = useState(0);
    const [popupData, setPopupData] = useState("");

    const ENDPOINT = "https://stream-gift-production.up.railway.app/";
    const secondValue = { transports: ["websocket", "polling", "flashsocket"] };

    useEffect(() => {
        const socket = io(ENDPOINT, secondValue);
        socket.on("popupVideoni", ({ videoniData }) => {
            if (videoniData.destination === params.id) {
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
        <>
            <div>
                {popupData ? (
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
                ) : null}
            </div>
        </>
    );
};

export default Popupvideoni;
