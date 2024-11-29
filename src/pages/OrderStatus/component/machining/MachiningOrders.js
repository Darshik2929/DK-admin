import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import API from "../../../../API/API";
import Badge from "../../../../components/Badge/Badge";

export default function MachiningOrders(props) {
    const { department, Card } = props;

    const [ordersStatus, setOrdersStatus] = useState([
        { label: "Active", value: "active" },
        { label: "New order", value: "newOrder" },
        { label: "Pending", value: "pending" },
    ]);

    const [activeDepartment, setActiveDepartment] = useState("active");

    const initialOrderState = { active: [], pending: [], newOrder: [] };
    const [order, setOrder] = useState(initialOrderState);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const [acceptedResponse, pendingResponse] = await Promise.all([API.get(`/user/orders/${department}/accepted`), API.get(`/user/orders/${department}/pending`)]);

            const active = [];
            const pending = [];

            acceptedResponse.orders.forEach((order) => {
                if (order[department].active) {
                    active.push(order);
                } else {
                    pending.push(order);
                }
            });

            const departmentPrevState = ordersStatus.map((el) => {
                if (el.value === "active") {
                    return { ...el, label: `Active ${active.length}` };
                }
                if (el.value === "newOrder") {
                    return { ...el, label: `New order ${pendingResponse.orders.length}` };
                }
                if (el.value === "pending") {
                    return { ...el, label: `Pending ${pending.length}` };
                }
                return el;
            });

            setOrdersStatus(departmentPrevState);

            setOrder({
                active,
                pending,
                newOrder: pendingResponse.orders,
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
    }, [department]);

    return (
        <>
            <div className="flex flex-row items-center gap-4 max-w-[28vw] mb-6">
                {ordersStatus.map((dept) => {
                    const titleArr = dept.label.split(" ");

                    const title1 = dept.value === "newOrder" ? titleArr[0] + titleArr[1] : titleArr[0];

                    const title2 = dept.value === "newOrder" ? titleArr[2] : titleArr[1];

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
                            onClick={() => setActiveDepartment(dept.value)}
                            bg={`transition-colors duration-300 ${
                                activeDepartment === dept.value ? "bg-neutral-300" : "bg-neutral-100 border-neutral-300 border text-black hover:border-0 hover:bg-neutral-200"
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
                        <div className="inline-block align-top m-4 max-w-[45%] w-full" key={index}>
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
