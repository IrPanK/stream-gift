import mongoose from "mongoose";

const notipinSchema = mongoose.Schema(
    {
        creator: String,
        message: String,
        destination: String,
    },
    { timestamps: true }
);

const NotipinMessage = mongoose.model("NotipinMessage", notipinSchema);

export default NotipinMessage;
