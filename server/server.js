import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import dataRouter from "./routes/dataRoute.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/data", dataRouter);
app.use("/", (req, res) => {
    res.send("pong");
});

app.listen(PORT, () => {
    console.log("Server running at port ", PORT);
});