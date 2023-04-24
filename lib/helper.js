import mongoose from "mongoose";

export const createModel = (modelName, schema) => {
    const model = mongoose.models?.[modelName] || mongoose.model(modelName, schema);
    return model;
}