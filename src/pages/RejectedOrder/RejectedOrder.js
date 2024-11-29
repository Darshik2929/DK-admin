import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import MachiningRejectedOrder from "./component/Machining/MachiningRejectedOrder";
import MachiningOrderCard, { PackagingOrderCard } from "../OrderStatus/component/OrderCard";
import BillingCard from "../OrderStatus/component/BillingOrders/Card";
import API from "../../API/API";
import Badge from "../../components/Badge/Badge";

export default function RejectedOrder() {
    const [department, setDepartment] = useState([
        { title: "Machining", value: "machining", card: MachiningOrderCard },
        { title: "Packaging", value: "packaging", card: PackagingOrderCard },
        { title: "Billing", value: "billing", card: BillingCard },
    ]);

    const [activeDepartment, setActiveDepartment] = useState("machining");

    const [totalOrdersNumber, setTotalOrdersNumber] = useState(0);

    const fetchRejectedOrder = async (department, departmentTitle) => {
        try {
            const response = await API.get(`user/orders/${department}/rejected`);

            setDepartment((prevDepartment) => prevDepartment.map((el) => (el.value === department ? { ...el, title: `${departmentTitle} ${response?.orders?.length}` } : el)));

            return response?.orders?.length;
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const updateTotalOrders = async () => {
        const machiningOrders = await fetchRejectedOrder("machining", "Machining");
        const packagingOrders = await fetchRejectedOrder("packaging", "Packaging");
        const billingOrders = await fetchRejectedOrder("billing", "Billing");

        const totalOrders = machiningOrders + packagingOrders + billingOrders;
        setTotalOrdersNumber((prevState) => {
            // setIsNewOrderStatue(prevState !== totalOrders);
            return totalOrders;
        });
    };

    useEffect(() => {
        updateTotalOrders();
        const interval = setInterval(updateTotalOrders, 10000);
        return () => clearInterval(interval);
    }, []);

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
                {activeDepartment === "machining" && <MachiningRejectedOrder Card={department.find((el) => el.value === activeDepartment).card} department="machining" />}
                {activeDepartment === "packaging" && <MachiningRejectedOrder Card={department.find((el) => el.value === activeDepartment).card} department="packaging" />}
                {activeDepartment === "billing" && <MachiningRejectedOrder Card={department.find((el) => el.value === activeDepartment).card} department="billing" />}
            </div>
        </>
    );
}
