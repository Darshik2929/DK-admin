import React from "react";

export default function Badge(props) {
    const { number } = props;

    if (!number) return;

    return (
        <span className="bg-red-400 py-0.5 rounded-full px-2">
            <span className=" text-xs"> {number < 10 ? "0" + number : number}</span>
        </span>
    );
}
