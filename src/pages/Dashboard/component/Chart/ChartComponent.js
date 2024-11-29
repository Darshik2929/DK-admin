import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import API from "../../../../API/API";
import { motion } from "framer-motion";

const ChartComponent = () => {
    const [seriesData, setSeriesData] = useState(Array(12).fill(null)); // Initial series data with 12 months initialized to null

    const options = {
        chart: {
            type: "area",
            height: 350,
            zoom: {
                enabled: false,
            },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            title: {
                text: "Month",
            },
        },
        yaxis: {
            title: {
                text: "Orders Completed",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            color: "#fff2eb",
        },
        fill: {
            opacity: 0.8,
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: "#3f484f",
            },
        },
        tooltip: {
            x: {
                format: "MMM",
            },
        },
    };

    const fetchData = async () => {
        try {
            const response = await API.get("/admin/dashboard/completed-orders-count");
            const fetchedData = response.data;

            // Create an array of 12 months initialized to null
            const fullSeriesData = Array(12).fill(null);

            // Map fetched data to the corresponding month in the array
            fetchedData.forEach((item) => {
                const monthIndex = item.month - 1; // Subtract 1 to convert to zero-based index
                fullSeriesData[monthIndex] = item.orderCount;
            });

            // Find the last month with data
            const lastMonthWithData = Math.max(...fetchedData.map((item) => item.month));

            // Truncate the series data up to the last month with data
            const truncatedSeriesData = fullSeriesData.slice(0, lastMonthWithData);

            // Keep the length of seriesData to 12, adding nulls for the remaining months
            const completeSeriesData = [...truncatedSeriesData, ...Array(12 - truncatedSeriesData.length).fill(null)];

            setSeriesData(completeSeriesData);
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <motion.div className="w-full max-w-[95%] mx-auto" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <ReactApexChart options={options} series={[{ name: "Orders Completed", data: seriesData }]} type="area" height={350} />
        </motion.div>
    );
};

export default ChartComponent;

const data = [
    { orderCount: 1, month: 1 },
    { orderCount: 10, month: 2 },
    { orderCount: 91, month: 4 },
    { orderCount: 5, month: 5 },
    { orderCount: 100, month: 7 },
];
