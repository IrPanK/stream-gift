import Streamer from "../models/streamer.js";

export const getSteamer = async (req, res) => {
    try {
        const streamerId = await Streamer.find();

        res.status(200).json(streamerId);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createStreamer = async (req, res) => {
    const streamerId = req.body;

    const newStreamer = new Streamer(streamerId);

    try {
        await newStreamer.save();

        res.status(201).json(newStreamer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
