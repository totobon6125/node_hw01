import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    title: {
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

postSchema.virtual("postId").get(function () { // _id를 userId로 "명칭"하겠다.
    return this._id.toHexString();
});

export default mongoose.model('post', postSchema);