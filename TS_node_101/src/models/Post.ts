import { Schema, model } from 'mongoose';

let PostSchema: Schema = new Schema({

    createdAt: Date,
    updatedAt: Date,
    title: {
        type: String,
        default: '',
        required: true
    },
    slug: {
        // url.com/posts/first-blog-post
        type: String,
        default: '',
        required: true,
        unique: true
    },
    content: {
        type: String,
        default: '',
        required: true
    },
    featuredImage: {
        type: String,
        default: ''
    }
})

export default model('Post', PostSchema);