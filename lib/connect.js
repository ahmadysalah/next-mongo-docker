import mongoose from 'mongoose'
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        cached.promise = mongoose.connect(
            process.env.NEXT_PUBLIC_MONGODB_URI,
            options
        )
    }

    cached.conn = await cached.promise
    return cached.conn
}
