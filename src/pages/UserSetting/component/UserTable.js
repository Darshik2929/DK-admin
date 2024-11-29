import React from "react";
import { CheckBox } from "../../../components/CheckBox/CheckBox";
import { ReactComponent as EditIcon } from "../../../Assets/edit.svg";
import { EDIT_USER } from "../../../constants/modelConstant";
import { motion } from "framer-motion";
import { roleMenuItem } from "../../../constants/constant";

const UserTable = (props) => {
    const { totalPages, users, setCurrentPage, currentPage, selectedUsers, setSelectedUsers, setShowPopup, setSelectedUserDetails, decrypt } = props;

    const handleSelection = (_, id) => {
        selectedUsers.includes(id)
            ? setSelectedUsers((prevState) => {
                  return prevState.filter((el) => el !== id);
              })
            : setSelectedUsers((prevState) => [...prevState, id]);
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
                    <tr className="bg-gradient-to-r from-[#3f484f] uppercase to-[#5b636b] text-white">
                        <th className="py-2 px-3 w-[2%] text-left font-semibold uppercase tracking-wide text-[12px]">
                            {/* <CheckBox setIsChecked={() => handleSelectAll()} paddingL="pl-3" isChecked={selectedUsers.length === users?.length} /> */}
                        </th>
                        <th className="py-2 px-4 text-left">User Name</th>
                        <th className="py-2 px-4 text-left">Password</th>
                        <th className="py-2 px-4 text-left">Roles</th>
                        <th className="py-2 px-4 text-left w-[15%]">Mobile Number</th>
                        {/* <th className="py-2 px-4 text-left">Created At</th> */}
                        <th className="py-2 px-4 text-left">Action</th>
                    </tr>
                </thead>
                <motion.tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => {
                            // if (index != 0) return null;
                            return (
                                <motion.tr
                                    key={index}
                                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                    className={`${index % 2 === 0 ? "bg-[#fff9f5]" : "bg-[#fff2eb]"}`}
                                >
                                    <td className="py-2 px-4 text-gray-800">
                                        <div className="flex flex-row items-center gap-2">
                                            <CheckBox
                                                disabled={index === 0}
                                                setIsChecked={(isChecked) => handleSelection(isChecked, user._id)}
                                                isChecked={selectedUsers.includes(user._id)}
                                            />
                                        </div>
                                    </td>

                                    <td className="py-2 px-4 text-gray-800">{user.user_name}</td>

                                    <td className="py-2 px-4 text-gray-800">{decrypt(user.password)}</td>

                                    <td className="py-2 px-4 text-gray-800">
                                        {user.roles.map((role, i) => {
                                            const roleKey = Object.keys(role.role)[0];

                                            const roleValue = role.role[roleKey];

                                            const matchedRole = roleMenuItem.find((item) => item.value[roleKey] === roleValue);

                                            return (
                                                <div
                                                    key={i}
                                                    className="px-2 py-1 m-1 capitalize rounded-md bg-[#edeff0] text-[#3f484f] border border-neutral-400 font-semibold inline-block"
                                                >
                                                    {matchedRole?.label || "Unknown Role"}
                                                </div>
                                            );
                                        })}
                                    </td>

                                    <td className="py-2 px-4 text-gray-800">{user.mobile_number}</td>

                                    <td className="py-2 px-4">
                                        <div
                                            className="cursor-pointer w-fit group bg-green-200 hover:bg-green-400 p-1 rounded-lg"
                                            onClick={() => {
                                                setShowPopup(EDIT_USER);

                                                setSelectedUserDetails(user);
                                            }}
                                        >
                                            <EditIcon className="w-5 h-5 group-hover:stroke-white" stroke="#0a730a" />
                                        </div>
                                    </td>
                                </motion.tr>
                            );
                        })
                    ) : (
                        <tr className="bg-[#fff2eb]">
                            <td colSpan="6" className="py-4 text-center bg">
                                No users found
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

export default UserTable;
