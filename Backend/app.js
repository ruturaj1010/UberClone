const express = require("express");
const mongoose = require('mongoose');

const app = express();

main().then(res =>{
    console.log("DB connected successfully")
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://ruturajnikam1010:Lnwrlcoiq8xIzk6Y@uberdb.yga0ugo.mongodb.net/?retryWrites=true&w=majority&appName=Uberdb');
}

app.get("/", (req, res) => {
    res.send("Welcome to home page");
})

app.listen(8080, () => {
    console.log("Server is running on port successfully")
})