import NotipinMessage from "../models/notipinMessage.js";

export const getNotipin = async (req, res) => {
    try {
        const notipinMessages = await NotipinMessage.find();

        res.status(200).json(notipinMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createNotipin = async (req, res) => {
    const notipin = req.body;

    const newNotipin = new NotipinMessage(notipin);

    try {
        await newNotipin.save();

        res.status(201).json(newNotipin);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
