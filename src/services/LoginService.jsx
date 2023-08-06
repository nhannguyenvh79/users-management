import axios from "./CustomizeAxios.jsx";

const logIn = (email, password) => {
    return axios.post("/auth/login", {
        email,
        password,
    });
};

export { logIn };
