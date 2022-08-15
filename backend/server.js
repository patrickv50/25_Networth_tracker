const express = require('express')
const redis = require('redis')
const finnhub = require('finnhub');

const PORT = process.env.PORT || 5000
const REDIS_PORT = process.env.PORT || 6379

const client = redis.createClient(REDIS_PORT)
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cbss4fiad3i9sd7nj8d0" // Replace this
const finnhubClient = new finnhub.DefaultApi()
const app = express()


// // Cache middleare
// const cache = async (req, res, next) => {
//     await client.connect()
//     const { ticker } = req.params
//     const data = await client.get(ticker.toUpperCase(), (er, data) => {
//         console.log(data.c)
//     })
//     console.log(data)
// }

app.get('/quote/:ticker', async (req, res) => {
    try {
        await client.connect()
        const { ticker } = req.params

        const value = await client.get(ticker.toUpperCase())
        if (value) {
            console.log('CACHE HIT')
            console.log(value)
            res.send(`<h1>${value}</h1>`)
            await client.disconnect()
        }
        else {
            console.error('CACHE MISS')
            finnhubClient.quote(ticker.toUpperCase(), async (error, data, response) => {
                console.log(data.c)
                await client.set(ticker.toUpperCase(), data.c)
                res.send(`<h1>${data.c}</h1>`)
                await client.disconnect()
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500)
        res.send("Error")
    }
})




app.listen(5001, () => console.log("SERVER UP"))
