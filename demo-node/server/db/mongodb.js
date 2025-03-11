const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'nodejsDemo';

let db = null;

async function connect() {
    try {
        const client = await MongoClient.connect(url);
        db = client.db(dbName);
        console.log('成功连接到 MongoDB');
        return db;
    } catch (error) {
        console.error('MongoDB 连接错误:', error);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error('数据库未连接，请先调用 connect()');
    }
    return db;
}

module.exports = {
    connect,
    getDb
};