import Assets from '../../lib/controllers/assets'
import { errorResponse, successResponse } from '../../lib/helper'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '28mb',
    }
  }
}

export default async function handler(req, res) {
  console.log('id', req)
  try {
    const id = req?.query?.id || req?.params?.id
    switch (req.method) {
      case 'GET':
        const assets = await Assets.getAssets(id)
        successResponse(res, { data: assets })
        break
      case 'POST':
        const asset = await Assets.createAsset(req)
        successResponse(res, { data: asset })
        break
      case 'PATCH':
        const updatedAssets = await Assets.updateAssetById(id, req.body)
        successResponse(res, { data: updatedAssets })
        break
      case 'DELETE':
        const deletedAssets = await Assets.deleteAssetById(id)
        successResponse(res, { data: deletedAssets })
        break
      default:
        errorResponse(res, { message: 'Bad request method' })
        break
    }
  } catch (error) {
    errorResponse(res, { error, message: error.message || 'Internal server error' })
  }
}


