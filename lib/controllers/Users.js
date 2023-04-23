
import { connectToDatabase } from '../connect'
import Users from '../models/Users'

class UsersController {

    static async connect() {
        const db = await connectToDatabase()
        return db
    }

    static async createUser({ name, email }) {
        await this.connect()
        const result = await Users.create({ name, email })
        return result
    }

    static async getUsers() {
        await this.connect()
        const result = await Users.find()
        return result
    }
}


export default UsersController