import React, { useEffect, useState } from "react";
import API from "../../../../API/API";
import ProductTable from "./ProductTable";

export default function ProductInventory() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [productList, setProductList] = useState([]);

    const fetchProductList = async () => {
        try {
            const response = await API.get(`/inventory/product/components?page=${currentPage}`);
            setProductList(response.products);
            setCurrentPage(currentPage);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchProductList();
    }, [currentPage]);

    return (
        <>
            <ProductTable setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} productList={productList} />
        </>
    );
}
