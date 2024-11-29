import React, { useEffect, useState } from "react";
import ButtonController from "./component/ButtonController.js";
import API from "../../API/API.js";

import ClientTable from "./component/ClientTable";
import { CREATE_CLIENT, EDIT_CLIENT } from "../../constants/modelConstant.js";
import ClientModel from "./model/ClientModel.js";

export default function Index() {
    const [showPopup, setShowPopup] = useState(null);

    const [clients, setClients] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedClient, setSelectedClient] = useState([]);

    const handleSelectAll = () => {
        !selectedClient.length
            ? setSelectedClient(
                  clients
                      .map((el) => {
                          if (!el.linked) return el._id;
                      })
                      .filter((el) => !!el)
              )
            : setSelectedClient([]);
    };

    const fetchClientList = async () => {
        try {
            const response = await API.get(`/admin/clients?page=${currentPage}&limit=${10}`);
            setClients(response.clients);
            setCurrentPage(currentPage);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const [selectedClientDetails, setSelectedClientDetails] = useState(null);

    useEffect(() => {
        fetchClientList();
    }, [currentPage]);

    return (
        <>
            <ButtonController setShowPopup={setShowPopup} selectedClient={selectedClient} handleSelectAll={handleSelectAll} fetchClientList={fetchClientList} />

            <ClientTable
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                currentPage={currentPage}
                totalPages={totalPages}
                clients={clients}
                setCurrentPage={setCurrentPage}
                setShowPopup={setShowPopup}
                setSelectedClientDetails={setSelectedClientDetails}
            />

            {showPopup === CREATE_CLIENT && <ClientModel fetchClientList={fetchClientList} handleClickClose={() => setShowPopup(null)} />}

            {showPopup === EDIT_CLIENT && <ClientModel clientData={selectedClientDetails} fetchClientList={fetchClientList} handleClickClose={() => setShowPopup(null)} />}
        </>
    );
}
