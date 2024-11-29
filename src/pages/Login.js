import React from "react";
import "./styles.css";
import { InputFieldForm } from "../components/InputField";
import { useForm } from "react-hook-form";
import Button from "../components/Button/Button";
import API from "../API/API";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/Error/ErrorMessage";

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const handleLogin = async (data) => {
        // const encryptedPassword = CryptoJS.AES.encrypt(data.password, process.env.REACT_APP_SECRET_KEY).toString();
        // const encryptedUserName = CryptoJS.AES.encrypt(data.userName, process.env.REACT_APP_SECRET_KEY).toString();

        const body = { user_name: data.userName, password: data.password, firebase_notification_token: localStorage.getItem("firebaseToken") };

        try {
            const response = await API.post("/auth/login", body);
            if (!!response.token) {
                console.log(`response.token : `, response.token);
                localStorage.setItem("auth_token", response.token);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
            <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
                </div>

                <div className="space-y-6">
                    <InputFieldForm placeholder="Enter user name" label="User name" control={control} name="userName" rules={{ required: "Please enter user name" }} />

                    {errors.userName && <ErrorMessage errors={errors.userName} />}

                    <InputFieldForm
                        type="password"
                        placeholder="Enter Password"
                        label="Password"
                        control={control}
                        name="password"
                        rules={{ required: "Please enter user password" }}
                    />
                    {errors.password && <ErrorMessage errors={errors.password} />}

                    <Button label="Login" onClick={handleSubmit(handleLogin)} />
                </div>
            </div>
        </div>
    );
};

export default Login;
