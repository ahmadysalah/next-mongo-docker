import mongoose from 'mongoose';
import { createModel } from '../helper';
import { createPlugins } from '../connect';

const MODEL_NAME = 'Pages';

const pagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    route: {
        type: String,
    },
    link: {
        type: String,
    },
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    highlight: {
        type: String,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    type: {
        type: String,
        default: 'page'
    },
    slug: {
        type: String,
    },
    tags: {
        type: [String],
    },
    images: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assets',
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    published: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: String,
    },
    hasSubPage: {
        type: Boolean,
        default: false,
    },
    subPages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pages',
        }
    ],
    parentPage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pages',
    },
    hasSection: {
        type: Boolean,
        default: false,
    },
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sections',
    }],
    hasBlog: {
        type: Boolean,
        default: false,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blogs',
        }
    ],
    hasAuthor: {
        type: Boolean,
        default: false,
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Authors',
    }],
});


createPlugins(pagesSchema, MODEL_NAME)

export default createModel(MODEL_NAME, pagesSchema);
