import React, { useEffect, useState } from "react";
import ButtonController from "./component/ButtonController";
import API from "../../API/API.js";

import ProductTable from "./component/ProductTable";
import { CREATE_PRODUCT, EDIT_PRODUCT } from "../../constants/modelConstant";
import ProductModel from "./model/ProductModel";

export default function Index() {
    const [showPopup, setShowPopup] = useState(null);

    const [productList, setProductList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedProduct, setSelectedProduct] = useState([]);

    const handleSelectAll = () => {
        selectedProduct.length !== productList.length ? setSelectedProduct(productList.map((el) => el._id)) : setSelectedProduct([]);
    };

    const fetchProductList = async () => {
        try {
            const response = await API.get(`/product?page=${currentPage}`);
            setProductList(response.products);
            setCurrentPage(currentPage);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const [selectedProductDetails, setSelectedProductDetails] = useState(null);

    useEffect(() => {
        fetchProductList();
    }, [currentPage]);

    return (
        <>
            <ButtonController setShowPopup={setShowPopup} selectedProduct={selectedProduct} handleSelectAll={handleSelectAll} fetchProductList={fetchProductList} />

            <ProductTable
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                currentPage={currentPage}
                totalPages={totalPages}
                productList={productList}
                setCurrentPage={setCurrentPage}
                setShowPopup={setShowPopup}
                setSelectedProductDetails={setSelectedProductDetails}
                fetchProductList={fetchProductList}
            />

            {showPopup === CREATE_PRODUCT && <ProductModel fetchProductList={fetchProductList} handleClickClose={() => setShowPopup(null)} />}

            {showPopup === EDIT_PRODUCT && (
                <ProductModel selectedProductDetails={selectedProductDetails} fetchProductList={fetchProductList} handleClickClose={() => setShowPopup(null)} />
            )}
        </>
    );
}
