import Author from '../../lib/controllers/authors'
import { errorResponse, successResponse } from '../../lib/helper'

export default async function handler(req, res) {
  try {
    const id = req?.query?.id
    switch (req.method) {
      case 'GET':
        const authors = await Author.getAuthors(id)
        successResponse(res, { data: authors })
        break
      case 'POST':
        const newAuthor = await Author.createAuthor(req.body)
        successResponse(res, { data: newAuthor })
        break
      case 'PATCH':
        const updatedAuthor = await Author.updateAuthorById(id, req.body)
        successResponse(res, { data: updatedAuthor })
        break
      case 'DELETE':
        const deletedAuthor = await Author.deleteAuthorById(id)
        successResponse(res, { data: deletedAuthor })
        break
      default:
        errorResponse(res, { message: 'Bad request method' })
        break
    }
  } catch (error) {
    errorResponse(res, { message: error.message || 'Internal server error' })
  }
}


