const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./src/config/db");
var cors = require("cors");
var portfinder = require("portfinder");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json(), cors());

// app.listen(8000, () => {
//     console.log("Listening on port " + 8000);
// });
console.log(db.url);
MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
    if (err) {
        console.log(
            "Error occurred while connecting to MongoDB Atlas...\n",
            err
        );
    } else {
        console.log("connected");
        // require("./src/routes")(app, database);
        require("./src/routes")(app, database);
        let port;

        app.listen(8000, () => {
            console.log("Listening on port " + 8000);
        });
    }
});
