import express from "express";
import mongoose from "mongoose";
import User from "./db/user.js";
const app = express();
const Port = 3000;
const URL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5"

mongoose.connect(URL);
app.use(express.urlencoded({ extended: true }))
app.set("views engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post('/submitdata', async (req, res) => {
    const { firstName, lastName, rollNumber } = req.body;

    try {
        const user = new User({ firstName, lastName, rollNumber });
        await user.save();
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(Port, () => {
    console.log(`Server is Running on Port ${Port}`);
})

