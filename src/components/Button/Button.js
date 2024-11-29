import React from "react";
import { motion } from "framer-motion";

export default function Button(props) {
    const { label, onClick, className, bg, disabled } = props;

    return (
        <motion.button
            whileHover={{ scale: !disabled ? 1.05 : 1, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: !disabled ? 0.95 : 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`${bg ?? "bg-[#fff9f5] border-[#3f484f] border"} disabled:cursor-not-allowed rounded-md py-2 px-3 w-full ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </motion.button>
    );
}
