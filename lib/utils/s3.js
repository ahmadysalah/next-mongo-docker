import { S3 } from 'aws-sdk';

class S3Class {
    constructor() {
        this.s3 = new S3({
            accessKeyId: process.env.S3_UPLOAD_KEY,
            secretAccessKey: process.env.S3_UPLOAD_SECRET,
            region: process.env.S3_UPLOAD_REGION,
        });
    }

    async uploadFileBase64(file) {
        try {
            const fileContent = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            if (!fileContent) throw new Error('No file content');
            const fileName = `${Date.now()}.${file.split(';')[0].split('/')[1]}`;
            const title = fileName.split('.')[0];
            const size = fileContent.length;
            const mimeType = file.split(';')[0].split('/')[1];

            await this.s3
                .putObject({
                    Bucket: process.env.S3_UPLOAD_BUCKET,
                    Key: `client/${fileName}`,
                    Body: fileContent,
                    ContentType: mimeType,
                })
                .promise();
            return {
                title,
                fileName,
                size,
                mimeType,
                url:
                    `https://${process.env.S3_UPLOAD_BUCKET}.s3.eu-west-1.amazonaws.com/test/${fileName}`,
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async uploadFile(req, file) {
        try {
            const isBase64 = typeof file === 'string' && file?.startsWith('data:image');
            if (isBase64) return await this.uploadFileBase64(file);
            // check is it binary file
            const isBinary = file instanceof Buffer;
            const isMultipart = req.headers['content-type'].startsWith('multipart/form-data');
            if (isBinary || isMultipart) throw new Error('API does not support binary files yet');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

const s3 = new S3Class();
export default s3;