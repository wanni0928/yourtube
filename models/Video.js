import mongoose from "mongoose";

// schema is a 'shape'
// model is an actual data
// required is a exception log when the data value is 'null'
// https://mongoosejs.com/docs/guide.html
const VideoSchema = new mongoose.Schema({
    fileUrl : {
        type: String,
        required: "File URL is required"
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description : String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const model = mongoose.model("Video", VideoSchema);
export default model;