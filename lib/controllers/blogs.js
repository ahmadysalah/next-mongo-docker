
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
import { Assets, Authors, Blogs } from '../models';
import { createBlogValidation } from './validation/blogs';

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
        // const author = await Authors.findById(value.author);
        // if (!author) {
        //     const newAuthor = new Authors({ _id: value.author, job: '' });
        //     await newAuthor.save();
        // }

        // // Check if the assets exist, and create them if they don't
        // const assets = await Assets.find({ _id: { $in: value.images } });
        // if (assets.length !== value.images.length) {
        //     const missingAssetIds = value.images.filter((id) =>
        //         !assets.some((asset) => asset._id.toString() === id));

        //     for (const id of missingAssetIds) {
        //         const newAsset = new Assets({ _id: id });
        //         await newAsset.save();
        //     }
        // }

        const blog = new Blogs({
            // title: value.title,
            // content: value.content,
            // author: value.author,
            // images: value.images,
            // seoTitle: value.seoTitle,
            // seoDescription: value.seoDescription,
            ...value,
        });

        await blog.save();
    }


    static async getBlogById(blogId) {
        await this.connect();

        const blog = await Blog.findById(blogId)
            .populate('author', '-_id -__v -createdAt -updatedAt -job')
            .populate('images');

        if (!blog) {
            throw new Error('Blog not found');
        }

        return blog;
    }

    static async getBlogs() {
        await this.connect();

        const blogs = await Blogs.find()
        // .populate('author', '-_id -__v -createdAt -updatedAt -job')
        // .populate('images');

        return blogs;
    }

    static async updateBlogById(blogId, { title, content, author, images, seoTitle, seoDescription }) {
        await this.connect();

        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }

        const authorExists = await Author.findById(author);
        if (!authorExists) {
            throw new Error('Author not found');
        }

        const assetExists = await Asset.find({ _id: { $in: images } });
        if (assetExists.length !== images.length) {
            throw new Error('One or more assets not found');
        }

        blog.title = title;
        blog.content = content;
        blog.author = author;
        blog.images = images;
        blog.seoTitle = seoTitle;
        blog.seoDescription = seoDescription;

        await blog.validate();

        return await blog.save();
    }


    static async deleteBlogById(blogId) {
        await this.connect();

        const blog = await Blog.findById(blogId);
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

        const deletedBlog = await Blog.findById(blogId);
        if (!deletedBlog) {
            throw new Error('Blog not found after deletion');
        }

        return deletedBlog;
    }
}

export default BlogController;

