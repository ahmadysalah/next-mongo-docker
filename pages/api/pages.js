import Pages from '../../lib/controllers/pages'
import { errorResponse, successResponse } from '../../lib/helper'


export default async function handler(req, res) {
  console.log('id', req)
  try {
    const id = req?.query?.id || req?.params?.id
    switch (req.method) {
      case 'GET':
        const assets = await Pages.getAllPages(id)
        successResponse(res, { data: assets })
        break
      case 'POST':
        const data = await Pages.createPages(req?.body)
        successResponse(res, { data })
        break
      case 'PATCH':
        const updatedPage = await Pages.updatePages(id, req.body)
        successResponse(res, { data: updatedPage })
        break
      case 'DELETE':
        const deletedPage = await Pages.deletePage(id)
        successResponse(res, { data: deletedPage })
        break
      default:
        errorResponse(res, { message: 'Bad request method' })
        break
    }
  } catch (error) {
    errorResponse(res, { error, message: error.message || 'Internal server error' })
  }
}


