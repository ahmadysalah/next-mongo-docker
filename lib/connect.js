import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete';
import autoIncrement from 'mongoose-plugin-autoinc'

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}



export async function connectToDatabase() {
    try {


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
    } catch (error) {
        console.log('Error connecting to database')
    }
}


export const createPlugins = (schema, MODEL_NAME, start = 101) => {
    // soft delete
    // schema.plugin(mongooseDelete, {
    //     deletedAt: true,
    //     overrideMethods: true,
    // })
    // auto increment
    // schema.plugin(autoIncrement.initialize(mongoose.connection).plugin, {
    //     model: MODEL_NAME,
    //     field: 'id',
    //     startAt: start,
    // })
}