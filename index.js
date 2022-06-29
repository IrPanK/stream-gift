import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import notipinRoutes from "./routes/notipin.js";
import videoniRoutes from "./routes/videoni.js";
import userRoutes from "./routes/users.js";
import rootSocket from "./sockets/socket.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/notipin", notipinRoutes);
app.use("/videoni", videoniRoutes);
app.use("/user", userRoutes);

// greeting
app.get("/", (req, res) => {
    res.send("Hello to stream gift API");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

mongoose
    .connect(process.env.CONNECTION_URL)
    .then()
    .catch((error) => console.log(error));

rootSocket(io);
