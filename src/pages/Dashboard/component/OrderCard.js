import React from "react";
import { motion } from "framer-motion";

export default function OrderCard({ status, order }) {
    const orderCounts = order.reduce((partialSum, a) => partialSum + a.order, 0);

    return (
        <motion.div className="w-full" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="bg-white shadow-lg rounded-xl p-6 border border-neutral-300 hover:border-[#3f484f] transition-colors duration-300">
                <div className="flex flex-row justify-between items-center mb-4">
                    <motion.h1
                        className="capitalize text-2xl font-semibold text-[#3f484f]"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {status}
                    </motion.h1>
                    <motion.div
                        className="bg-[#fff2eb] text-[#3f484f] font-semibold text-sm px-3 py-1 rounded-full"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {orderCounts} {orderCounts.length === 1 ? "Order" : "Orders"}
                    </motion.div>
                </div>

                {order.map((el, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-50 border border-neutral-200 my-4 rounded-lg p-4 hover:bg-[#fff2eb] transition-colors duration-300"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-gray-800 font-medium">{el.department}</span>
                            <span className="text-gray-600 font-bold">{el.order}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
