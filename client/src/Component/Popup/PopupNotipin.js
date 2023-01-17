import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "./Popup.css";
import audio from "../../Audios/audioNotif.wav";
import { useSelector } from "react-redux";

const PopupNotipin = ({ currentSocket }) => {
    const [popupData, setPopupData] = useState([]);
    const [popupMessage, setPopupMessage] = useState("");
    const [creator, setCreator] = useState("");
    const [message, setMessage] = useState("");

    const ENDPOINT = process.env.SERVER_URL;
    const secondValue = { transports: ["websocket", "polling", "flashsocket"] };

    const userId = useSelector((state) => state.auth);

    useEffect(() => {
        if (popupMessage === "") {
            const socket = io(ENDPOINT, secondValue);
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
            {popupMessage === "" ? null : (
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
            )}
        </div>
    );
};

export default PopupNotipin;
