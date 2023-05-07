import Joi from 'joi';

export const createAssetsSchema = (data) => {
    // Define Joi asset validation schema as file or base64 or form data
    const assetValidationSchema =
        Joi.alternatives().try(
            Joi.object({
                file: Joi.string().regex(/^data:image\/\w+;base64,/),
            }),
            Joi.binary()
        ).required();
    return assetValidationSchema.validate(data);
};



export const updateAssetsSchema = (data) => {
    const assetValidationSchema = Joi.object({
        file: Joi.string().base64().required()
    });
    return assetValidationSchema.validate(data);
}