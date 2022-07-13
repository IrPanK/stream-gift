import mongoose from "mongoose";

const streamerSchema = mongoose.Schema({
    name: String,
    idStreamer: String,
});

export default mongoose.model("Streamer", streamerSchema);
