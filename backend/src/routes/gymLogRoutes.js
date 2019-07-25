const assert = require("assert");
let OBjectID = require("mongodb").ObjectID;
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../envorment.json");

module.exports = function (app, db) {
    const collection = db
        .db("404UsernameNotFound404")
        .collection("usersCredentials");
    const workoutData = db.db("404UsernameNotFound404").collection("workouts");
    app.post("/register", async (req, res) => {
        let allreadyUsername = false;
        collection.findOne({ username: req.body.username }, (err, results) => {
            if (err) {
                throw err;
            } else {
                if (!results) {
                    bcypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            throw err;
                        } else {
                            const user = {
                                username: req.body.username,
                                password: hash
                            };
                            collection.insertOne(user, (err, results) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(results.ops[0]);
                                }
                            });
                        }
                    });
                } else {
                    res.status(420);
                    res.send({
                        error: "There is allready a user with that username."
                    });
                }
            }
        });
    });
    app.post("/login", (req, res) => {
        console.log("call fired for login");
        let failedPasswordCheck = true;
        collection.findOne(
            { username: req.body.username },
            async (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(401);
                    res.send("Auth Failed");
                } else if (results !== null || results !== undefined) {
                    console.log(req.body.username);
                    try {
                        if (
                            bcypt.compareSync(
                                req.body.password,
                                results.password
                            )
                        ) {
                            res.status(201);
                            console.log(JWT_KEY);
                            res.send(
                                await Token(
                                    {
                                        username: results.username,
                                        _id: results._id
                                    },
                                    JWT_KEY
                                )
                            );
                            failedPasswordCheck = false;
                        } else {
                            console.log("Password is wrong");
                            res.status(401);
                            res.send("Auth Failed");
                        }
                        res.end();
                    } catch (error) {
                        console.log("password returned null");
                        res.status(401);
                        res.send("Auth Failed");
                        console.log(error);
                    }
                } else if (failedPasswordCheck) {
                    console.log("last stand worked");
                    res.status(401);
                    res.send("Auth Failed");
                }
                res.end();
            }
        );
    });
    app.post("/workouts", async (req, res) => {
        try {
            app.set("json spaces", 10);
            const decoded = await jwt.verify(req.body.token, JWT_KEY);
            console.log(decoded);
            workoutData
                .find({ username: decoded.username })
                .toArray(async (err, results) => {
                    if (err) {
                        res.status(404);
                        res.send(err);
                    }
                    console.log("decoded");
                    console.log(results);
                    res.json(results);
                });
        } catch (error) {
            res.status(401).json({
                message: "Auth Failed"
            });
        }
    });
    app.post("/addworkout", async (req, res) => {
        console.log('trying to add workout');
        console.log(req.body.title + 'if it works this should be title');
        console.log(req.body.exercises);
        console.log(req.body.username);
        const workout = {
            title: req.body.title,
            exercises: req.body.exercises,
            username: req.body.username
        };
        console.log(workout);
        workoutData.insertOne(workout, (err, results) => {
            if (err) {
                console.log(err);
                res.send({ err: "an error has occured" });
            } else {
                res.send(results.ops[0]);
            }
        });
        res.end();
    });
};

function Token(payload, privateKey) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            privateKey,
            {
                expiresIn: "1h"
            },
            function (err, token2) {
                if (err) reject(err);
                else resolve(token2);
            }
        );
    });
}
