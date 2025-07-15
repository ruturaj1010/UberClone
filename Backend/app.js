const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const main = require("./db/db")
const userRoutes = require("./routes/user.routes");

main();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to home page");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port successfully ${process.env.PORT}`)
})