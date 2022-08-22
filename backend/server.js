const { Client } = require('redis-om')
const express = require('express')
const finnhub = require('finnhub');
require('dotenv').config()
const { searchListing } = require('./redis/redis.js')

const api_key = finnhub.ApiClient.instance.authentications['api_key']
api_key.apiKey = process.env.FINNHUB_KEY

const redisClient = new Client()
const finnhubClient = new finnhub.DefaultApi()

const app = express()

const connect = async () => {
    if (!redisClient.isOpen()) {
        console.log("CONNECTING")
        await redisClient.open(process.env.REDIS_URL)
    }
}
connect()

app.get('/', (req, res) => res.send("Working"))
app.get('/search/:q', async (req, res) => {
    let q = req.params.q
    res.json(await searchListing(String(q)))
})
app.get('/quote/:ticker', async (req, res) => {
    try {
        await connect()
        const { ticker } = req.params
        const value = await redisClient.get(ticker)
        // IN CACHE =============
        if (value) {
            console.log('CACHE HIT')
            console.log(value)
            res.json(value)
        }
        // NOT IN CACHE SO QUERY API =============
        else {
            console.error('CACHE MISS')
            console.log(ticker)
            finnhubClient.quote(ticker.toUpperCase(), async (error, data, response) => {
                if (error) {
                    console.log(error)
                    throw new Error()
                }
                if (data.c) {
                    console.log('DATA FETCHED', data.c)
                    res.json(data.c)
                    redisClient.set(ticker, data.c)
                    redisClient.expire(ticker, 360)
                }
                else {
                    console.log("INVALID SYMBOL")
                    res.sendStatus(404)
                    // res.json(0)
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        res.send("Error")
    }
})
app.get('/dcquote/:ticker', async (req, res) => {
    const { ticker } = req.params
    finnhubClient.quote(ticker.toUpperCase(), async (error, data, response) => {
        res.json(data.c)
    });
})

app.listen(process.env.PORT || 5000, () => console.log("SERVER UP"))
