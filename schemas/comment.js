import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false }
);

commentSchema.virtual("postId").get(function () { // _id를 userId로 "명칭"하겠다.
    return this._id.toHexString();
});

export default mongoose.model('comment', commentSchema);