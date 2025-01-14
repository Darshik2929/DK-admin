import React from "react";
import { ReactComponent as CloseIcon } from "../../../../../Assets/close.svg";
import { useForm } from "react-hook-form";
import API from "../../../../../API/API";
import { InputFieldForm } from "../../../../../components/InputField";
import { ErrorMessage } from "../../../../../components/Error/ErrorMessage";
import Button from "../../../../../components/Button/Button";

export default function ComponentModel(props) {
    const { selectedComponentDetails, fetchComponentList, handleClickClose, department } = props;

    const {
        control,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm({
        defaultValues: { name: selectedComponentDetails?.name ?? "", quantity: selectedComponentDetails?.quantity, minQuantity: selectedComponentDetails?.minimum_quantity },
    });

    const updateComponent = async (data) => {
        try {
            const body = {
                name: data.name,
                minimum_quantity: data.minQuantity,
                quantity: data.quantity,
                ...(department === "cartoon" ? { in_a_cartoon: data.in_a_cartoon } : {}),
            };

            const response = await API.put(`/inventory/${department}/components/${selectedComponentDetails._id}`, body);

            if (response?.success) {
                fetchComponentList();
                handleClickClose();
            } else {
                if (response?.response?.data?.message?.client_name) {
                    setError("name", { message: response?.response?.data?.message?.client_name });
                }
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const createComponent = async (data) => {
        const body = {
            name: data.name,
            minimum_quantity: data.minQuantity,
            quantity: data.quantity,
            ...(department === "cartoon" ? { in_a_cartoon: data.in_a_cartoon } : {}),
        };

        try {
            const response = await API.post(`/inventory/${department}/components`, body);

            if (response?.success) {
                fetchComponentList();
                handleClickClose();
            }
        } catch (error) {
            console.log(`error ==>`, error?.response?.data?.message?.name);

            if (error?.response?.data?.message?.name) {
                setError("name", { message: error?.response?.data?.message?.name });
            }
        }
    };

    const handleSave = (data) => {
        !selectedComponentDetails ? createComponent(data) : updateComponent(data);
    };

    return (
        <>
            <div className="fixed bg-black bg-opacity-50 inset-0 z-50 flex p-4 md:p-0 md:absolute md:z-[9] overflow-auto md:overflow-visible">
                <div className="max-w-[450px] w-full rounded-xl px-8 py-6 md:mt-0 md:w-full md:p-4 lg:max-w-[439px] md:max-w-full md:rounded-none bg-white m-auto">
                    <div className="flex flex-row justify-between items-center border-neutral-300 mb-6 lg:mb-4">
                        <div>
                            <span className="paragraph-large-medium capitalize font-bold text-xl">{department}</span>
                        </div>

                        <div onClick={handleClickClose} className="md:hidden cursor-pointer">
                            <CloseIcon />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <InputFieldForm
                            label={`Enter ${department} name`}
                            placeholder={`Enter ${department} name`}
                            name="name"
                            control={control}
                            rules={{ required: `Please enter ${department} name` }}
                        />

                        {errors?.name && <ErrorMessage className="" errors={errors?.name} />}

                        {department === "cartoon" && (
                            <>
                                <InputFieldForm
                                    type="number"
                                    label="Enter Box in Single cartoon"
                                    placeholder="Enter Box in Single cartoon"
                                    name="in_a_cartoon"
                                    control={control}
                                    rules={{ required: "Please enter box in a cartoon" }}
                                />

                                {errors?.in_a_cartoon && <ErrorMessage className="" errors={errors?.in_a_cartoon} />}
                            </>
                        )}

                        {!selectedComponentDetails && (
                            <>
                                <InputFieldForm
                                    type="number"
                                    label={`Enter ${department} quantity`}
                                    placeholder={`Enter ${department} quantity`}
                                    name="quantity"
                                    control={control}
                                    rules={{ required: `Please enter ${department} quantity` }}
                                />

                                {errors?.quantity && <ErrorMessage className="" errors={errors?.quantity} />}
                            </>
                        )}

                        <InputFieldForm
                            type="number"
                            label={`Enter ${department} minimum quantity`}
                            placeholder={`Enter ${department} minimum quantity`}
                            name="minQuantity"
                            control={control}
                            rules={{ required: `Please enter ${department} minimum quantity` }}
                        />

                        {errors?.minQuantity && <ErrorMessage className="" errors={errors?.minQuantity} />}
                    </div>

                    <div className="mt-24">
                        <Button label="Save" onClick={handleSubmit(handleSave)} />
                    </div>
                </div>
            </div>
        </>
    );
}
