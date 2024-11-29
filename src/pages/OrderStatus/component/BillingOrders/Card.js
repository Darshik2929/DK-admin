import { format } from "date-fns";
import React from "react";
import Button from "../../../../components/Button/Button";

export default function BillingCard(props) {
    const { client_id, created_at, product, showRejection, resolveRejection, billing } = props;

    const formattedDate = format(created_at, "dd MMM yyyy hh:mm a");

    return (
        <>
            <div className="border border-neutral-300 rounded-xl w-full p-4">
                <div className="flex flex-row justify-between mb-4 border-b border-neutral-300 pb-4">
                    <div className="">
                        <span>Client :</span>
                        <span className="ml-2">{client_id.name}</span>
                    </div>

                    <div className="">
                        <span>{formattedDate}</span>
                    </div>
                </div>

                {showRejection && (
                    <div className="">
                        <div className="flex flex-row gap-4">
                            <span>Rejection Reason : </span>

                            <p className="font-bold">{billing.rejection_reason}</p>
                        </div>
                    </div>
                )}

                {product.map((el, index) => {
                    return (
                        <div key={index} className="space-y-2 my-4">
                            <div className="flex flex-row justify-between mb-2">
                                <h1 className="text-lg font-bold">{el?.id?.name}</h1>
                                <span className="text-lg font-bold">{el?.quantity}</span>
                            </div>
                        </div>
                    );
                })}

                {showRejection && <Button label="Resolve" onClick={resolveRejection} />}
            </div>
        </>
    );
}
