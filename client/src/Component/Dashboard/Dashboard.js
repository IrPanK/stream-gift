import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

import "./Dashboard.css";

const Dashboard = () => {
    const { userId } = useSelector((state) => state.auth);

    return (
        <div className="dashboard-container margintop">
            <Card
                title={"History"}
                goto={`/result/notipin`}
                desc={"Melihat history"}
            />
            <Card
                title={"Link Here"}
                goto={`/linkhere`}
                desc={"Link ada disini"}
            />
            <Card
                title={"Overlay Notipin"}
                goto={`/popupnotipin?user=${userId}`}
                desc={"Saya sarankan gausa dipencet"}
            />
            <Card
                title={"Overlay Videoni"}
                goto={`/popupvideoni?user=${userId}`}
                desc={"Saya sarankan gausa dipencet"}
            />
        </div>
    );
};

export default Dashboard;
