import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import { getNotipin } from "./actions/notipin";
import Home from "./Component/Home/Home";
import Layout from "./Component/Layout/Layout";
import Notipin from "./Component/Notipin/Notipin";
import Auth from "./Component/Auth/Auth";
import Videoni from "./Component/Videoni/Videoni";
import ResultNotipin from "./Component/Result/ResultNotipin";
import ResultVideoni from "./Component/Result/ResultVideoni";
import { getVideoni } from "./actions/videoni";
import PopupNotipin from "./Component/Popup/PopupNotipin";
import Popupvideoni from "./Component/Popup/Popupvideoni";

import "./App.css";
import { getStreamer } from "./actions/streamer";
import Account from "./Component/Account/Account";
import Dashboard from "./Component/Dashboard/Dashboard";
import Link from "./Component/Link/Link";

const App = () => {
    const [currentSocket, setCurrentSocket] = useState(null);

    const dispatch = useDispatch();
    const ENDPOINT = "https://stream-gift.herokuapp.com";
    const secondValue = { transports: ["websocket", "polling", "flashsocket"] };

    useEffect(() => {
        const socket = io(ENDPOINT, secondValue);
        setCurrentSocket(socket);

        dispatch(getNotipin());
        dispatch(getVideoni());
        dispatch(getStreamer());

        return () => {
            socket.disconnect();
        };
    }, [dispatch, currentSocket?.id]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout content={<Home />} />} />
                <Route
                    path="/result/notipin/:id"
                    element={
                        <Layout
                            content={
                                <ResultNotipin currentSocket={currentSocket} />
                            }
                        />
                    }
                />
                <Route
                    path="/result/videoni/:id"
                    element={
                        <Layout
                            content={
                                <ResultVideoni currentSocket={currentSocket} />
                            }
                        />
                    }
                />
                <Route
                    path="/account/:id"
                    element={
                        <Layout
                            content={<Account currentSocket={currentSocket} />}
                        />
                    }
                />
                <Route
                    path="/notipin/:id"
                    element={
                        <Layout
                            content={<Notipin currentSocket={currentSocket} />}
                        />
                    }
                />
                <Route
                    path="/videoni/:id"
                    element={
                        <Layout
                            content={<Videoni currentSocket={currentSocket} />}
                        />
                    }
                />
                <Route
                    path="/auth"
                    element={
                        <Layout
                            content={<Auth currentSocket={currentSocket} />}
                        />
                    }
                />
                <Route
                    path="/dashboard/:id"
                    element={
                        <Layout
                            content={
                                <Dashboard currentSocket={currentSocket} />
                            }
                        />
                    }
                />
                <Route
                    path="/linkhere/:id"
                    element={
                        <Layout
                            content={<Link currentSocket={currentSocket} />}
                        />
                    }
                />
                <Route
                    path="/popupnotipin/:id"
                    element={<PopupNotipin currentSocket={currentSocket} />}
                />
                <Route
                    path="/popupvideoni/:id"
                    element={<Popupvideoni currentSocket={currentSocket} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
