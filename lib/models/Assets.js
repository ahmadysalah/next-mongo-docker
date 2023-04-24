import mongoose from 'mongoose';
import { createPlugins } from '../connect';
import { createModel } from '../helper';

const MODEL_NAME = 'Assets';

const assetSchema = new mongoose.Schema({
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
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


createPlugins(assetSchema, MODEL_NAME);

export default createModel(MODEL_NAME, assetSchema);
