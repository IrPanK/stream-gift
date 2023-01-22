import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Card from "../Card/Card";
import "./Home.css";
import { createStreamer } from "../../actions/streamer";
import { getUser } from "../../actions/auth";

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [tobeStreamer, setTobeStreamer] = useState(false);
    const [sureStreamer, setSureStreamer] = useState(false);
    const [streamerAccount, setStreamerAccount] = useState("");
    const [searchState, setSearchState] = useState(
        location?.state?.searchState
    );
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );

    const { userId, name } = useSelector((state) => state.auth);
    const streamerList = useSelector((state) => state.streamer);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    useEffect(() => {
        setSearchState(location?.state?.searchState);
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    useEffect(() => {
        setStreamerAccount(streamerList.find((e) => e.idStreamer === userId));
    }, [streamerList, userId]);

    const streamer = () => {
        setTobeStreamer(true);
    };

    const close = () => {
        setTobeStreamer(false);
        setSureStreamer(false);
    };

    const next = () => {
        setSureStreamer(true);
    };

    const makeIt = () => {
        dispatch(createStreamer({ userId, name }));
        setTobeStreamer(false);
    };

    return (
        <div>
            <div className={tobeStreamer ? "blur-back" : "invicible"}>
                <div className="streamer-modal">
                    <div style={{ textAlign: "center" }}>
                        {!sureStreamer
                            ? "Are You Sure Change Your Account To Streamer Account?"
                            : "Ciyusss???"}
                    </div>
                    <div className="streamer-choice">
                        <div className="streamer-option" onClick={close}>
                            No
                        </div>
                        <div
                            className="streamer-option"
                            onClick={!sureStreamer ? next : makeIt}
                        >
                            Yes
                        </div>
                    </div>
                </div>
            </div>
            {user ? (
                userId !== streamerAccount?.idStreamer ? (
                    <div
                        className="streamer-quest margintop"
                        onClick={streamer}
                    >
                        Ingin Jadi Streamer? Klik Saya
                    </div>
                ) : (
                    <div
                        className="streamer-quest margintop"
                        onClick={() => navigate(`/dashboard/`)}
                    >
                        Streamer Dashboard
                    </div>
                )
            ) : (
                <div
                    className="streamer-quest margintop"
                    onClick={() => navigate(`/auth`)}
                >
                    Click To Sign In
                </div>
            )}

            {searchState && (
                <div className="home-search">
                    <button
                        className="home-button-search"
                        onClick={() => setSearchState("")}
                    >
                        Reset
                    </button>
                    <p className="home-text-search">
                        Result of{" "}
                        <span className="home-result-search">
                            {searchState}
                        </span>
                    </p>
                </div>
            )}

            <div className="home-container">
                {streamerList
                    .filter((val) => {
                        if (!searchState) {
                            return val;
                        } else if (
                            val.name
                                .split(" ")
                                .join("")
                                .toLowerCase()
                                .includes(
                                    searchState
                                        .split(" ")
                                        .join("")
                                        .toLowerCase()
                                )
                        ) {
                            return val;
                        }
                    })
                    .map((streamer) => (
                        <div key={streamer.idStreamer}>
                            <Card
                                title={streamer.name}
                                goto={`/account/${streamer.idStreamer}`}
                                disable={false}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Home;
