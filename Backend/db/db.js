const mongoose = require('mongoose');

main().then(res => {
    console.log("DB connected successfully")
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DBCONNECT);
}
module.exports = main;