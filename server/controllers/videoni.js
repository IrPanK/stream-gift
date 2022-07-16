import VideoniMessage from "../models/videoniMessage.js";

export const getVideoni = async (req, res) => {
    try {
        const videoniMessages = await VideoniMessage.find();

        res.status(200).json(videoniMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createVideoni = async (req, res) => {
    const videoni = req.body;

    const newVideoni = new VideoniMessage(videoni);

    try {
        await newVideoni.save();

        res.status(201).json(newVideoni);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
