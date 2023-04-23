// pages/api/users.js

import Users from '../../lib/controllers/Users'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body
    const user = await Users.createUser({ name, email })
    res.status(201).json(user)
  } else if (req.method === 'GET') {
    const users = await Users.getUsers()
    res.status(200).json(users)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
