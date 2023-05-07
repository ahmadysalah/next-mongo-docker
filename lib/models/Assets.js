import mongoose from 'mongoose';
import { createPlugins } from '../connect';
import { createModel } from '../helper';

const MODEL_NAME = 'Assets';

const assetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    mimeType: {
        type: String,
    },
    size: {
        type: Number,
    },
    alt: {
        type: String,
    },
});


createPlugins(assetSchema, MODEL_NAME);

export default createModel(MODEL_NAME, assetSchema);
