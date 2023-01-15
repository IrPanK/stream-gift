import { useNavigate } from "react-router";

import "./Card.css";

const Card = ({ title, desc, disable, goto }) => {
    let navigate = useNavigate();

    const moveTo = (props) => {
        navigate(`${props.target.id}`);
    };

    return (
        <div
            className={`card ${disable ? "card-disable" : ""}`}
            onClick={disable ? null : moveTo}
            id={goto}
        >
            <h1
                className={
                    title === "NOTIPIN"
                        ? "card-title"
                        : title === "ABSEN"
                        ? "card-title"
                        : "card-title-streamer"
                }
                id={goto}
            >
                {title}
            </h1>
            <h5
                className={
                    title === "NOTIPIN"
                        ? "card-desc"
                        : title === "ABSEN"
                        ? "card-desc"
                        : "card-desc-streamer"
                }
                id={goto}
            >
                {desc}
            </h5>
        </div>
    );
};

export default Card;
