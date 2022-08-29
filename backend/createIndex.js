const { Client, Entity, Repository, Schema } = require('redis-om')
const Listing = require('./redis/models/ListingsModel.js')
const Finance = require('./redis/models/FinanceModel.js')
require('dotenv').config()
const client = new Client()


const connect = async () => {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}

const createIndex = async () => {
    await connect()
    const repository = client.fetchRepository(Finance)
    await repository.createIndex()
    // await client.close()
}


createIndex()