import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import API from "../../../../API/API";
import BillingCard from "../../../OrderStatus/component/BillingOrders/Card";

export default function BillingRejectedOrders() {
    const ordersStatus = [
        { label: "New order", value: "pending" },
        { label: "Attach Bill", value: "attachBill" },
    ];

    const [activeDepartment, setActiveDepartment] = useState("pending");

    const initialOrderState = { pending: [], attachBill: [] };
    const [order, setOrder] = useState(initialOrderState);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const [activeResponse, pendingResponse] = await Promise.all([API.get(`/user/orders/billing/active`), API.get(`/user/orders/billing/pending`)]);

            setOrder({
                attachBill: activeResponse.orders,
                pending: pendingResponse.orders,
            });
        } catch (error) {
            console.log(`error ==>`, error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setOrder(initialOrderState);
        fetchOrders();
    }, []);

    return (
        <>
            <div className="flex flex-row items-center gap-4 max-w-[28vw] mb-6">
                {ordersStatus.map((dept) => (
                    <Button
                        key={dept.value}
                        label={dept.label}
                        onClick={() => setActiveDepartment(dept.value)}
                        bg={`transition-colors duration-300 ${
                            activeDepartment === dept.value ? "bg-neutral-300" : "bg-neutral-100 border-neutral-300 border text-black hover:bg-neutral-200"
                        }`}
                    />
                ))}
            </div>

            <div className="-mx-4">
                {isLoading ? (
                    <span className="ml-4 mt-4">Loading...</span> // Loading indicator
                ) : order[activeDepartment].length ? (
                    order[activeDepartment].map((el, index) => (
                        <div className="inline-block align-top m-4 max-w-[30%] w-full" key={index}>
                            <BillingCard {...el} department={activeDepartment} />
                        </div>
                    ))
                ) : (
                    <span className="ml-4 mt-4">No Order at This Moment</span>
                )}
            </div>
        </>
    );
}
