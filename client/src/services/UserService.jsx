import axios from "./CustomizeAxios.jsx";

const fetchUsers = (page, sortBy, sortField, searchKey) => {
    return axios.get(
        `/api/v1/users?page=${page}&sortBy=${sortBy}&sortField=${sortField}&searchKey=${searchKey}`,

        {
            headers: {
                "x-access-token": localStorage.getItem("accessToken") || "",
            },
        }
    );
};
const fetchAllUsers = () => {
    return axios.get(
        `/api/v1/users/all`,

        {
            headers: {
                "x-access-token": localStorage.getItem("accessToken") || "",
            },
        }
    );
};

const postNewUser = (firstName, lastName, email) => {
    return axios.post(
        "/api/v1/users",
        {
            first_name: firstName,
            last_name: lastName,
            email,
        },
        {
            headers: {
                "x-access-token": localStorage.getItem("accessToken") || "",
            },
        }
    );
};

const putUser = (firstName, lastName, email, id) => {
    return axios.put(
        `/api/v1/users/${id}`,
        {
            first_name: firstName,
            last_name: lastName,
            email,
        },
        {
            headers: {
                "x-access-token": localStorage.getItem("accessToken") || "",
            },
        }
    );
};

const putUsers = (arr) => {
    return axios.put(
        "/api/v1/users/",
        {
            data: arr,
        },
        {
            headers: {
                "x-access-token": localStorage.getItem("accessToken") || "",
            },
        }
    );
};

const deleteUser = (id) => {
    return axios.delete(`/api/v1/users/${id}`, {
        headers: {
            "x-access-token": localStorage.getItem("accessToken") || "",
        },
    });
};

export {
    fetchUsers,
    fetchAllUsers,
    postNewUser,
    putUser,
    deleteUser,
    putUsers,
};
