import React from "react";
import { createContext, useState } from "react";

export const LogInConText = createContext();

function LogInConTexProvider(props) {
    const [logInValue, setLogInValue] = useState({
        accessToken: "",
        account: { id: "", email: "", type: "guest" },
    });

    const resetLogIn = () => {
        localStorage.removeItem("accessToken");
        setLogInValue({
            accessToken: "",
            account: { id: "", email: "", type: "guest" },
        });
    };

    return (
        <LogInConText.Provider
            value={{ logInValue, setLogInValue, resetLogIn }}
        >
            {props.children}
        </LogInConText.Provider>
    );
}

export default LogInConTexProvider;
