import Joi from 'joi';

export const createAuthorsSchema = (data) => {
    const authorValidationSchema = Joi.object({
        name: Joi.string().required(),
        job: Joi.string().required(),
        bio: Joi.string(),
        profileImage: Joi.string(),
        published: Joi.boolean(),
        contacts: Joi.array().items(
            {
                type: Joi.string(),
                link: Joi.string(),
            }
        ),
    });

    return authorValidationSchema.validate(data);
};

export const updateAuthorsSchema = (data) => {
    const authorValidationSchema = Joi.object({
        name: Joi.string(),
        job: Joi.string(),
        bio: Joi.string(),
        profileImage: Joi.string(),
        published: Joi.boolean(),
        contacts: Joi.array().items(
            {
                type: Joi.string(),
                link: Joi.string(),
            }
        ),
    });

    return authorValidationSchema.validate(data);
}

