// models/user.js

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Users || mongoose.model('Users', userSchema)
