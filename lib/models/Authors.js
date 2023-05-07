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
    },
    profileImage: {
        type: String,
    },
    published: {
        type: Boolean,
        default: true,
    },
    contacts: [
        {
            type: String,
        },
        {
            link: String,
        },
    ],
});


createPlugins(authorSchema, MODEL_NAME)

export default createModel(MODEL_NAME, authorSchema);
