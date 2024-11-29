import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, setHours, setMinutes } from "date-fns";
import API from "../../../API/API";
import Button from "../../../components/Button/Button";

const ClientOrderCard = ({ order, fetchOrders }) => {
    const { client_id, product } = order;

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const today = new Date();

    const handleSubmit = async () => {
        if (selectedDate && selectedTime) {
            const fullDateTime = setHours(setMinutes(new Date(selectedDate), selectedTime.getMinutes()), selectedTime.getHours());

            try {
                await API.put(`/client/orders/${order._id}/delivery-time`, { date: fullDateTime });
                fetchOrders();
                setSelectedDate(null);
                setSelectedTime(null);
            } catch (error) {
                console.error("Error updating date: ", error);
            }
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <span className="font-medium text-gray-700">Client :</span>
                    <span className="ml-2 text-gray-800">{client_id.name}</span>
                </div>
                {order?.deadline?.due_date && <> Delivery time : {format(order?.deadline?.due_date, "dd MMM yyyy hh:mm a")}</>}
            </div>

            {product.map((prod, index) => (
                <div key={index} className="border border-neutral-300 p-3 rounded-lg bg-gray-50 my-4 shadow-sm">
                    <div className="flex flex-row justify-between mb-2">
                        <h1 className="text-lg font-bold text-gray-900">{prod?.id?.name}</h1>
                        <span className="text-lg font-bold text-gray-900">{prod?.quantity}</span>
                    </div>

                    <div className="mb-2">
                        <span className="font-medium text-gray-700">Color :</span>
                        <span className="text-gray-800"> {prod?.color?.name}</span>
                    </div>

                    <div className="flex flex-row gap-6 mb-2">
                        <div className="">
                            <span className="font-medium text-gray-700">Sticker :</span>
                            <span className="text-gray-800"> {prod.id.sticker.name}</span>
                        </div>
                        <span className="font-bold">(Qty. {prod.id.sticker_number * prod.quantity})</span>
                    </div>

                    <div className="flex flex-row gap-6 mb-2">
                        <div className="">
                            <span className="font-medium text-gray-700">Box :</span>
                            <span className="text-gray-800"> {prod?.box?.name}</span>
                        </div>
                        <span className="font-bold">(Qty. {Math.floor(prod.quantity / prod.id.in_a_box)})</span>
                    </div>

                    <div className="flex flex-row gap-6 mb-2">
                        <div className="">
                            <span className="font-medium text-gray-700">Plastic Bag :</span>
                            <span className="text-gray-800"> {prod.id.plastic_bag.name}</span>
                        </div>
                        <span className="font-bold">(Qty. {prod.id.plastic_bag_number * prod.quantity})</span>
                    </div>

                    <div className="mb-2">
                        <span className="font-medium text-gray-700">Color : </span>
                        <span className="text-gray-800"> {prod?.color?.name}</span>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-600">Components:</h4>
                        <ul className="list-disc ml-6 text-sm text-gray-800 space-y-2 mt-2">
                            {prod.id.components.map((component, idx) => (
                                <li key={idx} className="list-disc flex flex-row gap-6">
                                    <span>{component.id.name || "Unnamed Component"} </span>
                                    <span className="font-bold">(Qty. {component.quantity * prod.quantity})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {prod.note && (
                        <div className="bg-orange-100 rounded-md px-4 py-2">
                            <span className="font-medium text-gray-700">Note : </span>
                            <span className="text-gray-800"> {prod.note}</span>
                        </div>
                    )}
                </div>
            ))}

            <div className="mt-6 flex flex-row justify-between w-full gap-4 mb-4">
                <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                        Select Date:
                    </label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={today}
                        dateFormat="dd MMM, yyyy"
                        className="border border-gray-300 p-2 rounded-md w-full"
                        placeholderText="Select a date"
                        calendarClassName="w-full"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="time">
                        Select Time:
                    </label>
                    <DatePicker
                        selected={selectedTime}
                        onChange={(time) => setSelectedTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        showTimeCaption={false}
                        dateFormat="hh:mm aa"
                        className="border border-gray-300 p-2 rounded-md w-full"
                        placeholderText="Select a time"
                    />
                </div>
            </div>

            <Button label="Update Date" onClick={handleSubmit} disabled={!selectedDate} />
        </div>
    );
};

export default ClientOrderCard;
