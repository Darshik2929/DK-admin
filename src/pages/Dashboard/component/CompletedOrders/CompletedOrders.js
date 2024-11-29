import React, { useEffect, useState } from "react";
import API from "../../../../API/API";
import DepartmentWiseOrder from "../DepartmentWiseOrder";

export default function CompletedOrders() {
    const [completedOrder, setCompletedOrder] = useState([]);

    const fetchCompletedOrder = async () => {
        try {
            const response = await API.get("/admin/dashboard/department-completed-order");

            console.log(`const response = `, response);

            setCompletedOrder(response.orders);
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    useEffect(() => {
        fetchCompletedOrder();
    }, []);

    return (
        <>
            <div className="flex flex-row gap-8 w-full mb-8">
                {completedOrder?.map((el, index) => {
                    return (
                        <div key={index} className="w-full">
                            <DepartmentWiseOrder department={el.department} order={el.order} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
