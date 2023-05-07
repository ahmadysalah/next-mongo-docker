import Joi from 'joi';

export const createPagesSchema = (data) => {
    const assetValidationSchema = Joi.object({
        name: Joi.string().required(),
        title: Joi.string(),
        subtitle: Joi.string(),
        highlight: Joi.string(),
        description: Joi.string(),
        content: Joi.string(),
        type: Joi.string(),
        slug: Joi.string(),
        tags: Joi.array().items(Joi.string()),
        images: Joi.string(),
        metaTitle: Joi.string(),
        metaDescription: Joi.string(),
        published: Joi.boolean(),
        createdBy: Joi.string(),
        hasSubPage: Joi.boolean(),
        subPages: Joi.array().items(Joi.string()),
        parentPage: Joi.string(),
        hasSection: Joi.boolean(),
        sections: Joi.array().items(Joi.string()),
        hasBlog: Joi.boolean(),
        blogs: Joi.array().items(Joi.string()),
        hasAuthor: Joi.boolean(),
    });
    return assetValidationSchema.validate(data);
};

export const updatePagesSchema = (data) => {
    const assetValidationSchema = Joi.object({
        name: Joi.string(),
        title: Joi.string(),
        subtitle: Joi.string(),
        highlight: Joi.string(),
        description: Joi.string(),
        content: Joi.string(),
        type: Joi.string(),
        slug: Joi.string(),
        tags: Joi.array().items(Joi.string()),
        images: Joi.string(),
        metaTitle: Joi.string(),
        metaDescription: Joi.string(),
        published: Joi.boolean(),
        createdBy: Joi.string(),
        hasSubPage: Joi.boolean(),
        subPages: Joi.array().items(Joi.string()),
        parentPage: Joi.string(),
        hasSection: Joi.boolean(),
        sections: Joi.array().items(Joi.string()),
        hasBlog: Joi.boolean(),
        blogs: Joi.array().items(Joi.string()),
        hasAuthor: Joi.boolean(),
    });
    return assetValidationSchema.validate(data);
}


