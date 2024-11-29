export const interceptorsRequest = (request) => {
    let authenticationData = localStorage.getItem("auth_token");

    if (authenticationData) {
        request.headers.Authorization = `Bearer ${authenticationData}`;
    }

    return request;
};

export const interceptorsRequestError = (error) => {
    return Promise.reject(error);
};

export const interceptorsResponse = (response) => {
    return response.data;
};

export const interceptorsResponseError = (error) => {
    return error;
};
