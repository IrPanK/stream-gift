import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Sidebar from "../Sidebar/Sidebar";

import "./Result.css";
import { useNavigate } from "react-router";

const ResultNotipin = () => {
    const navigate = useNavigate();

    const { userId } = useSelector((state) => state.auth);
    const notipin = useSelector((state) => state.notipin);

    return (
        <>
            <div
                className="streamer-quest margintop"
                onClick={() => navigate(`/dashboard/`)}
            >
                Streamer Dashboard
            </div>
            <div className="result-container">
                <Sidebar active={"history-notipin"} />
                <div className="result-outer">
                    {notipin
                        .filter((e) => e.destination === userId)
                        .map((notip) => (
                            <div className="result-box" key={notip._id}>
                                <h1 className="result-creator">
                                    {notip.creator}
                                </h1>
                                <h5 className="result-message">
                                    {notip.message}
                                </h5>
                                <h6 className="result-moment">
                                    {moment(notip.createdAt).fromNow()}
                                </h6>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default ResultNotipin;
