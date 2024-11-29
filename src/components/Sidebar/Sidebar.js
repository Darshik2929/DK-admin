import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactComponent as DashboardIcon } from "../../Assets/dashboard.svg";
import { ReactComponent as RejectedOrderIcon } from "../../Assets/reimbursement.svg";
import { ReactComponent as UserIcon } from "../../Assets/user.svg";
import { ReactComponent as ClientIcon } from "../../Assets/group.svg";
import { ReactComponent as SettingIcon } from "../../Assets/settings.svg";
import { ReactComponent as POSIcon } from "../../Assets/pos.svg";
import { ReactComponent as MenuIcon } from "../../Assets/menu.svg";
import { ReactComponent as ScheduleIcon } from "../../Assets/schedule.svg";
import { ReactComponent as OrderIcon } from "../../Assets/order.svg";
import dkLogo from "../../Assets/dkLogo.png";
import API from "../../API/API";
import useEscapeKey from "../../helpers/useEscapeKey";

const sidebarVariants = {
    open: { width: "16rem", transition: { duration: 0.5, ease: "easeInOut" } },
    closed: { width: "4rem", transition: { duration: 0.5, ease: "easeInOut" } },
};

const linkVariants = {
    hover: {
        backgroundColor: "#4A5568",
        transition: { duration: 0.3 },
        paddingLeft: 25,
    },
};

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleDestruction = async () => {
        try {
            await API.post("/destroy", { password });
            navigate("/dashboard");
        } catch (error) {
            console.log(`error : `, error);
        }

        console.log("Destruction confirmed with password:", password);

        setIsModalOpen(false);

        setPassword("");
    };

    useEscapeKey(() => setIsModalOpen(false));

    const [isNewOrderStatue, setIsNewOrderStatue] = useState(false);

    const [totalOrdersNumber, setTotalOrdersNumber] = useState(0);

    const fetchOrders = async (departmentValue, departmentTitle, activeKey, pendingKey) => {
        try {
            const [acceptedResponse, pendingResponse] = await Promise.all([
                API.get(`/user/orders/${departmentValue}/${activeKey}`),
                API.get(`/user/orders/${departmentValue}/${pendingKey}`),
            ]);

            const active = [];
            const pending = [];

            if (departmentValue === "billing" && activeKey === "active") {
                acceptedResponse.data.forEach((order) => {
                    if (order[departmentValue].active) {
                        active.push(order);
                    } else {
                        pending.push(order);
                    }
                });
            } else {
                acceptedResponse.orders.forEach((order) => {
                    if (order[departmentValue].active) {
                        active.push(order);
                    } else {
                        pending.push(order);
                    }
                });
            }

            const totalOrders = active.length + pending.length + pendingResponse.orders.length;
            return totalOrders;
        } catch (error) {
            console.log(`error ==>`, error);
            return 0;
        }
    };

    const updateTotalOrders = async () => {
        const machiningOrders = await fetchOrders("machining", "Machining", "accepted", "pending");
        const packagingOrders = await fetchOrders("packaging", "Packaging", "accepted", "pending");
        const billingOrders = await fetchOrders("billing", "Billing", "active", "pending");

        const totalOrders = machiningOrders + packagingOrders + billingOrders;
        setTotalOrdersNumber((prevState) => {
            setIsNewOrderStatue(prevState !== totalOrders);
            return totalOrders;
        });
    };

    const [totalOrdersNumberRejected, setTotalOrdersNumberRejected] = useState(0);

    const fetchRejectedOrder = async (department, departmentTitle) => {
        try {
            const response = await API.get(`user/orders/${department}/rejected`);

            return response?.orders?.length;
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const updateRejectedOrders = async () => {
        const machiningOrders = await fetchRejectedOrder("machining", "Machining");
        const packagingOrders = await fetchRejectedOrder("packaging", "Packaging");
        const billingOrders = await fetchRejectedOrder("billing", "Billing");

        const totalOrders = machiningOrders + packagingOrders + billingOrders;
        setTotalOrdersNumberRejected((prevState) => {
            // setIsNewOrderStatue(prevState !== totalOrders);
            return totalOrders;
        });
    };

    const [clientOrderLength, setClientOrderLength] = useState(0);

    const fetchClientOrders = async () => {
        try {
            const response = await API.get(`/client/get-client-order/accepted/${true}`);

            setClientOrderLength(response?.orders?.length);
        } catch (error) {
            console.log("error API.get(/client/get-client : ", error);
        }
    };

    useEffect(() => {
        updateTotalOrders();
        updateRejectedOrders();
        fetchClientOrders();

        const interval = setInterval(updateTotalOrders, 10000);
        const rejectionInterval = setInterval(updateRejectedOrders, 10000);
        const clientOrderInterval = setInterval(fetchClientOrders, 10000);

        return () => {
            clearInterval(interval);

            clearInterval(rejectionInterval);

            clearInterval(clientOrderInterval);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 h-screen bg-gradient-to-b from-[#3f484f] to-[#2d343b] text-white flex flex-col items-center py-4"
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                initial={false}
            >
                <div className="text-center text-xl font-bold mb-6 cursor-pointer">
                    <NavLink to="/dashboard">
                        <motion.img src={dkLogo} className="w-48 h-auto mx-auto" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} />
                    </NavLink>
                </div>

                <nav className="flex-1 w-full">
                    <ul className="space-y-2 pl-2">
                        {[
                            { to: "/dashboard", icon: DashboardIcon, label: "Dashboard" },
                            { to: "/order-status", icon: ScheduleIcon, label: `Orders Status ${totalOrdersNumber}` },
                            { to: "/rejected-order", icon: RejectedOrderIcon, label: `Rejected Order ${totalOrdersNumberRejected}` },
                            { to: "/user-setting", icon: UserIcon, label: "User Setting" },
                            { to: "/client", icon: ClientIcon, label: "Client" },
                            { to: "/client-orders", icon: OrderIcon, label: `Client Order ${clientOrderLength}` },
                            { to: "/configuration", icon: SettingIcon, label: "Configuration" },
                            { to: "/inventory", icon: POSIcon, label: "Inventory" },
                            { to: "/product", icon: MenuIcon, label: "Product" },
                        ].map((item) => {
                            // const labelParts = item.label.split("New");
                            // const isNew = labelParts.length > 1;

                            return (
                                <motion.li key={item.to} variants={linkVariants} whileHover="hover" className="group flex items-center">
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `flex items-center py-2 px-2 w-full rounded transition-all duration-300 ${isActive ? "bg-neutral-500" : "hover:bg-gray-600"}`
                                        }
                                    >
                                        <item.icon className="stroke-white h-5 w-5" />
                                        <motion.span className="ml-4" animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }} transition={{ duration: 0.3 }}>
                                            {item.to === "/order-status" || item.to === "/rejected-order" || item.to === "/client-orders" ? (
                                                <>
                                                    <div className="flex flex-row gap-2">
                                                        {item.label.split(" ")?.[0] + " " + item.label.split(" ")?.[1]}
                                                        {!!Number(item.label.split(" ")?.[2]) && (
                                                            <div className="bg-white rounded-full px-2 w-fit">
                                                                <span className="text-red-400 w-fit">{item.label.split(" ")?.[2]}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            ) : (
                                                item.label
                                            )}
                                            {/* {labelParts[0]}
                                            {isNew && <span className="text-red-500 font-bold ml-1">New</span>}
                                            {labelParts[1]} */}
                                            {/* {totalOrdersNumber} */}
                                        </motion.span>
                                    </NavLink>
                                </motion.li>
                            );
                        })}
                    </ul>
                </nav>

                <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-all duration-300">
                    Destruction
                </button>
            </motion.div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Destruction</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="border border-gray-300 p-2 w-full rounded mb-4"
                            autoFocus={true}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleDestruction();
                                }
                            }}
                        />
                        <div className="flex justify-between">
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition-all duration-300">
                                Cancel
                            </button>
                            <button onClick={handleDestruction} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-all duration-300">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
