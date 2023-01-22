import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import "./Link.css";

const Link = () => {
    const navigate = useNavigate();

    const [copySuccess, setCopySuccess] = useState("");
    const [message, setMessage] = useState(false);
    const [notipin, setNotipin] = useState(false);
    const [videoni, setVideoni] = useState(false);

    const { userId } = useSelector((state) => state.auth);

    const copyToClipBoard = async (copyMe) => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess("Copied!");
            setInterval(() => {
                setMessage(false);
                setNotipin(false);
                setVideoni(false);
            }, 2000);
        } catch (err) {
            setCopySuccess("Failed to copy!");
        }
    };

    return (
        <div>
            <div
                className="streamer-quest margintop"
                onClick={() => navigate(`/dashboard`)}
            >
                Streamer Dashboard
            </div>

            <div className="link-container">
                <div className="link-box">
                    <p className="link-text">Link Ngirim Pesan/Video</p>
                    <div className="link-putbut">
                        <input
                            className="link-input"
                            value={`https://streamgift.netlify.app/notipin/${userId}`}
                        />
                        <button
                            className="link-button"
                            onClick={() => {
                                copyToClipBoard(
                                    `https://streamgift.netlify.app/notipin/${userId}`
                                );
                                setMessage(true);
                            }}
                        >
                            Copy
                        </button>
                    </div>
                    <span className="link-span">{message && copySuccess}</span>
                </div>
                <div className="link-box">
                    <p className="link-text">Link Overlay Notipin</p>
                    <div className="link-putbut">
                        <input
                            className="link-input"
                            value={`https://streamgift.netlify.app/popupnotipin`}
                        />
                        <button
                            className="link-button"
                            onClick={() => {
                                copyToClipBoard(
                                    `https://streamgift.netlify.app/popupnotipin`
                                );
                                setNotipin(true);
                            }}
                        >
                            Copy
                        </button>
                    </div>
                    <span className="link-span">{notipin && copySuccess}</span>
                </div>
                <div className="link-box">
                    <p className="link-text">Link Overlay Videoni</p>
                    <div className="link-putbut">
                        <input
                            className="link-input"
                            value={`https://streamgift.netlify.app/popupvideoni`}
                        />
                        <button
                            className="link-button"
                            onClick={() => {
                                copyToClipBoard(
                                    `https://streamgift.netlify.app/popupvideoni`
                                );
                                setVideoni(true);
                            }}
                        >
                            Copy
                        </button>
                    </div>
                    <span className="link-span">{videoni && copySuccess}</span>
                </div>
            </div>
        </div>
    );
};

export default Link;
