const Quote = require('./models/QuoteModel.js')
const { Client, Entity, Repository, Schema } = require('redis-om')
const Listing = require('./models/ListingsModel.js')
const Profile = require('./models/ProfileModel.js')
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
        .where('symbol').match(q + '*')
        .or('companyName').match(q + '*')
        .returnPage(0,4);
    return ((listings))
}

const createProfile = async (data) => {
    await connect()
    const repository = client.fetchRepository(Profile)
    const profile = repository.createEntity(data)
    profile.entityId=data.symbol
    const id = await repository.save(profile)
    await repository.expire(id, 360)
}
const getProfile = async (symbol) => {
    await connect()
    const repository = client.fetchRepository(Profile)
    const profile = await repository.fetch(symbol)
    // console.log(profile.toJSON())
    let json = profile.toJSON()
    if (json.ceo) return json
    else return null

}
const createQuote = async (data) => {
    await connect()
    const repository = client.fetchRepository(Quote)
    const quote = repository.createEntity(data)
    quote.entityId=data.symbol
    const id = await repository.save(quote)
    await repository.expire(id, 360)
}
const getQuote = async (symbol) => {
    await connect()
    const repository = client.fetchRepository(Quote)
    const quote = await repository.fetch(symbol)
    let json = quote.toJSON()
    if (json.current) return json
    else return null

}
module.exports = { createListing, searchListing, createProfile, getProfile, createQuote, getQuote }