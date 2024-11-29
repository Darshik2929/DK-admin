import React from "react";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";

const AnimatedInput = motion.input;

export default function InputField({ label, onChange, type = "text", placeholder, value = "", className, disabled }) {
    return (
        <div className="flex flex-col">
            {label && <label className="font-semibold text-gray-700">{label}</label>}
            <AnimatedInput
                type={type}
                onChange={onChange}
                value={value}
                disabled={disabled}
                className={`border border-neutral-300 rounded-md py-3 px-4 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-[#3f484f] disabled:bg-neutral-100 ${className} `}
                placeholder={placeholder}
                initial={{ scale: 1 }}
                whileFocus={{ scale: 1.02 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
}

export function InputFieldForm({ name, rules, label, placeholder, control, type, className, disabled }) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <InputField onChange={field.onChange} label={label} disabled={disabled} className={className} value={field.value ?? ""} type={type} placeholder={placeholder} />
            )}
        />
    );
}
