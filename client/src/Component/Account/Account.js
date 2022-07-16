import React from "react";
import { useParams } from "react-router";
import Card from "../Card/Card";

import "./Account.css";

const Account = () => {
    const params = useParams();

    return (
        <div className="account-container margintop">
            <Card
                title={"NOTIPIN"}
                desc={"biar ada notip"}
                goto={`/notipin/${params.id}`}
                disable={false}
            />
            <Card
                title={"ABSEN"}
                desc={"bang absen bang"}
                goto={"ABSEN"}
                disable={true}
            />
        </div>
    );
};

export default Account;
