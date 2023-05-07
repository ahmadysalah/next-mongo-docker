
/**
 * Create a new blog post with the given data
 * @param {Object} data - The data for the new blog post
 * @param {string} data.title - The title of the blog post
 * @param {string} data.content - The content of the blog post
 * @param {string} data.author - The ID of the author of the blog post
 * @param {string[]} data.images - The IDs of the images associated with the blog post
 * @param {string} data.seoTitle - The SEO title of the blog post
 * @param {string} data.seoDescription - The SEO description of the blog post
 * @returns {Promise<Object>} - The new blog post object
 */


import { connectToDatabase } from '../connect';
import { convertToObjectId } from '../helper';
import { Assets, Authors, Blogs } from '../models';
import { createBlogValidation, updateBlogValidationSchema } from './validation/blogs'

class BlogController {
    static async connect() {
        const db = await connectToDatabase();
        return db;
    }

    static async createBlog(body) {
        await this.connect();
        // Validate the request body using Joi
        const { error, value } = createBlogValidation(body);
        if (error) {
            throw new Error(error.message);
        }
        // // Check if the author exists, and create it if it doesn't
        const author = await Authors.findById(convertToObjectId(convertToObjectId(value.author)));
        if (!author) {
            const [name, job] = value.author.split(',');
            const newAuthor = new Authors({ name, job, });
            await newAuthor.save();
        }

        const assets = await Assets.find({ url: { $in: value.images } });
        // const images = []
        // if (assets.length !== value.images.length) {
        //     const missingAssetIds = value.images.filter((id) =>
        //         !assets.some((asset) => asset._id.toString() === id));
        //     for (const file of missingAssetIds) {
        //         const newAsset = new Assets({
        //             title: file,
        //             fileName: file,
        //             url: file,
        //         });
        //         const { _id } = await newAsset.save();
        //         images.push(_id);
        //     }
        // }

        const blog = await new Blogs({
            author: value?.author,
            images: assets,
            ...value,
        });
        const newBlog = await blog.save();
        return newBlog;
    }

    static async getBlogById(blogId) {
        await this.connect();
        const blog = await Blogs.findById(blogId)
            .populate('author')
            .populate('images');
        if (!blog) {
            throw new Error('Blog not found');
        }
        return blog;
    }

    static async getBlogs(id) {
        await this.connect();
        if (id) {
            return await this.getBlogById(convertToObjectId(id));
        }
        const blogs = await Blogs.find()
            .populate('author')
            .populate('images');
        return blogs;
    }

    static async updateBlogById(blogId, body) {
        await this.connect();
        const { error, value } = updateBlogValidationSchema(body);
        if (error) {
            throw new Error(error.message);
        }
        const { author, images } = value;

        const blog = await Blogs.findById(convertToObjectId(blogId));
        if (!blog) {
            throw new Error('Blog not found');
        }
        const authorExists = await Authors.findById(author);
        if (!authorExists) {
            throw new Error('Author not found');
        }
        const assetExists = await Assets.find({ _id: { $in: images } });
        if (assetExists.length !== images.length) {
            throw new Error('One or more assets not found');
        }

        Object.keys(value).forEach((key) => {
            blog[key] = value[key];
        });

        await blog.validate();

        return await blog.save();
    }


    static async deleteBlogById(blogId) {
        await this.connect();

        const blog = await Blogs.findById(convertToObjectId(blogId));
        if (!blog) {
            throw new Error('Blog not found');
        }

        if (blog.deleted) {
            throw new Error('Blog already deleted');
        }

        blog.deleted = true;

        const result = await blog.save();
        if (!result) {
            throw new Error('Blog not deleted successfully');
        }

        return result;
    }
}

export default BlogController;

