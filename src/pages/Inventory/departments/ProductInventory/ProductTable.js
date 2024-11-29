import React from "react";
import { motion } from "framer-motion";

export default function ProductTable(props) {
    const { setCurrentPage, currentPage, totalPages, productList } = props;

    return (
        <>
            <div className="">
                <motion.table
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="min-w-full bg-[#3f484f] border border-gray-300 rounded-lg shadow-lg overflow-hidden"
                >
                    <thead>
                        <tr className="bg-gradient-to-r from-[#3f484f] to-[#5b636b] text-white">
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Quantity</th>
                            <th className="py-2 px-4 text-left">Box</th>
                            <th className="py-2 px-4 text-left">Cartoon</th>
                            <th className="py-2 px-4 text-left">Color</th>
                        </tr>
                    </thead>

                    <motion.tbody
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
                        }}
                    >
                        {productList?.length > 0 ? (
                            productList.map((el, index) => (
                                <motion.tr
                                    key={index}
                                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                    className={`${index % 2 === 0 ? "bg-[#fff9f5]" : "bg-[#fff2eb]"}`}
                                >
                                    <td className="py-2 px-4 text-gray-800">{el?.id?.name}</td>
                                    <td className="py-2 px-4 text-gray-800">{el?.quantity}</td>
                                    <td className="py-2 px-4 text-gray-800">{el?.box?.name}</td>
                                    <td className="py-2 px-4 text-gray-800">{el?.cartoon?.cartoonType?.name ?? "No Cartoon for This Product"}</td>
                                    <td className="py-2 px-4 text-gray-800">{el?.color?.name}</td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr className="bg-[#fff9f5]">
                                <td colSpan="5" className="py-4 text-center text-gray-500">
                                    No Product Found
                                </td>
                            </tr>
                        )}
                    </motion.tbody>
                </motion.table>

                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                        className="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                        className="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
