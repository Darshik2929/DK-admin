import React from "react";
import Button from "../../../components/Button/Button";
import { CREATE_COMPONENT } from "../../../constants/modelConstant";
import API from "../../../API/API";

export default function ButtonController(props) {
    const { setShowPopup, selectedComponent, handleSelectAll, fetchComponentList, apiUrl } = props;

    const handleDelete = async () => {
        try {
            const response = await API.delete(apiUrl, {
                data: { ids: selectedComponent },
            });

            if (response?.success) {
                fetchComponentList();
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
                <Button className="max-w-[150px]" label={`${selectedComponent.length ? "Unselect All" : "Select All"}`} onClick={handleSelectAll} />
                <Button className="max-w-[150px]" label="Delete" disabled={!selectedComponent.length} onClick={handleDelete} />
            </div>

            <Button className="max-w-[150px]" label="Add Component" onClick={() => setShowPopup(CREATE_COMPONENT)} />
        </div>
    );
}
