import React from "react";
import { CheckBox } from "../../../components/CheckBox/CheckBox.js";
import { EDIT_PRODUCT } from "../../../constants/modelConstant.js";
import UpdateQuantity from "../model/UpdateQuantity.js";
import { motion } from "framer-motion";

const ProductTable = (props) => {
    const { selectedProduct, setSelectedProduct, currentPage, productList, totalPages, setCurrentPage, setShowPopup, setSelectedProductDetails, fetchProductList } = props;

    const handleSelection = (_, id) => {
        selectedProduct.includes(id) ? setSelectedProduct((prevState) => prevState.filter((el) => el !== id)) : setSelectedProduct((prevState) => [...prevState, id]);
    };

    const handleSelectAll = () => {
        if (selectedProduct.length === productList?.length) {
            setSelectedProduct([]);
        } else {
            setSelectedProduct(productList.map((el) => el._id));
        }
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
                        <th className="py-2 px-3 w-[2%] text-left font-semibold uppercase tracking-wide text-[12px]">
                            <CheckBox setIsChecked={() => handleSelectAll()} paddingL="pl-3" isChecked={selectedProduct.length === productList?.length} />
                        </th>
                        <th className="py-2 px-3 w-[7%] text-left font-semibold uppercase tracking-wide text-[12px]">Name</th>
                        <th className="py-2 px-3 w-[10%] text-left font-semibold uppercase tracking-wide text-[12px]">Box</th>
                        <th className="py-2 px-3 w-[10%] text-left font-semibold uppercase tracking-wide text-[12px]">Color</th>
                        <th className="py-2 px-3 w-[7%] text-left font-semibold uppercase tracking-wide text-[12px]">Sticker</th>
                        <th className="py-2 px-3 w-[7%] text-left font-semibold uppercase tracking-wide text-[12px]">Plastic Bag</th>
                        <th className="py-2 px-3 w-[15%] text-left font-semibold uppercase tracking-wide text-[12px]">Cartoon</th>
                        <th className="py-2 px-3 w-[15%] text-left font-semibold uppercase tracking-wide text-[12px]">Component</th>
                        <th className="py-2 px-3 w-[5%] text-left font-semibold uppercase tracking-wide text-[12px]">Action</th>
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
                        productList?.map((el, index) => (
                            <motion.tr
                                key={index}
                                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                className={`${index % 2 === 0 ? "bg-[#fff9f5]" : "bg-[#fff2eb]"}`}
                            >
                                <td className="py-3 px-3 text-[12px]">
                                    <CheckBox setIsChecked={(isChecked) => handleSelection(isChecked, el._id)} paddingL="pl-3" isChecked={selectedProduct.includes(el._id)} />
                                </td>
                                <td className="py-3 px-3 text-gray-800 font-medium text-[12px]">{el.name}</td>
                                <td className="py-3 px-2 text-gray-800 font-medium text-[12px]">
                                    {el.box.map((boxEl, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 m-1 rounded-md bg-[#edeff0] text-[#3f484f] border border-neutral-400 font-semibold inline-block text-[12px]"
                                        >
                                            {boxEl.name}
                                        </span>
                                    ))}
                                </td>
                                <td className="py-3 px-2 text-gray-800 font-medium text-[12px]">
                                    {el.color.map((colorEl, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 m-1 rounded-md border border-green-400 bg-green-100 text-green-900 font-semibold inline-block text-[12px]"
                                        >
                                            {colorEl.name}
                                        </span>
                                    ))}
                                </td>
                                <td className="py-3 px-3 text-gray-800 font-medium text-[12px]">
                                    {el?.sticker?.name} ({el?.sticker_number})
                                </td>
                                <td className="py-3 px-3 text-gray-800 font-medium text-[12px]">
                                    {el?.plastic_bag?.name} ({el?.plastic_bag_number})
                                </td>
                                <td className="py-3 px-2 text-gray-800 font-medium text-[12px]">
                                    {el?.cartoon?.map((cartoonEl, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 m-1 rounded-md border border-yellow-400 bg-yellow-100 text-yellow-900 font-semibold inline-block text-[12px]"
                                        >
                                            {cartoonEl?.name}
                                        </span>
                                    ))}
                                </td>
                                <td className="py-3 px-2 text-gray-800 font-medium text-[12px]">
                                    <div className="">
                                        {el?.components?.map((comEl, index) => (
                                            <div key={index} className="px-2 m-1 w-fit inline-block py-1 border border-gray-300 rounded-md bg-gray-100 text-[12px]">
                                                <span>
                                                    {comEl?.id?.name} ({comEl?.quantity})
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-3 px-2 text-gray-800 text-[12px]">
                                    <UpdateQuantity
                                        {...el}
                                        onClickEdit={() => {
                                            setShowPopup(EDIT_PRODUCT);
                                            setSelectedProductDetails(el);
                                        }}
                                        fetchProductList={fetchProductList}
                                    />
                                </td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr className="bg-[#fff2eb]">
                            <td colSpan="10" className="py-6 text-center text-gray-500 text-[12px]">
                                No products found
                            </td>
                        </tr>
                    )}
                </motion.tbody>
            </motion.table>

            <div className="mt-6 flex justify-between items-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-gray-300 text-[12px]"
                >
                    Previous
                </motion.button>
                <span className="text-gray-700 font-semibold text-[12px]">
                    Page {currentPage} of {totalPages}
                </span>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-gray-300 text-[12px]"
                >
                    Next
                </motion.button>
            </div>
        </div>
    );
};

export default ProductTable;
