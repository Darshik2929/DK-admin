import React, { useEffect, useState } from "react";
import { InputFieldForm } from "../../components/InputField";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import API from "../../API/API";

export default function Index() {
    const { control, setValue, watch } = useForm();
    const [editableIndex, setEditableIndex] = useState(null); // Track which input is editable

    const fetchColor = async () => {
        try {
            const response = await API.get("/admin/color");
            setValue("color", response.color);
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    useEffect(() => {
        fetchColor();
    }, []);

    const deleteColor = async (id) => {
        try {
            const response = await API.delete(`/admin/color/${id}`);
            if (response.success) {
                fetchColor();
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const editColor = async (id, name) => {
        try {
            const response = await API.put(`/admin/color/${id}`, { name });
            if (response.success) {
                fetchColor();
                setEditableIndex(null); // Disable editing after saving
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const createColor = async (name) => {
        try {
            const response = await API.post(`/admin/color`, { name });
            if (!!response) {
                fetchColor();
                setValue("newColor", "");
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    return (
        <>
            <div className="flex flex-row items-start gap-10 mt-5">
                <h2 className="pt-3">Color</h2>

                <div className="flex flex-col gap-4">
                    {watch("color")?.map((el, index) => {
                        const isEditable = editableIndex === index;

                        return (
                            <div key={index} className="flex flex-row gap-4">
                                <InputFieldForm
                                    control={control}
                                    name={`color.${index}.name`}
                                    placeholder="Enter color"
                                    disabled={!isEditable}
                                    className={isEditable ? "border-2 border-blue-500" : ""}
                                />

                                {isEditable ? (
                                    <Button
                                        bg="bg-green-200 border border-green-600"
                                        className="max-h-[42px]"
                                        label="Save"
                                        onClick={() => editColor(el._id, watch(`color.${index}.name`))}
                                    />
                                ) : (
                                    <div className="flex flex-row gap-2">
                                        <Button className="max-h-[42px]" label="Edit" onClick={() => setEditableIndex(index)} />
                                        <Button className="max-h-[42px]" label="Delete" onClick={() => deleteColor(el._id)} />
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div className="flex flex-row gap-4">
                        <InputFieldForm control={control} name={`newColor`} placeholder="Enter color" />

                        <div className="flex flex-row gap-2">
                            <Button className="max-h-[42px]" label="Add color" onClick={() => createColor(watch("newColor"))} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
