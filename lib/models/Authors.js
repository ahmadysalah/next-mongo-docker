import mongoose from 'mongoose';
import { createModel } from '../helper';
import { createPlugins } from '../connect';

const MODEL_NAME = 'Authors';



const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: true,
    },
    contacts: [
        {
            type: String,
            required: true,
        },
        {
            link: String,
            required: true
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


createPlugins(authorSchema, MODEL_NAME)

export default createModel(MODEL_NAME, authorSchema);
