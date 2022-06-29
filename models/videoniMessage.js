import mongoose from "mongoose";

const videoniSchema = mongoose.Schema(
    {
        creator: String,
        message: String,
        url: String,
        start: String,
        duration: String,
    },
    { timestamps: true }
);

export default mongoose.model("VideoniMessage", videoniSchema);
