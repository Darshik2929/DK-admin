import React, { useEffect, useState } from "react";
import API from "../../../../API/API";

export default function MachiningRejectedOrder(props) {
    const { department, Card } = props;

    const [rejectedOrders, setRejectedOrders] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const fetchRejectedOrder = async () => {
        setIsLoading(true);
        try {
            const response = await API.get(`user/orders/${department}/rejected`);

            setRejectedOrders(response.orders);
        } catch (error) {
            console.log(`error ==>`, error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRejectedOrder();
    }, []);

    const resolveRejection = async (orderId) => {
        setIsLoading(true);

        try {
            const response = await API.patch(`/user/orders/${orderId}/${department}`, { status: { rejected: false } });

            if (response.success) {
                fetchRejectedOrder();
            }
        } catch (error) {
            console.log(`const error = `, error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="-mx-4">
            {isLoading ? (
                <span className="ml-4 mt-4">Loading...</span>
            ) : rejectedOrders.length ? (
                rejectedOrders.map((el, index) => (
                    <div className="inline-block align-top m-4 max-w-[45%] w-full" key={index}>
                        <Card showRejection {...el} department={"newOrder"} resolveRejection={() => resolveRejection(el._id)} />
                    </div>
                ))
            ) : (
                <span className="ml-4 mt-4">No Order at This Moment</span>
            )}
        </div>
    );
}
