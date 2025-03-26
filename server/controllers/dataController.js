import { llamaVision } from "../utils/vision.js";

export const imageDescription = async (req, res) => {
    try {
        const file = req.file;
        const description = await llamaVision(file.path);
        console.log(description);
        res.json({message: description});
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
}