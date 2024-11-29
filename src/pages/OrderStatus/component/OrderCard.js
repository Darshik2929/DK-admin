import { format } from "date-fns";
import React from "react";
import Button from "../../../components/Button/Button";
import { motion } from "framer-motion";

const AnimatedCard = motion.div;
const AnimatedTable = motion.table;
const AnimatedTr = motion.tr;

export default function MachiningOrderCard(props) {
    const { client_id, created_at, product, department, showRejection, machining, resolveRejection } = props;
    const formattedDate = format(created_at, "dd MMM yyyy hh:mm a");

    return (
        <AnimatedCard
            className="border border-neutral-300 rounded-xl w-full p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-row justify-between mb-4 border-b border-neutral-300 pb-4">
                <div>
                    <span className="font-medium text-gray-700">Client :</span>
                    <span className="ml-2 text-gray-800">{client_id.name}</span>
                </div>

                <div>
                    <span className="font-medium text-gray-700">{formattedDate}</span>
                </div>
            </div>

            {showRejection && (
                <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex flex-row gap-4">
                        <span className="font-medium text-yellow-600">Rejection Reason :</span>
                        <p className="font-bold text-yellow-800">{machining.rejection_reason}</p>
                    </div>
                </div>
            )}

            {product.map((el, index) => (
                <div key={index} className="border border-neutral-300 p-3 rounded-lg bg-gray-50 my-4 shadow-sm">
                    <div className="flex flex-row justify-between mb-2">
                        <h1 className="text-lg font-bold text-gray-900">{el?.id?.name}</h1>
                        <span className="text-lg font-bold text-gray-900">{el?.quantity}</span>
                    </div>

                    <div className="mb-2">
                        <span className="font-medium text-gray-700">Color :</span>
                        <span className="text-gray-800">{el?.color?.name}</span>
                    </div>

                    <div className="mb-2">
                        <p className="text-gray-700">
                            <span className="font-medium">Note :</span> {el.note}
                        </p>
                    </div>

                    <div>
                        <AnimatedTable
                            className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="py-2 px-4 text-left text-gray-600">Component</th>
                                    {department === "newOrder" && <th className="py-2 px-4 text-left text-gray-600">Available</th>}
                                    <th className="py-2 px-4 text-left text-gray-600">Required</th>
                                    {department !== "pending" && <th className="py-2 px-4 text-left text-gray-600">Status</th>}
                                </tr>
                            </thead>

                            <tbody>
                                {el.components.map((compEl, compIndex) => (
                                    <AnimatedTr
                                        key={compIndex}
                                        className="border-b hover:bg-gray-50"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td className="py-2 px-4 text-gray-800">{compEl?.id?.name}</td>
                                        {department === "newOrder" && <td className="py-2 px-4 text-gray-800">{compEl?.id?.quantity}</td>}
                                        <td className="py-2 px-4 text-gray-800">{compEl.quantity * el.quantity}</td>
                                        {department !== "pending" && (
                                            <td className="py-2 px-4 text-gray-800">
                                                <div
                                                    className={`w-4 h-4 rounded-full ${
                                                        department === "newOrder"
                                                            ? compEl.quantity * el.quantity <= compEl?.id?.quantity
                                                                ? "bg-green-500"
                                                                : "bg-red-500"
                                                            : compEl.status === "pending"
                                                            ? "bg-red-500"
                                                            : compEl.status === "completed"
                                                            ? "bg-green-500"
                                                            : "bg-yellow-500"
                                                    }`}
                                                />
                                            </td>
                                        )}
                                    </AnimatedTr>
                                ))}
                            </tbody>
                        </AnimatedTable>
                    </div>
                </div>
            ))}

            {showRejection && <Button label="Resolve" onClick={resolveRejection} />}
        </AnimatedCard>
    );
}

export function PackagingOrderCard(props) {
    const { client_id, created_at = new Date(), product, department, showRejection, packaging, resolveRejection } = props;
    const formattedDate = format(created_at, "dd MMM yyyy hh:mm a");

    return (
        <AnimatedCard
            className="border border-neutral-300 rounded-xl w-full p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-row justify-between mb-4 border-b border-neutral-300 pb-4">
                <div>
                    <span className="font-medium text-gray-700">Client :</span>
                    <span className="ml-2 text-gray-800">{client_id.name}</span>
                </div>

                <div>
                    <span className="font-medium text-gray-700">{formattedDate}</span>
                </div>
            </div>

            {showRejection && (
                <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex flex-row gap-4">
                        <span className="font-medium text-yellow-600">Rejection Reason :</span>
                        <p className="font-bold text-yellow-800">{packaging.rejection_reason}</p>
                    </div>
                </div>
            )}

            {product.map((el, index) => (
                <div key={index} className="border border-neutral-300 p-3 rounded-lg bg-gray-50 my-4 shadow-sm">
                    <div className="flex flex-row justify-between mb-2">
                        <h1 className="text-lg font-bold text-gray-900">{el.id.name}</h1>
                        <span className="text-lg font-bold text-gray-900">{el.quantity}</span>
                    </div>

                    <div className="mb-2">
                        <span className="font-medium text-gray-700">Box :</span>
                        <span className="text-gray-800">{el.box.name}</span>
                    </div>

                    <div className="mb-2">
                        <p className="text-gray-700">
                            <span className="font-medium">Note :</span> {el.note}
                        </p>
                    </div>

                    <div>
                        <AnimatedTable
                            className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="py-2 px-4 text-left text-gray-600">Component</th>
                                    {department === "newOrder" && <th className="py-2 px-4 text-left text-gray-600">Available</th>}
                                    <th className="py-2 px-4 text-left text-gray-600">Required</th>
                                    <th className="py-2 px-4 text-left text-gray-600">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                <AnimatedTr className="border-b hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                    <td className="py-2 px-4 text-gray-800">
                                        <span>Box</span>
                                    </td>
                                    {department === "newOrder" && (
                                        <td className="py-2 px-4 text-gray-800">
                                            <span>{el.box.quantity}</span>
                                        </td>
                                    )}

                                    <td className="py-2 px-4 text-gray-800">
                                        <span>{Math.floor(el.quantity / el.id.in_a_box)}</span>
                                    </td>

                                    <td className="py-2 px-4 text-gray-800">
                                        <div className={`w-4 h-4 rounded-full ${el.quantity / el.id.in_a_box <= el.box.quantity ? "bg-green-500" : "bg-red-500"}`} />
                                    </td>
                                </AnimatedTr>

                                {el.cartoon?.cartoonType?.name && (
                                    <AnimatedTr className="border-b hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                        <td className="py-2 px-4 text-gray-800">
                                            <span>Cartoon :</span>
                                        </td>

                                        {department === "newOrder" && (
                                            <td className="py-2 px-4 text-gray-800">
                                                <span>{el.cartoon?.cartoonType?.quantity}</span>
                                            </td>
                                        )}

                                        <td className="py-2 px-4 text-gray-800">
                                            <span>{Math.floor(el.quantity / el?.cartoon?.cartoonType?.in_a_cartoon)}</span>
                                        </td>

                                        <td className="py-2 px-4 text-gray-800">
                                            <div
                                                className={`w-4 h-4 rounded-full ${
                                                    el.quantity / el?.cartoon?.cartoonType?.in_a_cartoon <= el?.cartoon?.cartoonType?.quantity ? "bg-green-500" : "bg-red-500"
                                                }`}
                                            />
                                        </td>
                                    </AnimatedTr>
                                )}

                                <AnimatedTr className="border-b hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                    <td className="py-2 px-4 text-gray-800">
                                        <span>Sticker :</span>
                                    </td>
                                    {department === "newOrder" && (
                                        <td className="py-2 px-4 text-gray-800">
                                            <span>{el?.id?.sticker?.quantity}</span>
                                        </td>
                                    )}
                                    <td className="py-2 px-4 text-gray-800">
                                        <span>{el?.id?.sticker_number * el.quantity}</span>
                                    </td>
                                    <td className="py-2 px-4 text-gray-800">
                                        <div
                                            className={`w-4 h-4 rounded-full ${el?.id?.sticker_number * el.quantity <= el?.id?.sticker?.quantity ? "bg-green-500" : "bg-red-500"}`}
                                        />
                                    </td>
                                </AnimatedTr>

                                <AnimatedTr className="hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                    <td className="py-2 px-4 text-gray-800">
                                        <span>Plastic Bag :</span>
                                    </td>
                                    {department === "newOrder" && (
                                        <td className="py-2 px-4 text-gray-800">
                                            <span>{el?.id?.plastic_bag?.quantity}</span>
                                        </td>
                                    )}

                                    <td className="py-2 px-4 text-gray-800">
                                        <span>{el?.id?.plastic_bag_number * el.quantity}</span>
                                    </td>
                                    <td className="py-2 px-4 text-gray-800">
                                        <div
                                            className={`w-4 h-4 rounded-full ${
                                                el?.id?.plastic_bag_number * el?.quantity <= el?.id?.plastic_bag?.quantity ? "bg-green-500" : "bg-red-500"
                                            }`}
                                        />
                                    </td>
                                </AnimatedTr>
                            </tbody>
                        </AnimatedTable>
                    </div>
                </div>
            ))}

            {showRejection && <Button label="Resolve" onClick={resolveRejection} />}
        </AnimatedCard>
    );
}
