import React, { useEffect, useState } from "react";
import API from "../../API/API";
import ClientOrderCard from "./components/ClientOrderCard";

export default function ClientOrder() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await API.get(`/client/get-client-order/accepted/${true}`);
            setOrders(response.orders);
        } catch (error) {
            console.log("error API.get(/client/get-client : ", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 pb-4 border-b border-neutral-300">Client Orders</h1>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!!orders.length ? (
                    orders.map((order, index) => <ClientOrderCard fetchOrders={fetchOrders} key={index} order={order} />)
                ) : (
                    <>
                        <span className="mt-4">No Order at This Moment</span>
                    </>
                )}
            </div>
        </div>
    );
}
