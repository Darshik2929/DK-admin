import React, { useEffect, useState } from "react";
import ButtonController from "../../component/ButtonController";

import ComponentTable from "./component/ComponentTable.js";
import ComponentModel from "./model/ComponentModel";
import API from "../../../../API/API.js";
import { CREATE_COMPONENT, EDIT_COMPONENT } from "../../../../constants/modelConstant.js";

export default function Machining(props) {
    const { department } = props;

    const [showPopup, setShowPopup] = useState(null);

    const [componentList, setComponentList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedComponent, setSelectedComponent] = useState([]);

    const handleSelectAll = () => {
        !selectedComponent.length
            ? setSelectedComponent(
                  componentList
                      .map((el) => {
                          if (!el.linked) return el._id;
                      })
                      .filter((el) => !!el)
              )
            : setSelectedComponent([]);
    };

    const fetchComponentList = async () => {
        try {
            const response = await API.get(`/inventory/${department}/components?page=${currentPage}&limit=${10}`);
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
    }, [currentPage, department]);

    return (
        <>
            <ButtonController
                apiUrl={`/inventory/${department}/components`}
                setShowPopup={setShowPopup}
                selectedComponent={selectedComponent}
                handleSelectAll={handleSelectAll}
                fetchComponentList={fetchComponentList}
            />

            <ComponentTable
                department={department}
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

            {showPopup === CREATE_COMPONENT && <ComponentModel department={department} fetchComponentList={fetchComponentList} handleClickClose={() => setShowPopup(null)} />}

            {showPopup === EDIT_COMPONENT && (
                <ComponentModel
                    department={department}
                    selectedComponentDetails={selectedComponentDetails}
                    fetchComponentList={fetchComponentList}
                    handleClickClose={() => setShowPopup(null)}
                />
            )}
        </>
    );
}
