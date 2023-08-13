import { MongoClient } from "mongodb";
import "dotenv/config";

// Connection URL
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kby0q3v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.DB_NAME;

let db;

const connectToDB = async (app) => {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        const database = client.db(dbName);

        db = (collection) => {
            return database.collection(collection);
        };

        app.listen(process.env.PORT, (error) => {
            !error
                ? console.log(`Listening port: ${process.env.PORT}`)
                : console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
};

export { connectToDB, db };
