import React from "react";
import { motion } from "framer-motion";

export default function DepartmentWiseOrder({ department, order }) {
    return (
        <motion.div className="w-full" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="bg-white shadow-lg rounded-xl p-6 border border-neutral-300 hover:border-[#3f484f] transition-colors duration-300">
                <motion.h1 className="text-xl font-bold text-[#3f484f] mb-4" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                    {department}
                </motion.h1>

                {order.map((el, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-50 border border-neutral-200 my-4 rounded-lg p-4 hover:bg-[#fff2eb] transition-colors duration-300"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <div className="flex flex-col gap-2">
                            <span className="text-lg font-semibold text-gray-800">{el?.client_id?.name}</span>
                            {el.product.map((prodEl, prodIndex) => (
                                <div key={prodIndex} className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">{prodEl?.id?.name}</span>
                                    <span className="text-sm font-semibold text-gray-900">{prodEl?.quantity} units</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
