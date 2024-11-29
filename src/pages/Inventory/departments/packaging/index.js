import React, { useEffect, useState } from "react";
import ButtonController from "../../component/ButtonController";

import ComponentTable from "./component/ComponentTable.js";
import ComponentModel from "./model/ComponentModel";
import API from "../../../../API/API.js";
import { CREATE_COMPONENT, EDIT_COMPONENT } from "../../../../constants/modelConstant.js";

export default function Packaging() {
    const [showPopup, setShowPopup] = useState(null);

    const [componentList, setComponentList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedComponent, setSelectedComponent] = useState([]);

    const handleSelectAll = () => {
        selectedComponent.length !== componentList.length ? setSelectedComponent(componentList.map((el) => el._id)) : setSelectedComponent([]);
    };

    const fetchComponentList = async () => {
        try {
            const response = await API.get(`/inventory/packaging/components?page=${currentPage}`);
            setComponentList(response.components);
            setCurrentPage(currentPage);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const [selectedComponentDetails, setSelectedComponentDetails] = useState(null);

    useEffect(() => {
        fetchComponentList();
    }, [currentPage]);

    return (
        <>
            <ButtonController setShowPopup={setShowPopup} selectedComponent={selectedComponent} handleSelectAll={handleSelectAll} fetchComponentList={fetchComponentList} />

            <ComponentTable
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
                currentPage={currentPage}
                totalPages={totalPages}
                componentList={componentList}
                setCurrentPage={setCurrentPage}
                setShowPopup={setShowPopup}
                setSelectedComponentDetails={setSelectedComponentDetails}
                fetchComponentList={fetchComponentList}
            />

            {showPopup === CREATE_COMPONENT && <ComponentModel fetchComponentList={fetchComponentList} handleClickClose={() => setShowPopup(null)} />}

            {showPopup === EDIT_COMPONENT && (
                <ComponentModel selectedComponentDetails={selectedComponentDetails} fetchComponentList={fetchComponentList} handleClickClose={() => setShowPopup(null)} />
            )}
        </>
    );
}
