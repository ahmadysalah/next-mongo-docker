import Joi from 'joi';

export const createBlogValidation = (data) => {
    const blogValidationSchema = Joi.object({
        title: Joi.string().required(),
        subtitle: Joi.string(),
        headlight: Joi.string(),
        author: Joi.string().required(),
        description: Joi.string().required(),
        content: Joi.string(),
        type: Joi.string().default('blog'),
        slug: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        images: Joi.array().items(Joi.string()),
        metaTitle: Joi.string().required(),
        metaDescription: Joi.string().required(),
    });

    return blogValidationSchema.validate(data);
};

export const updateBlogValidationSchema = (data) => {
    const blogValidationSchema =
        Joi.object({
            title: Joi.string(),
            subtitle: Joi.string(),
            headlight: Joi.string(),
            author: Joi.string(),
            description: Joi.string(),
            content: Joi.string(),
            type: Joi.string(),
            slug: Joi.string(),
            tags: Joi.array().items(Joi.string()),
            images: Joi.array().items(Joi.string()),
            metaTitle: Joi.string(),
            metaDescription: Joi.string(),
        });

    return blogValidationSchema.validate(data);
}
