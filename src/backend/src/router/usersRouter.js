import express from "express";
import { v4 as uuid } from "uuid";
import data from "../data/mockData.js";
import checkAuth from "../middleware/checkAuth.js";

export const usersRouter = express.Router();

let users = data;

const auth1 = ["admin"];
const auth2 = ["member", "admin"];

usersRouter.get("/", checkAuth(auth2), (req, res) => {
    let newUsers = handleSort(req.query.sortBy, req.query.sortField);

    newUsers = handleFilter(newUsers, req.query.searchKey);

    const perPage = 6;
    const page = +req.query.page;
    const total = +newUsers.length;
    const totalPages = total / perPage;
    const data = newUsers.slice(page * perPage - perPage, page * perPage);
    res.json({
        page,
        perPage,
        total,
        totalPages,
        data,
    });
});

usersRouter.get("/all", checkAuth(auth1), (req, res) => {
    res.json({ users });
});

usersRouter.get("/:userId", checkAuth(auth2), (req, res) => {
    const user = users.find((el) => el.id == req.params.userId);
    if (user) {
        res.json({
            data: user,
        });
    } else {
        res.json({
            message: "not found",
        });
    }
});

usersRouter.post("/", checkAuth(auth1), (req, res) => {
    if (req.body) {
        const data = { ...req.body, id: uuid() };
        users.push(data);
        res.json({
            status: "success",
            message: "student data saved successfully",
        });
    } else {
        res.json({ status: "failure", message: "something wrong" });
    }
});

usersRouter.put("/:userId", checkAuth(auth1), (req, res) => {
    const indexUser = users.findIndex((el) => el.id == req.params.userId);

    if (indexUser === 0 || indexUser) {
        users[indexUser] = {
            ...users[indexUser],
            ...req.body,
        };
        res.json({
            message: "successfull",
        });
    } else {
        res.json({
            message: "not found",
        });
    }
});
usersRouter.put("/", checkAuth(auth1), (req, res) => {
    if (req.body && req.body.data) {
        users = req.body.data;
        res.json({ message: "successfull" });
    } else {
        res.json({ message: "failure" });
    }
});

usersRouter.delete("/:userId", checkAuth(auth1), (req, res) => {
    let indexUser = users.findIndex((el) => el.id === +req.params.userId);
    if (indexUser === 0 || indexUser) {
        users.splice(indexUser, 1);
        res.json({
            message: "successfull",
        });
    } else {
        res.json({
            message: "not found",
        });
    }
});

const handleSort = (sortBy, SortField) => {
    let termUsers = users.slice();
    switch (SortField) {
        case "first_name":
            if (sortBy && SortField && sortBy === "asc") {
                termUsers.sort((a, b) =>
                    a[SortField].toUpperCase().localeCompare(
                        b[SortField].toUpperCase()
                    )
                );
            } else if (sortBy && SortField && sortBy === "desc") {
                termUsers.sort((a, b) =>
                    b[SortField].toUpperCase().localeCompare(
                        a[SortField].toUpperCase()
                    )
                );
            }
            return termUsers;

        case "id":
            if (sortBy && SortField && sortBy === "asc") {
                termUsers.sort((a, b) => a[SortField] - b[SortField]);
            } else if (sortBy && SortField && sortBy === "desc") {
                termUsers.sort((a, b) => b[SortField] - a[SortField]);
            }
            return termUsers;

        default:
            if (sortBy && SortField && sortBy === "asc") {
                termUsers.sort((a, b) => a[SortField] - b[SortField]);
            } else if (sortBy && SortField && sortBy === "desc") {
                termUsers.sort((a, b) => b[SortField] - a[SortField]);
            }
            return termUsers;
    }
};

const handleFilter = (users, searchKey) => {
    if (searchKey) {
        return users.filter((user) => user.email.includes(searchKey));
    } else {
        return users;
    }
};
