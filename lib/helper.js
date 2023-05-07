import mongoose from "mongoose";

export const createModel = (modelName, schema) => {
    const model = mongoose.models?.[modelName] || mongoose.model(modelName, schema);
    return model;
}

export const successResponse = (res, { data, message, statusCode }) => {
    res.status(statusCode || 200).json({
        message: message || 'Your request was successful',
        data,
    });
}

export const errorResponse = (res, { error, statusCode, message }) => {
    res.status(statusCode || 400).json(
        {
            message: message || 'An error occurred',
            error
        });
}

export const convertToObjectId = (value) => {
    if (!Array.isArray(value)) {
        return convertToObjectId([value])[0];
    }

    return value.map((id) => {
        try {
            return new mongoose.Types.ObjectId(id);
        } catch (error) {
            return new mongoose.Types.ObjectId('000000000000000000000000');
        }
    })
}
