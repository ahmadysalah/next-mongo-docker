import { connectToDatabase } from '../connect';
import { convertToObjectId } from '../helper';
import { Pages } from '../models';
import { createPagesSchema, updatePagesSchema } from './validation/pages'

class PagesController {
    static async connect() {
        const db = await connectToDatabase();
        return db;
    }
    static async createPages(body) {
        await this.connect();
        const { error, value } = createPagesSchema(body);
        if (error) throw new Error(error.message);
        const page = await Pages.create(value);
        return page;
    }

    static async getAllPages(pageID) {
        await this.connect();
        if (pageID) {
            return await this.getPagesById(pageID);
        }
        const pages = await Pages.find({})
            .populate('subPages')
            .populate('blogs')
            .populate('authors')
            .populate('parentPage')
            .populate('images')
            .populate('sections')
            .sort({ createdAt: -1 });
        return pages;
    }

    static async getPagesById(pageId) {
        await this.connect();
        const pages = await Pages.findById(convertToObjectId(pageId))
            .populate('subPages')
            .populate('blogs')
            .populate('authors')
            .populate('parentPage')
            .populate('sections')
            .sort({ createdAt: -1 });

        if (!pages) throw new Error('Pages not found');
        return pages;
    }


    static async updatePages(id, body) {
        await this.connect();
        const { error, value } = updatePagesSchema(body);
        if (error) throw new Error(error.message);

        const page = await Pages.findByIdAndUpdate(
            convertToObjectId(id),
            value,
            { new: true }
        );
        if (!page) throw new Error('Pages not found');
        return page;
    }

    static async deletePage(pageId) {
        await this.connect();
        const page = await Pages.findById(convertToObjectId(pageId));
        if (!page) throw new Error('Pages not found');
        page.deleted = true;
        await page.save();
        return page;
    }
}

export default PagesController;

