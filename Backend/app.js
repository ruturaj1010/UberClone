const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const main = require("./db/db")

main();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to home page");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port successfully ${process.env.PORT}`)
})