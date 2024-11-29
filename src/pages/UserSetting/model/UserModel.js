import React from "react";
import { InputFieldForm } from "../../../components/InputField";
import { useForm } from "react-hook-form";
import { ReactComponent as CloseIcon } from "../../../Assets/close.svg";
import { ErrorMessage } from "../../../components/Error/ErrorMessage";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Button from "../../../components/Button/Button";
import API from "../../../API/API";
import CryptoJS from "crypto-js";
import { roleMenuItem } from "../../../constants/constant";

export default function UserModel(props) {
    const { handleClickClose, fetchUsers, userData, decrypt } = props;

    function formatRole(userDataRoles) {
        return userDataRoles
            .map((userRoleData) => {
                const roleKey = Object.keys(userRoleData.role)[0];
                const roleValue = userRoleData.role[roleKey];
                const matchedRole = roleMenuItem.find((item) => item.value[roleKey] === roleValue);
                return matchedRole ? matchedRole : null;
            })
            .filter(Boolean);
    }

    const {
        control,
        formState: { errors },
        setValue,
        watch,
        handleSubmit,
        setError,
    } = useForm({
        defaultValues: !!userData
            ? {
                  userName: userData.user_name,
                  mobileNumber: userData.mobile_number,
                  password: decrypt(userData.password),
                  selectedRole: formatRole(userData.roles),
              }
            : {},
    });

    const handleUserAction = async (data) => {
        !!userData ? updateUser(data) : createUser(data);
    };

    const createUser = async (data) => {
        const userRoles = watch("selectedRole")?.map((role) => ({ role: role.value }));

        const encryptedPassword = CryptoJS.AES.encrypt(data.password, process.env.REACT_APP_SECRET_KEY).toString();

        const requestData = {
            user_name: data.userName,
            password: encryptedPassword,
            mobile_number: data.mobileNumber,
            roles: userRoles,
        };

        try {
            const response = await API.post("/admin/users", requestData);

            if (response?.success) {
                fetchUsers();
                handleClickClose();
            } else {
                if (response?.response?.data?.message?.user_name) setError("userName", { message: response?.response?.data?.message?.user_name });
            }
        } catch (error) {
            console.error("API Error: ");
        }
    };

    const updateUser = async (data) => {
        const userRoles = watch("selectedRole")?.map((role) => ({ role: role.value }));

        const encryptedPassword = CryptoJS.AES.encrypt(data.password, process.env.REACT_APP_SECRET_KEY).toString();

        const requestData = {
            user_name: data.userName,
            password: encryptedPassword,
            mobile_number: data.mobileNumber,
            roles: userRoles,
        };

        try {
            const response = await API.put(`/admin/users/${userData._id}`, requestData);

            if (response?.success) {
                fetchUsers();
                handleClickClose();
            } else {
                if (response?.response?.data?.message?.user_name) setError("userName", { message: response?.response?.data?.message?.user_name });
            }
        } catch (error) {
            console.error("API Error: ");
        }
    };

    const handleSelectUserRole = (data) => {
        if (Array.isArray(data)) {
            setValue("selectedRole", data); // Updates the selected roles
        }
    };



    return (
        <>
            <div className="fixed bg-black bg-opacity-50 inset-0 z-50 flex p-4 md:p-0 md:absolute md:z-[9] overflow-auto md:overflow-visible">
                <div className="max-w-[830px] w-full rounded-xl px-8 py-6 md:mt-0 md:w-full md:p-4 lg:max-w-[439px] md:max-w-full md:rounded-none bg-white m-auto">
                    <div className="flex flex-row justify-between items-center border-neutral-300 mb-6 lg:mb-4">
                        <div>
                            <span className="paragraph-large-medium">User</span>
                        </div>

                        <div onClick={handleClickClose} className="md:hidden cursor-pointer">
                            <CloseIcon />
                        </div>
                    </div>

                    <div className="flex flex-row items-center mb-4 lg:block md:mb-2">
                        <div className="w-1/2 mr-2 lg:w-full lg:mr-0 lg:mb-2 md:mb-4 relative">
                            <InputFieldForm
                                label="Enter user name"
                                placeholder="Enter user name"
                                name="userName"
                                control={control}
                                rules={{ required: "Please enter user name" }}
                            />

                            {errors?.userName && <ErrorMessage className="absolute -bottom-5" errors={errors?.userName} />}
                        </div>

                        <div className="w-1/2 ml-2 relative lg:w-full lg:ml-0">
                            <Dropdown
                                label="Select user role"
                                selectedItems={watch("selectedRole") ?? []}
                                placeholder="Select user role"
                                setSelectedItems={handleSelectUserRole}
                                menuItem={roleMenuItem}
                            />
                            {errors?.user_role && <ErrorMessage errors={errors?.user_role} />}
                        </div>
                    </div>

                    <div className="flex flex-row items-center mb-3.5 lg:block md:mb-2">
                        <div className="w-1/2 mr-2 lg:w-full lg:mr-0 lg:mb-2 md:mb-4">
                            <InputFieldForm label="Enter password" placeholder="Enter password" name="password" control={control} rules={{ required: "Please enter password" }} />

                            {errors?.password && <ErrorMessage errors={errors?.password} />}
                        </div>

                        <div className="w-1/2 ml-2 relative lg:w-full lg:ml-0 remove-spin-button">
                            <InputFieldForm
                                type="number"
                                label="Enter mobile number"
                                placeholder="Enter mobile number"
                                name="mobileNumber"
                                control={control}
                                rules={{ required: "Please enter mobileNumber" }}
                            />

                            {errors?.mobileNumber && <ErrorMessage errors={errors?.mobileNumber} />}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-x-4 my-6">
                        {watch("selectedRole")?.map((el, index) => {
                            return (
                                <div key={index} className="w-fit mb-2 bg-[#d5dcdf] px-3 py-1 rounded-xl">
                                    <span className="text-lg text-neutral-700">{el.label}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-row justify-between items-center md:fixed md:bottom-0 md:left-0 md:right-0 md:mb-0 md:shadow-dropShadow md:bg-white md:px-4 md:pt-2 md:pb-1">
                        <Button label="Save" onClick={handleSubmit(handleUserAction)} />
                    </div>
                </div>
            </div>
        </>
    );
}
