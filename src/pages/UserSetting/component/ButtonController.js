import React from "react";
import Button from "../../../components/Button/Button";
import { ADD_USER } from "../../../constants/modelConstant";
import API from "../../../API/API";

export default function ButtonController(props) {
    const { setShowPopup, selectedUsers, handleSelectAll, fetchUsers } = props;

    const handleDelete = async () => {
        try {
            const response = await API.delete("/admin/users", {
                data: { ids: selectedUsers },
            });

            if (response?.success) {
                fetchUsers();
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
                <Button className="max-w-[200px]" label={!!selectedUsers.length ? "Unselect All" : "Select All"} onClick={handleSelectAll} />
                <Button className="max-w-[200px]" label="Delete" disabled={!selectedUsers.length} onClick={handleDelete} />
            </div>

            <Button className="max-w-[200px]" label="Add User" onClick={() => setShowPopup(ADD_USER)} />
        </div>
    );
}
