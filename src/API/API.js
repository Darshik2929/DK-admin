import axios from "axios";
import { interceptorsRequest, interceptorsRequestError, interceptorsResponse, interceptorsResponseError } from "./interceptors";
import { hideLoader, showLoader } from "../store/slice/loaderSlice";
import { store } from "../store/store";

let API = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
});

API.defaults.headers.post["content-type"] = "application/json";
API.defaults.headers.get["Accept"] = "application/json";

API.interceptors.request.use(
    (request) => {
        store.dispatch(showLoader());
        return interceptorsRequest(request);
    },
    (error) => {
        store.dispatch(hideLoader());
        return interceptorsRequestError(error);
    }
);

API.interceptors.response.use(
    (response) => {
        store.dispatch(hideLoader());
        return interceptorsResponse(response);
    },
    (error) => {
        store.dispatch(hideLoader());
        return interceptorsResponseError(error);
    }
);

export default API;
