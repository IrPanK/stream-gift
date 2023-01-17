import React from "react";
import { Link, useParams } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = ({ active }) => {
    const params = useParams();

    return (
        <div className="sidebar-container">
            <ul>
                <li
                    className={
                        active === "notipin"
                            ? "sidebar-active"
                            : active === "history-notipin"
                            ? "sidebar-active"
                            : active === "videoni"
                            ? "sidebar-nav"
                            : active === "history-videoni"
                            ? "sidebar-nav"
                            : "sidebar-nav"
                    }
                >
                    <Link
                        to={
                            active === "videoni"
                                ? `/notipin/${params.id}`
                                : active === "history-videoni"
                                ? `/result/notipin`
                                : ""
                        }
                    >
                        {active === "notipin"
                            ? "Pesan Cintamu"
                            : active === "videoni"
                            ? "Pesan Cintamu"
                            : active === "history-notipin"
                            ? "History Notipin"
                            : active === "history-videoni"
                            ? "History Notipin"
                            : ""}
                    </Link>
                </li>
                <li
                    className={
                        active === "videoni"
                            ? "sidebar-active"
                            : active === "history-videoni"
                            ? "sidebar-active"
                            : active === "notipin"
                            ? "sidebar-nav"
                            : active === "history-notipin"
                            ? "sidebar-nav"
                            : "sidebar-nav"
                    }
                >
                    <Link
                        to={
                            active === "notipin"
                                ? `/videoni/${params.id}`
                                : active === "history-notipin"
                                ? `/result/videoni`
                                : ""
                        }
                    >
                        {active === "notipin"
                            ? "Video Gan"
                            : active === "videoni"
                            ? "Video Gan"
                            : active === "history-notipin"
                            ? "History Videoni"
                            : active === "history-videoni"
                            ? "History Videoni"
                            : ""}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
