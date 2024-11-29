import React from "react";
import { format } from "date-fns";
import { CheckBox } from "../../../components/CheckBox/CheckBox";
import { ReactComponent as EditIcon } from "../../../Assets/edit.svg";
import { EDIT_CLIENT } from "../../../constants/modelConstant";
import { motion } from "framer-motion";
import { decrypt } from "../../UserSetting";

const ClientTable = (props) => {
    const { selectedClient, setSelectedClient, currentPage, totalPages, clients, setCurrentPage, setShowPopup, setSelectedClientDetails } = props;

    const handleSelection = (_, id) => {
        selectedClient.includes(id)
            ? setSelectedClient((prevState) => {
                  return prevState.filter((el) => el !== id);
              })
            : setSelectedClient((prevState) => [...prevState, id]);
    };

    return (
        <div className="p-4">
            <motion.table
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="min-w-full bg-[#3f484f] border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
                <thead>
                    <tr className="bg-gradient-to-r from-[#3f484f] uppercase to-[#5b636b] text-white">
                        <th className="py-2 px-3 w-[2%] text-left font-semibold uppercase tracking-wide text-[12px]">
                            {/* <CheckBox setIsChecked={() => handleSelectAll()} paddingL="pl-3" isChecked={clients.length === selectedClient?.length} /> */}
                        </th>
                        <th className="py-2 px-4 text-left">Client Name</th>
                        <th className="py-2 px-4 text-left">Client Email</th>
                        <th className="py-2 px-4 text-left">Client Password</th>
                        <th className="py-2 px-4 text-left">Created At</th>
                        <th className="py-2 px-4 text-left">Action</th>
                    </tr>
                </thead>

                <motion.tbody>
                    {clients?.length > 0 ? (
                        clients.map((user, index) => (
                            <motion.tr
                                key={index}
                                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                className={`${index % 2 === 0 ? "bg-[#fff9f5]" : "bg-[#fff2eb]"}`}
                            >
                                <td className="py-2 px-4 text-gray-800">
                                    <div className="flex flex-row items-center gap-2">
                                        <CheckBox
                                            disabled={user.linked}
                                            setIsChecked={(isChecked) => handleSelection(isChecked, user._id)}
                                            optionId={user.name}
                                            isChecked={selectedClient.includes(user._id)}
                                        />
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-gray-800">{user.name}</td>
                                <td className="py-2 px-4 text-gray-800">{user.email}</td>
                                <td className="py-2 px-4 text-gray-800">{user.password && decrypt(user.password)}</td>
                                <td className="py-2 px-4 text-gray-800">{format(new Date(user.created_at), "MMMM d, yyyy h:mm a")}</td>
                                <td className="py-2 px-4">
                                    <div
                                        className="cursor-pointer w-fit group bg-green-200 hover:bg-green-400 p-1 rounded-lg"
                                        onClick={() => {
                                            setShowPopup(EDIT_CLIENT);

                                            setSelectedClientDetails(user);
                                        }}
                                    >
                                        <EditIcon className="w-5 h-5 group-hover:stroke-white" stroke="#0a730a" />
                                    </div>
                                </td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr className="bg-[#fff2eb]">
                            <td colSpan="6" className="py-4 text-center text-gray-500">
                                No clients found
                            </td>
                        </tr>
                    )}
                </motion.tbody>
            </motion.table>
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ClientTable;
