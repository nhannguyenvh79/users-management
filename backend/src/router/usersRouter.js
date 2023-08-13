import express from "express";
import { ObjectId } from "mongodb";
import data from "../data/mockData.js";
import checkAuth from "../middleware/checkAuth.js";
import { db } from "../db.js";

export const usersRouter = express.Router();

let users = data;

const auth1 = ["admin"];
const auth2 = ["member", "admin"];

usersRouter.get("/", checkAuth(auth2), async (req, res) => {
    const { page, sortBy, sortField, searchKey } = req.query;

    let sortOptions = {};
    switch (sortField) {
        case "first_name":
            sortOptions = { first_name: sortBy === "asc" ? 1 : -1 };
            break;
        case "id":
            sortOptions = { _id: sortBy === "asc" ? 1 : -1 };
            break;

        default:
            sortOptions = { _id: 1 };
    }

    try {
        const userList = await db("users")
            .find({
                email: {
                    $regex: searchKey,
                    $options: "i",
                },
            })
            .sort(sortOptions)
            .toArray();

        const perPage = 6;
        const currentPage = +page;
        const total = +userList.length;
        const totalPages = total / perPage;
        const data = userList.slice(
            currentPage * perPage - perPage,
            currentPage * perPage
        );

        res.json({
            currentPage,
            perPage,
            total,
            totalPages,
            data,
        });
    } catch (error) {
        res.json({ message: error });
    }
});

usersRouter.get("/all", checkAuth(auth2), async (req, res) => {
    try {
        const users = await db("users").find({}).toArray();
        res.json({ users });
    } catch (error) {
        res.json({ meassage: error });
    }
});

usersRouter.get("/:userId", checkAuth(auth2), async (req, res) => {
    try {
        const user = await db("users")
            .find({ _id: new ObjectId(req.params.userId) })
            .toArray();

        if (user) {
            res.json({
                data: user,
            });
        } else {
            throw new Error("user not found");
        }
    } catch (error) {
        res.json({ message: error });
    }
});

usersRouter.post("/", checkAuth(auth1), async (req, res) => {
    const data = req.body;
    try {
        if (
            req.body &&
            req.body.first_name &&
            req.body.last_name &&
            req.body.email
        ) {
            await db("users").insertOne(data);
            res.json({
                status: "success",
                message: "student data saved successfully",
            });
        } else {
            throw new Error("something wrong with your information");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

usersRouter.put("/:userId", checkAuth(auth1), async (req, res) => {
    const id = req.params.userId;
    const data = req.body;
    console.log(id, data);

    try {
        await db("users").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: data,
            }
        );

        res.json({
            message: "successfull",
        });
    } catch (error) {
        res.json({ message: error });
    }
});

usersRouter.put("/", async (req, res) => {
    const data = req.body.data;
    const newDocument = data.map(
        (el) => (el = { ...el, _id: new ObjectId(el._id) })
    );

    try {
        await db("users").deleteMany({});

        await db("users").insertMany(newDocument);

        res.json({ message: "successful" });
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

usersRouter.delete("/:userId", checkAuth(auth1), async (req, res) => {
    const id = req.params.userId;

    try {
        await db("users").deleteOne({ _id: new ObjectId(id) });

        res.json({
            message: "successfull",
        });
    } catch (error) {
        res.json({ message: error });
    }
});
