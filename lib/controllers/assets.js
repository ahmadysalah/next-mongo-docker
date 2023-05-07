import { connectToDatabase } from '../connect';
import { convertToObjectId } from '../helper';
import { Assets } from '../models';
import { createAssetsSchema, updateAssetsSchema } from './validation/assets'
import S3 from '../utils/s3'

class AssetsController {
    static async connect() {
        const db = await connectToDatabase();
        return db;
    }

    static async createAsset(req) {
        await this.connect();
        // Validate the request body using Joi
        const { error, value } = createAssetsSchema(req.body);
        if (error || Object.keys(value).length === 0) {
            throw new Error(error?.message || 'Invalid request body');
        }
        const newAsset = await S3.uploadFile(req, value?.file || value);
        const asset = await Assets.create(newAsset);
        return asset
    }

    static async getAssetById(assetId) {
        await this.connect();
        const asset = await Assets.findById(convertToObjectId(assetId))
        if (!asset) {
            throw new Error('Asset not found');
        }
        return asset;
    }

    static async getAssets(assetId) {
        if (assetId) {
            return this.getAssetById(assetId);
        }
        await this.connect();
        const assets = await Assets.find()
        return assets;
    }

    static async updateAssetById(assetId, body) {
        // Validate the request body using Joi
        const { error, value } = updateAssetsSchema(body);
        if (error) {
            throw new Error(error.message);
        }
        await this.connect();

        const asset = await Assets.findByIdAndUpdate(
            convertToObjectId(assetId),
            { ...value },
            { new: true }
        );
        return asset;
    }

    static async deleteAssetById(assetId) {
        await this.connect();
        const asset = await Assets.findById(convertToObjectId(assetId));
        if (!asset) {
            throw new Error('Asset not found');
        }
        asset.deleted = true;
        await asset.save();
        return asset;
    }
}

export default AssetsController;

