import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Link, useLocation } from "react-router-dom";

import "./Popup.css";
import audio from "../../Audios/audioNotif.wav";

const PopupNotipin = ({ currentSocket }) => {
    const { search } = useLocation();
    const parameters = new URLSearchParams(search);

    const [popupData, setPopupData] = useState([]);
    const [popupMessage, setPopupMessage] = useState("");
    const [creator, setCreator] = useState("");
    const [message, setMessage] = useState("");
    const [userId, setUser] = useState(parameters.get("user"));

    const ENDPOINT = process.env.SERVER_URL;

    useEffect(() => {
        if (popupMessage === "") {
            const socket = io(ENDPOINT);
            socket.on("popupNotipin", ({ notipinData }) => {
                if (notipinData.destination === userId) {
                    setCreator(notipinData.creator);
                    setMessage(notipinData.message);
                }
            });

            setPopupData([
                ...popupData,
                {
                    creator,
                    message,
                },
            ]);
        }
    }, [creator, message]);

    useEffect(() => {
        if (creator) {
            setPopupMessage(
                `${popupData[popupData.length - 1]?.creator} curhat ${
                    popupData[popupData.length - 1]?.message
                }`
            );
        }

        return () => {
            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => setPopupMessage(""), 10000);
        };
    }, [popupData]);

    return (
        <div>
            {userId ? (
                popupMessage === "" ? null : (
                    <div>
                        <div
                            className={`popup-container ${
                                popupMessage === "" ? null : "popin"
                            }`}
                        >
                            <h1 className="popup-text">
                                {popupMessage.split("curhat")[0]}{" "}
                                <span className="popup-span">curhat</span>
                            </h1>
                            <h1 className="popup-text popup-message">
                                {popupMessage.split("curhat")[1].length >= 200
                                    ? `${popupMessage
                                          .split("curhat")[1]
                                          .substr(0, 200)}...`
                                    : popupMessage.split("curhat")[1]}
                            </h1>
                        </div>

                        <audio controls autoPlay className="audio">
                            <source src={audio} type="audio/wav" />
                        </audio>
                    </div>
                )
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

export default PopupNotipin;
