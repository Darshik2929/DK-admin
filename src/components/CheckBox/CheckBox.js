import { useEffect, useState } from "react";

export const CheckBox = (props) => {
    const { marginL, marginT, marginR, marginB, optionId, labelStyle, paddingL, label, disabled } = props;

    const [isChecked, setIsChecked] = useState(props.isChecked ?? false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        props?.setIsChecked(!isChecked);
    };

    useEffect(() => {
        setIsChecked(props.isChecked);
    }, [props.isChecked]);

    return (
        <>
            <div className={`checkbox-style flex flex-row items-center relative ml-${marginL} mt-${marginT} mr-${marginR} mb-${marginB}`}>
                <input type="checkbox" className="w-5 h-5" id={optionId} checked={isChecked} onChange={handleCheckboxChange} disabled={disabled} />
                {label && (
                    <label htmlFor={optionId} className="checkbox-label">
                        <span className={`${labelStyle ?? "paragraph-small-medium"} ${paddingL}`}>{label}</span>
                    </label>
                )}
            </div>
        </>
    );
};
