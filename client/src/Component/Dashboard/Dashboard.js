import React from "react";
import { useParams } from "react-router";
import Card from "../Card/Card";

import "./Dashboard.css";

const Dashboard = () => {
    const params = useParams();

    return (
        <div className="dashboard-container margintop">
            <Card
                title={"History"}
                goto={`/result/notipin/${params.id}`}
                desc={"Melihat history"}
            />
            <Card
                title={"Link Here"}
                goto={`/linkhere/${params.id}`}
                desc={"Link ada disini"}
            />
            <Card
                title={"Overlay Notipin"}
                goto={`/popupnotipin/${params.id}`}
                desc={"Saya sarankan gausa dipencet"}
            />
            <Card
                title={"Overlay Videoni"}
                goto={`/popupvideoni/${params.id}`}
                desc={"Saya sarankan gausa dipencet"}
            />
        </div>
    );
};

export default Dashboard;
