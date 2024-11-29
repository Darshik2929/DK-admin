import React from "react";
import StatusWiseCard from "./component/StatusWiseCard/StatusWiseCard";
import ChartComponent from "./component/Chart/ChartComponent";
import CompletedOrders from "./component/CompletedOrders/CompletedOrders";
import DownloadReport from "./component/DownloadReport/DownloadReport";

export default function Dashboard() {
    return (
        <>
            <StatusWiseCard />

            <ChartComponent />

            <CompletedOrders />

            <DownloadReport />
        </>
    );
}
