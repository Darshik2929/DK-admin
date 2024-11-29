import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import API from "../../../../API/API";
import Card from "./Card";
import Badge from "../../../../components/Badge/Badge";

export default function BillingOrders() {
    const [ordersStatus, setOrdersStatus] = useState([
        { label: "New order", value: "pending" },
        { label: "Attach Bill", value: "attachBill" },
    ]);

    const [activeDepartment, setActiveDepartment] = useState("pending");

    const initialOrderState = { pending: [], attachBill: [] };
    const [order, setOrder] = useState(initialOrderState);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const [activeResponse, pendingResponse] = await Promise.all([API.get(`/user/orders/billing/active`), API.get(`/user/orders/billing/pending`)]);

            setOrdersStatus([
                { label: `New order ${activeResponse?.data?.length}`, value: "pending" },
                { label: `Attach Bill ${pendingResponse?.orders?.length}`, value: "attachBill" },
            ]);

            setOrder({
                attachBill: activeResponse.data,
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
                {ordersStatus.map((dept) => {
                    const titleArr = dept.label.split(" ");

                    const title1 = titleArr[0] + " " + titleArr[1];

                    const title2 = titleArr[2];

                    return (
                        <Button
                            key={dept.value}
                            label={
                                <>
                                    <span className="flex flex-row gap-2 justify-center">
                                        {title1} <Badge number={Number(title2)} />
                                    </span>
                                </>
                            }
                            // label={dept.label}
                            onClick={() => setActiveDepartment(dept.value)}
                            bg={`transition-colors duration-300 ${
                                activeDepartment === dept.value ? "bg-neutral-300" : "bg-neutral-100 border-neutral-300 border text-black hover:bg-neutral-200"
                            }`}
                        />
                    );
                })}
            </div>

            <div className="-mx-4">
                {isLoading ? (
                    <span className="ml-4 mt-4">Loading...</span> // Loading indicator
                ) : order[activeDepartment].length ? (
                    order[activeDepartment].map((el, index) => (
                        <div className="inline-block align-top m-4 max-w-[30%] w-full" key={index}>
                            <Card {...el} department={activeDepartment} />
                        </div>
                    ))
                ) : (
                    <span className="ml-4 mt-4">No Order at This Moment</span>
                )}
            </div>
        </>
    );
}
