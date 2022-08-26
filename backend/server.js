const { Client } = require('redis-om')
const express = require('express')
const finnhub = require('finnhub');
require('dotenv').config()
const { searchListing } = require('./redis/redis.js')
const axios = require('axios');
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
app.get('/search/:query', async (req, res) => {
    let { query } = req.params
    res.json(await searchListing(query))
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
            console.log(typeof value)
            res.json(value)
        }
        // NOT IN CACHE SO QUERY API =============
        else {
            console.error('CACHE MISS',ticker)
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
// app.get('/dcquote/:ticker', async (req, res) => {
//     const { ticker } = req.params
//     finnhubClient.quote(ticker.toUpperCase(), async (error, data, response) => {
//         res.json(data.c)
//     });
// })
app.get('/profile/:symbol', async (req, res) => {
    // NOT IN CACHE SO QUERY API =============
    try {
        await connect()
        const { symbol } = req.params
        const value = await redisClient.get('profile' + symbol)
        // IN CACHE ===============
        if (value) {
            console.log('CACHE HIT')
            res.send(JSON.parse(value))
        }
        // NOT IN CHACHE ===============
        else {
            console.log('CACHE MISSED', symbol)
            await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}/?apikey=${process.env.FMP_KEY}`)
                .then((response) => {
                    if (response.data) {
                        redisClient.set(`profile${symbol}`, JSON.stringify(response.data[0]))
                        redisClient.expire(`profile${symbol}`, 14400)
                        res.send(response.data[0])
                    }
                })
        }


    } catch (e) {
        console.log(e)
    }
})

app.listen(process.env.PORT || 5002, () => console.log("SERVER UP"))
