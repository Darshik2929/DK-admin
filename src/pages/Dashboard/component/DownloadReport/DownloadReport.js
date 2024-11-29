import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Button from "../../../../components/Button/Button";
import axios from "axios";

const DownloadReport = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const getReport = async () => {
        let authenticationData = localStorage.getItem("auth_token");
        try {
            const response = await axios.get(`https://node-dk-product-xi.vercel.app/api/download/download-report`, {
                // const response = await axios.get(`${"http://localhost:5000/api"}/download/download-report`, {
                params: { startDate, endDate },
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${authenticationData}`,
                },
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "orders.xlsx");
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error downloading the Excel file:", error);
            alert("Error downloading the file.");
        }
    };

    const handleDownload = () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const formattedStartDate = format(startDate, "yyyy-MM-dd");
        const formattedEndDate = format(endDate, "yyyy-MM-dd");

        getReport();

        alert(`Download triggered for the date range: ${formattedStartDate} to ${formattedEndDate}`);
    };

    const downloadInventory = async () => {
        let authenticationData = localStorage.getItem("auth_token");
        try {
            // const response = await axios.get(`${"http://localhost:5000/api"}/download/inventory-report`, {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/download/download-report`, {
                params: { startDate, endDate },
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${authenticationData}`,
                },
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "orders.xlsx");
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error downloading the Excel file:", error);
            alert("Error downloading the file.");
        }
    };

    return (
        <div className="flex flex-row items-end justify-between space-y-4 bg-white shadow-lg rounded-xl p-6 border border-neutral-300 hover:border-[#3f484f] transition-colors duration-300">
            <div className="flex space-x-4">
                <div className="flex flex-col">
                    <label className="text-xl font-bold text-[#3f484f]">Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Select start date"
                        className="border border-gray-300 rounded-md p-2 mt-1"
                    />
                </div>

                {/* End Date Picker */}
                <div className="flex flex-col">
                    <label className="text-xl font-bold text-[#3f484f]">End Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="Select end date"
                        className="border border-gray-300 rounded-md p-2 mt-1"
                    />
                </div>
            </div>

            <div className="flex flex-row gap-4 w-full justify-end">
                <Button label="Download Inventory Report" onClick={downloadInventory} disabled={!(startDate && endDate)} className="max-w-[250px]" />
                <Button label="Download Order Report" onClick={handleDownload} disabled={!(startDate && endDate)} className="max-w-[250px]" />
            </div>
        </div>
    );
};

export default DownloadReport;
