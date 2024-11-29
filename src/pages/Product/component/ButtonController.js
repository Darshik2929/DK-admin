import React from "react";
import Button from "../../../components/Button/Button";
import { CREATE_PRODUCT } from "../../../constants/modelConstant";
import API from "../../../API/API";

export default function ButtonController(props) {
    const { setShowPopup, selectedProduct, handleSelectAll, fetchProductList } = props;

    const handleDelete = async () => {
        try {
            const response = await API.delete("/product", {
                data: { ids: selectedProduct },
            });

            if (response?.success) {
                fetchProductList();
            } else {
                console.error("Error:", response?.data?.message || "Unknown error");
            }
        } catch (error) {
            console.error("API Error: ", error.response?.data?.message || error.message || error);
        }
    };

    return (
        <div className="flex flex-row w-full justify-between mb-6">
            <div className="flex flex-row gap-4 w-full">
                <Button className="max-w-[150px]" label="Select All" onClick={handleSelectAll} />
                <Button className="max-w-[150px]" label="Delete" disabled={!selectedProduct.length} onClick={handleDelete} />
            </div>

            <Button className="max-w-[150px]" label="Add Product" onClick={() => setShowPopup(CREATE_PRODUCT)} />
        </div>
    );
}
