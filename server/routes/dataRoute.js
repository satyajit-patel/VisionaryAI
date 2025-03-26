import express from "express";
import {imageDescription} from "../controllers/dataController.js";
import { upload } from "../middlewares.js/multer.js";

const router = express.Router();

router.post("/upload", upload.single("file"), imageDescription);
router.get("/ping", (req, res) => {
    res.json({message: "pong"});
});

export default router;