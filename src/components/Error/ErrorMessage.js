import React from "react";

export function ErrorMessage(props) {
    const { errors, className } = props;

    return <span className={`text-red-400 text-xs ml-2 ${className}`}>* {errors.message}</span>;
}
