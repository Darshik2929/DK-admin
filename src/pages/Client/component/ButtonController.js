import React from "react";
import Button from "../../../components/Button/Button";
import { CREATE_CLIENT } from "../../../constants/modelConstant";
import API from "../../../API/API";

export default function ButtonController(props) {
    const { setShowPopup, selectedClient, handleSelectAll, fetchClientList } = props;

    const handleDelete = async () => {
        try {
            const response = await API.delete("/admin/clients", {
                data: { ids: selectedClient },
            });

            if (response?.success) {
                fetchClientList();
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
                <Button className="max-w-[200px]" label="Select All" onClick={handleSelectAll} />
                <Button className="max-w-[200px]" label="Delete" disabled={!selectedClient.length} onClick={handleDelete} />
            </div>

            <Button className="max-w-[200px]" label="Add Client" onClick={() => setShowPopup(CREATE_CLIENT)} />
        </div>
    );
}
