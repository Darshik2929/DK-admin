import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import MachiningOrders from "./component/machining/MachiningOrders";
import MachiningOrderCard, { PackagingOrderCard } from "./component/OrderCard";
import BillingOrders from "./component/BillingOrders/BillingOrders";
import API from "../../API/API";
import Badge from "../../components/Badge/Badge";

export default function Index() {
    const [department, setDepartment] = useState([
        { title: "Machining", value: "machining", card: MachiningOrderCard },
        { title: "Packaging", value: "packaging", card: PackagingOrderCard },
        { title: "Billing", value: "billing" },
    ]);

    const [totelOrdersNumber, setTotelOrdersNumber] = useState(0);

    const fetchOrders = async (departmentValue, departmentTitle, activeKey, pendingKey) => {
        try {
            const [acceptedResponse, pendingResponse] = await Promise.all([
                API.get(`/user/orders/${departmentValue}/${activeKey}`),
                API.get(`/user/orders/${departmentValue}/${pendingKey}`),
            ]);

            const active = [];
            const pending = [];

            departmentValue === "billing" && activeKey === "active"
                ? acceptedResponse.data.forEach((order) => {
                      if (order[departmentValue].active) {
                          active.push(order);
                      } else {
                          pending.push(order);
                      }
                  })
                : acceptedResponse.orders.forEach((order) => {
                      if (order[departmentValue].active) {
                          active.push(order);
                      } else {
                          pending.push(order);
                      }
                  });

            const totalOrders = active.length + pending.length + pendingResponse.orders.length;

            setTotelOrdersNumber((prevState) => prevState + Number(totalOrders));

            setDepartment((prevDepartment) => prevDepartment.map((el) => (el.value === departmentValue ? { ...el, title: `${departmentTitle} ${totalOrders}` } : el)));
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    useEffect(() => {
        fetchOrders("machining", "Machining", "accepted", "pending");
        fetchOrders("packaging", "Packaging", "accepted", "pending");
        fetchOrders("billing", "Billing", "active", "pending");

        // setInterval(() => {
        //     fetchOrders("machining", "Machining", "accepted", "pending");
        //     fetchOrders("packaging", "Packaging", "accepted", "pending");
        //     fetchOrders("billing", "Billing", "active", "pending");
        // }, 10000);
    }, []);

    const [activeDepartment, setActiveDepartment] = useState("machining");

    return (
        <>
            <div className="flex flex-row items-center gap-4 max-w-[28vw] mb-6">
                {department.map((dept) => {
                    const titleArr = dept.title.split(" ");

                    const title1 = titleArr[0];

                    const title2 = titleArr[1];

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
                                activeDepartment === dept.value
                                    ? "bg-neutral-300 border-neutral-300 border"
                                    : "bg-neutral-100 border-neutral-300 border text-black hover:bg-neutral-200"
                            }`}
                        />
                    );
                })}
            </div>

            <div className="pt-6 border-t border-neutral-300">
                {activeDepartment === "machining" && <MachiningOrders Card={department.find((el) => el.value === activeDepartment).card} department="machining" />}
                {activeDepartment === "packaging" && <MachiningOrders Card={department.find((el) => el.value === activeDepartment).card} department="packaging" />}
                {activeDepartment === "billing" && <BillingOrders />}
            </div>
        </>
    );
}
