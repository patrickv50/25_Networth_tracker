const { Client, Entity, Repository, Schema } = require('redis-om')
const Listing = require('./models/ListingsModel.js')
require('dotenv').config()
const client = new Client()

const connect = async () => {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}

const createListing = async (data) => {
    await connect()
    const repository = client.fetchRepository(Listing)
    const listing = repository.createEntity(data)
    const id = await repository.save(listing)
    // console.log(id)
}

const searchListing = async (q) => {
    await connect()
    const repository = client.fetchRepository(Listing)
    const listings = await repository.search()
        .where('symbol').match(q+'*')
        .or('companyName').match(q+'*')
        .returnAll();
    return((listings))
}

module.exports = { createListing, searchListing }