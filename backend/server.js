require('dotenv').config()
const express = require('express')
const finnhub = require('finnhub');
const { searchListing, createProfile, getProfile, getQuote, createQuote, createSummary, getSummaries } = require('./redis/redis.js')
const axios = require('axios');
const api_key = finnhub.ApiClient.instance.authentications['api_key']
api_key.apiKey = process.env.FINNHUB_KEY

const finnhubClient = new finnhub.DefaultApi()

const app = express()
app.use(express.json())


app.get('/', (req, res) => res.send("API WORKING"))
app.get('/search/:query', async (req, res) => {
    let { query } = req.params
    res.json(await searchListing(query))
})
app.get('/quote/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params
        const value = await getQuote(symbol)
        // IN CACHE =============
        if (value) {
            console.log('CACHE HIT')
            console.log(value)
            res.send(value)
        }
        // NOT IN CACHE SO QUERY API =============
        else {
            console.error('CACHE MISS', symbol)
            finnhubClient.quote(symbol.toUpperCase(), async (error, data, response) => {
                if (error) {
                    console.log(error)
                    throw new Error()
                }
                if (data.c) {
                    console.log('DATA FETCHED', data.c)
                    let obj = {
                        symbol,
                        current: data.c,
                        change: data.d,
                        percentChange: data.dp,
                        high: data.h,
                        low: data.l,
                        createdAt: new Date()
                    }
                    await createQuote(obj)
                    res.send(obj)
                }
                else {
                    console.log("INVALID SYMBOL")
                    res.sendStatus(404)
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        res.send("Error")
    }
})

app.get('/profile/:symbol', async (req, res) => {
    // NOT IN CACHE SO QUERY API =============
    try {
        const { symbol } = req.params
        const value = await getProfile(symbol)
        // IN CACHE ===============
        if (value) {
            console.log('CACHE HIT')
            res.send(value)
        }
        // NOT IN CHACHE ===============
        else {
            console.log('CACHE MISSED', symbol)
            await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}/?apikey=${process.env.FMP_KEY}`)
                .then((response) => {
                    if (response.data) {
                        let obj = {
                            symbol: response.data[0].symbol,
                            volAvg: response.data[0].volAvg,
                            mktCap: response.data[0].mktCap,
                            changes: response.data[0].changes,
                            companyName: response.data[0].companyName,
                            description: response.data[0].description,
                            ipoDate: response.data[0].ipoDate,
                            ceo: response.data[0].ceo,
                            city: response.data[0].city,
                            state: response.data[0].state
                        }
                        createProfile(obj)
                        res.send(obj)
                    }
                })
        }
    } catch (e) {
        console.log(e)
    }
})
app.get('/pricehistory/:symbol', async (req, res) => {

})
app.post('/summary', async (req, res) => {
    const body = req.body
    // console.log(body)
    await createSummary(body)
    res.send("OK")
})
app.get('/summary/:id', async (req, res) => {
    // const {id} = req.body
    try {
        const { id } = req.params
        if (!id) res.send(new Error())
        if (id) res.send(await getSummaries(id))
    } catch (e) {
        console.log(e)
    }
})

app.listen(process.env.PORT || 5002, () => console.log("SERVER UP"))
