import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Sidebar from "../Sidebar/Sidebar";

import "./Result.css";
import { useNavigate } from "react-router";

const ResultVideoni = () => {
    const navigate = useNavigate();

    const { userId } = useSelector((state) => state.auth);
    const videoni = useSelector((state) => state.videoni);

    return (
        <>
            <div
                className="streamer-quest margintop"
                onClick={() => navigate(`/dashboard`)}
            >
                Streamer Dashboard
            </div>
            <div className="result-container">
                <Sidebar active={"history-videoni"} />
                <div className="result-outer">
                    {videoni
                        .filter((e) => e.destination === userId)
                        .map((video) => (
                            <div className="result-box" key={video._id}>
                                <h1 className="result-creator">
                                    {video.creator}
                                </h1>
                                <h5 className="result-message">
                                    {video.message}
                                </h5>
                                <p
                                    className="result-url"
                                    onClick={() => window.open(video.url)}
                                >
                                    {video.url}
                                </p>
                                <p className="result-setting">
                                    Start: &nbsp; {video.start}
                                </p>
                                <p className="result-setting">
                                    Duration: &nbsp; {video.duration}
                                </p>
                                <h6 className="result-moment">
                                    {moment(video.createdAt).fromNow()}
                                </h6>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default ResultVideoni;
