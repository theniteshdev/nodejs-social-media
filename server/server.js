#!/usr/bin/env nodejs
import express from 'express';
import variable from './conf/variable.js';
import connectToDB from "./db/db.js"
import cookieParser from 'cookie-parser';
import routes from './routes/auth.route.js';
import UserRoute from './routes/user.route.js';
import authorizationMiddleware from "./middlewares/auth.middlewares.js"
// console.clear();
const server = express();
server.use(express.json());
server.use(cookieParser());
server.get('/', function (req, res) {
    res.status(200).json({
        success: true,
        message: 'Welcome!',
    });
});

server.use("/auth", routes)
server.use("/user", authorizationMiddleware, UserRoute)

server.listen(variable.port, variable.hostname, (error) => {
    if (error) {
        console.log('Server listening problem !');
        return;
    }
    console.log('Server Up!');
    connectToDB();
});
