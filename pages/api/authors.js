import Blogs from '../../lib/controllers/blogs'
import { errorResponse, successResponse } from '../../lib/helper'

export default async function handler(req, res) {
  try {
    const id = req?.query?.id
    switch (req.method) {
      case 'GET':
        const blogs = await Blogs.getBlogs(id)
        successResponse(res, { data: blogs })
        break
      case 'POST':
        const newBlog = await Blogs.createBlog(req.body)
        successResponse(res, { data: newBlog })
      default:
        errorResponse(res, { message: 'Bad request method' })
        break
    }
  } catch (error) {
    errorResponse(res, { message: error.message || 'Internal server error' })
  }
}


