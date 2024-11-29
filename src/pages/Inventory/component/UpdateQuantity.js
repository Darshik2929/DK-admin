import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../Assets/close.svg";
import API from "../../../API/API";
import Button from "../../../components/Button/Button";
import InputField from "../../../components/InputField";

export default function UpdateQuantity(props) {
    const { _id, fetchComponentList, department, handleClickEdit, linked } = props;

    const [mode, setMode] = useState(null);

    const [quantity, setQuantity] = useState(0);

    const handleClickSave = async () => {
        try {
            const body = {
                operation: mode,
                quantity,
            };

            const response = await API.put(`/inventory/${department}/components/${_id}`, body);

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
            <div className="flex flex-row items-center gap-4 max-w-[380px]">
                <Button className="max-w-[70px]" label="Add" bg="bg-green-300" onClick={() => setMode("add")} />
                <Button className="max-w-[70px]" label="Edit" bg="bg-neutral-300" onClick={() => handleClickEdit()} />
                {!linked && <Button label="Remove" className="max-w-[95px]" bg="bg-red-300" onClick={() => setMode("remove")} />}
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

                        <InputField value={quantity} label={mode.toUpperCase()} onChange={(e) => setQuantity(e.target.value)} />

                        <Button className="mt-6" label="Save" onClick={handleClickSave} />
                    </div>
                </div>
            )}
        </>
    );
}
