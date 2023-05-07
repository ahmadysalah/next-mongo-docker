import createDb from "../../lib/createDb";
import { errorResponse, successResponse } from "../../lib/helper";
import * as models from "../../lib/models";


export default async function handler(req, res) {
    const modelsName = Object.keys(models)
    try {
        const result = await createDb();
        successResponse(res, {
            message: 'Models was created successfully',
            data: {
                models: modelsName,
                result
            },
        })
    } catch (error) {
        errorResponse(res, error)
    }
}
