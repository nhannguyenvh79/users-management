import axios from "./CustomizeAxios.jsx";

const signUp = (email, password) => {
    return axios.post("/auth/signup", {
        email,
        password,
    });
};
const signUpConfirm = (email, password, tokenSignUp) => {
    return axios.post(
        "/auth/signup/confirm",
        {
            email,
            password,
        },
        {
            headers: {
                "x-access-token": tokenSignUp,
            },
        }
    );
};

export { signUp, signUpConfirm };
