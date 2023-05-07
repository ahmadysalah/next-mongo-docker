import mongoose from 'mongoose';
import { createModel } from '../helper';
import { createPlugins } from '../connect';

const MODEL_NAME = 'Sections';

const sectionsSchema = new mongoose.Schema({
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
        default: 'section'
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
    parentPages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pages',
    }],
    hasSubSection: {
        type: Boolean,
        default: false,
    },
    subSections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sections',
        }
    ],
    parentSection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sections',
    },
    sections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sections',
        }
    ],
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
    authors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Authors',
        }
    ],
});


createPlugins(sectionsSchema, MODEL_NAME)

export default createModel(MODEL_NAME, sectionsSchema);
