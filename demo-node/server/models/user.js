const { getDb } = require('../db/mongodb');
const { ObjectId } = require('mongodb');

class User {
    static async create(userData) {
        const db = getDb();
        const result = await db.collection('users').insertOne(userData);
        return result;
    }

    static async findByName(name) {
        const db = getDb();
        return await db.collection('users').findOne({ name });
    }

    static async getAll() {
        const db = getDb();
        return await db.collection('users').find().toArray();
    }

    static async findById(id) {
        const db = getDb();
        return await db.collection('users').findOne({ _id: new ObjectId(id) });
    }

    static async update(id, userData) {
        const db = getDb();
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: userData }
        );
        return result;
    }

    static async delete(id) {
        const db = getDb();
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
        return result;
    }
}

module.exports = User;