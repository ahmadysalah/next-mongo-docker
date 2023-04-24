// pages/api/users.js

import blogs from '../../lib/controllers/blogs'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.status(201).json(user)
  } else if (req.method === 'GET') {
    const allBlogs = await blogs.getBlogs()
    res.status(200).json(allBlogs)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
