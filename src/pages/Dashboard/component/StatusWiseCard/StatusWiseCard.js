import React, { useEffect, useState } from "react";
import OrderCard from "../OrderCard";
import API from "../../../../API/API";

export default function StatusWiseCard() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await API.get("/admin/dashboard/department-orders-status");

            setOrders(response.data);
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <div className="flex flex-row gap-8 w-full mb-8">
                {orders?.map((el, index) => {
                    return (
                        <div key={index} className="w-full">
                            <OrderCard status={el.status} order={el.order} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
