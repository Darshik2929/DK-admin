import React from "react";
import { CheckBox } from "../../../../../components/CheckBox/CheckBox";
import { EDIT_COMPONENT } from "../../../../../constants/modelConstant";
import UpdateQuantity from "../../../component/UpdateQuantity";
import { motion } from "framer-motion";

const ComponentTable = (props) => {
    const {
        selectedComponent,
        setSelectedComponent,
        currentPage,
        totalPages,
        componentList,
        setCurrentPage,
        setShowPopup,
        setSelectedComponentDetails,
        fetchComponentList,
        department,
    } = props;

    const handleSelection = (_, id) => {
        selectedComponent.includes(id) ? setSelectedComponent((prevState) => prevState.filter((el) => el !== id)) : setSelectedComponent((prevState) => [...prevState, id]);
    };

    return (
        <div className="">
            <motion.table
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="min-w-full bg-[#3f484f] border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
                <thead>
                    <tr className="bg-gradient-to-r from-[#3f484f] to-[#5b636b] text-white">
                        <th className="py-2 px-4 text-left w-[5%]">
                            {/* <CheckBox setIsChecked={(checked) => handleSelectAll(checked)} isChecked={selectedComponent.length === componentList?.length} /> */}
                        </th>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Quantity</th>
                        <th className="py-2 px-4 text-left">Min. Quantity</th>
                        {department === "cartoon" && <th className="py-2 px-4 text-left">In a Box</th>}
                        <th className="py-2 px-4 text-left w-fit">Action</th>
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
                    {componentList?.length > 0 ? (
                        componentList.map((el, index) => (
                            <motion.tr
                                key={index}
                                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                className={`${el.quantity < el.minimum_quantity ? "bg-red-300" : index % 2 === 0 ? "bg-[#fff9f5]" : "bg-[#fff2eb]"}`}
                            >
                                <td className="py-2 px-4 text-gray-800">
                                    <div className="flex flex-row items-center gap-2">
                                        <CheckBox
                                            setIsChecked={(isChecked) => handleSelection(isChecked, el._id)}
                                            disabled={el.linked}
                                            paddingL="pl-3"
                                            optionId={el.name}
                                            isChecked={selectedComponent.includes(el._id)}
                                        />
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-gray-800">{el.name}</td>
                                <td className="py-2 px-4 text-gray-800">{Math.floor(el.quantity)}</td>
                                <td className="py-2 px-4 text-gray-800">{el.minimum_quantity}</td>
                                {department === "cartoon" && <td className="py-2 px-4 text-gray-800">{el.in_a_cartoon}</td>}
                                <td className="py-2 px-4 text-gray-800">
                                    <UpdateQuantity
                                        handleClickEdit={() => {
                                            setShowPopup(EDIT_COMPONENT);
                                            setSelectedComponentDetails(el);
                                        }}
                                        department={department}
                                        {...el}
                                        fetchComponentList={fetchComponentList}
                                    />
                                </td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr className="bg-[#fff9f5]">
                            <td colSpan="6" className="py-4 text-center text-gray-500">
                                No component found
                            </td>
                        </tr>
                    )}
                </motion.tbody>
            </motion.table>

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ComponentTable;
