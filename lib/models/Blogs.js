import mongoose from 'mongoose';
import { createModel } from '../helper';
import { createPlugins } from '../connect';


const MODEL_NAME = 'Blogs';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
    },
    highlight: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Authors',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    type: {
        type: String,
        default: 'blog'
    },
    slug: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
    },
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    }
});

createPlugins(blogSchema, MODEL_NAME)

export default createModel(MODEL_NAME, blogSchema);
