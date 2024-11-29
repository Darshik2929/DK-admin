import React from "react";
import { CheckBox } from "../../../components/CheckBox/CheckBox";
import { ReactComponent as EditIcon } from "../../../Assets/edit.svg";
import { EDIT_COMPONENT } from "../../../constants/modelConstant";
import UpdateQuantity from "../model/UpdateQuantity";

const ComponentTable = (props) => {
    const { selectedComponent, setSelectedComponent, currentPage, totalPages, componentList, setCurrentPage, setShowPopup, setSelectedComponentDetails, fetchComponentList } =
        props;

    const handleSelection = (_, id) => {
        selectedComponent.includes(id)
            ? setSelectedComponent((prevState) => {
                  return prevState.filter((el) => el !== id);
              })
            : setSelectedComponent((prevState) => [...prevState, id]);
    };

    return (
        <div className="p-4">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left text-gray-600">Name</th>
                        <th className="py-2 px-4 text-left text-gray-600">Quantity</th>
                        <th className="py-2 px-4 text-left text-gray-600">Min. Quantity</th>
                        <th className="py-2 px-4 text-left text-gray-600 w-fit">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {componentList?.length > 0 ? (
                        componentList.map((el, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-gray-800">
                                    <div className="flex flex-row items-center gap-2">
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setShowPopup(EDIT_COMPONENT);

                                                setSelectedComponentDetails(el);
                                            }}
                                        >
                                            <EditIcon />
                                        </span>

                                        <CheckBox
                                            setIsChecked={(isChecked) => handleSelection(isChecked, el._id)}
                                            label={el.name}
                                            paddingL="pl-3"
                                            optionId={el.name}
                                            isChecked={selectedComponent.includes(el._id)}
                                        />
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-gray-800">{el.quantity}</td>
                                <td className="py-2 px-4 text-gray-800">{el.minimum_quantity}</td>
                                <td className="py-2 px-4 text-gray-800">
                                    <UpdateQuantity {...el} fetchComponentList={fetchComponentList} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-4 text-center text-gray-500">
                                No component found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

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

export default ComponentTable;
