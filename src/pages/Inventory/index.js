import React, { useState } from "react";
import Button from "../../components/Button/Button.js";
import Machining from "./departments/machining/index.js";
import ProductInventory from "./departments/ProductInventory/ProductInventory.js";

export default function Index() {
    const [activeDepartment, setActiveDepartment] = useState("machining");

    const departments = [
        { label: "Component", value: "machining" },
        { label: "Box", value: "box" },
        { label: "Plastic Bag", value: "plastic_bag" },
        { label: "Sticker", value: "sticker" },
        { label: "Cartoon", value: "cartoon" },
        { label: "Product", value: "product" },
    ];

    return (
        <>
            <div className="flex flex-row items-center gap-4 max-w-[55vw] mb-6">
                {departments.map((dept) => (
                    <Button
                        key={dept.value}
                        label={dept.label}
                        onClick={() => setActiveDepartment(dept.value)}
                        bg={`transition-colors duration-300 ${
                            activeDepartment === dept.value ? "bg-[#f7ccb0] border-[#3f484f] border" : "bg-[#fff9f5] border-[#3f484f] border text-black hover:bg-[#f7ccb0]"
                        }`}
                    />
                ))}
            </div>

            <div className="pt-6 border-neutral-300 border-t">{activeDepartment === "product" ? <ProductInventory /> : <Machining department={activeDepartment} />}</div>
        </>
    );
}
