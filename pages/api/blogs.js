import Blogs from '../../lib/controllers/blogs'
import { errorResponse, successResponse } from '../../lib/helper'

export default async function handler(req, res) {
  console.log('id', req)
  try {
    const id = req?.query?.id || req?.params?.id
    switch (req.method) {
      case 'GET':
        const blogs = await Blogs.getBlogs(id)
        successResponse(res, { data: blogs })
        break
      case 'POST':
        const newBlog = await Blogs.createBlog(req.body)
        successResponse(res, { data: newBlog })
        break
      case 'PATCH':
        const updatedBlog = await Blogs.updateBlogById(id, req.body)
        successResponse(res, { data: updatedBlog })
        break
      case 'DELETE':
        const deletedBlog = await Blogs.deleteBlogById(id)
        successResponse(res, { data: deletedBlog })
        break
      default:
        errorResponse(res, { message: 'Bad request method' })
        break
    }
  } catch (error) {
    errorResponse(res, { error, message: error.message || 'Internal server error' })
  }
}


