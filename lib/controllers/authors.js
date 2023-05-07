import { connectToDatabase } from '../connect';
import { convertToObjectId } from '../helper';
import { Authors } from '../models';
import { createAuthorsSchema, updateAuthorsSchema } from './validation/authors'

class AuthorsController {
    static async connect() {
        const db = await connectToDatabase();
        return db;
    }
    static async createAuthor(body) {
        await this.connect();
        // Validate the request body using Joi
        const { error, value } = createAuthorsSchema(body);
        if (error) {
            throw new Error(error.message);
        }
        const author = new Authors(value);
        const newAuthor = await author.save();
        return newAuthor;
    }
    static async getAuthorById(authorId) {
        await this.connect();
        const author = await Authors.findById(convertToObjectId(authorId)).populate('profileImage');
        if (!author) {
            throw new Error('Author not found');
        }
        return author;
    }
    static async getAuthors(authorId) {
        await this.connect();
        if (authorId) {
            return this.getAuthorById(authorId);
        }
        const authors = await Authors.find();
        return authors;
    }

    static async updateAuthorById(authorId, body) {
        await this.connect();
        // Validate the request body using Joi
        const { error, value } = updateAuthorsSchema(body);
        if (error) {
            throw new Error(error.message);
        }
        const author = await Authors.findByIdAndUpdate(
            convertToObjectId(authorId),
            value,
            { new: true }
        );
        if (!author) {
            throw new Error('Author not found');
        }
        return author;
    }
    static async deleteAuthorById(authorId) {
        await this.connect();
        const author = await Authors.findByIdAndDelete(convertToObjectId(authorId));
        if (!author) {
            throw new Error('Author not found');
        }
        return author;
    }
}




export default AuthorsController;

