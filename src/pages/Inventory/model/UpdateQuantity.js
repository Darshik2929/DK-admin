import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import InputField from "../../../components/InputField";
import API from "../../../API/API";
import { ReactComponent as CloseIcon } from "../../../Assets/close.svg";
import { format } from "date-fns";

export default function UpdateQuantity(props) {
    const { _id, fetchComponentList, quantity_history } = props;

    const [mode, setMode] = useState(null);

    const [quantity, setQuantity] = useState(0);

    const handleClickSave = async () => {
        try {
            const body = {
                operation: mode,
                quantity,
            };

            const response = await API.put(`/admin/component/${_id}`, body);

            if (response?.success) {
                fetchComponentList();
                handleClickClose();
                setQuantity(0);
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const handleClickClose = () => {
        setMode(null);
    };

    return (
        <>
            <div className="flex flex-row items-center gap-4 max-w-[300px]">
                <Button label="Add" bg="bg-green-300" onClick={() => setMode("add")} />
                <Button label="Remove" bg="bg-red-300" onClick={() => setMode("remove")} />
                <Button label="History" bg="bg-orange-300" onClick={() => setMode("history")} />
            </div>

            {!!mode && (
                <div className="fixed bg-black bg-opacity-50 inset-0 z-50 flex p-4 md:p-0 md:absolute md:z-[9] overflow-auto md:overflow-visible">
                    <div className="max-w-[450px] w-full rounded-xl px-8 py-6 md:mt-0 md:w-full md:p-4 lg:max-w-[439px] md:max-w-full md:rounded-none bg-white m-auto">
                        <div className="flex flex-row justify-between items-center border-neutral-300 mb-6 lg:mb-4">
                            <div>
                                <span className="paragraph-large-medium">Component</span>
                            </div>

                            <div onClick={handleClickClose} className="md:hidden cursor-pointer">
                                <CloseIcon />
                            </div>
                        </div>

                        {mode !== "history" ? (
                            <>
                                <InputField value={quantity} label={mode.toUpperCase()} onChange={(e) => setQuantity(e.target.value)} />

                                <Button className="mt-6" label="Save" onClick={handleClickSave} />
                            </>
                        ) : (
                            <>
                                {quantity_history.map((el, index) => (
                                    <div className="flex flex-row gap-2" key={index}>
                                        <span>{el.quantity_change > 0 ? "Added" : "Removed"}</span>
                                        <span>{Math.abs(el.quantity_change)}</span>
                                        <span>{format(new Date(el.date), "MMMM d, yyyy h:mm a")}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
