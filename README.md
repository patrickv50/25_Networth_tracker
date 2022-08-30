# Net worth Tracker

This project is a mobile app that let users track their networth, assets and liabilites. It was developed with React Native, NodeJS/Exress and Redis. This serves as my submission for the 2022 [Redis Hackathon on DEV.to](https://dev.to/devteam/announcing-the-redis-hackathon-on-dev-3248) under the MERN/MEVN category!

## Overview video 

Here's a short video that explains the project:

[![YoutTube Link](https://github.com/patva0715/25_Networth_tracker/blob/main/demo/vidsc.png)](https://www.youtube.com/watch?v=vyxdC1qK4NE)

## Technologies used
- JavaScript
- React Native
- Express/NodeJS
- Redis

## Features
- Store user's assets & liabilities info locally by default.
- Stock and company profile lookup.
- Autocomplete feature when searching for a company name.
- Net worth projection for a certain month.
- Take a snapshot of a month's finance summary and store to database.

## How it works

### How the data is stored:
```javascript
const { Client } = require('redis-om')
const client = new Client()
const connect = async () => {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}
```
All data model share the same process when storing to the redis db.
The express server connects to the redis database with redis-om as the primary driver.
Each data has its own schema definition.
* Schemas / Data Model:
    * Finance
    * Listing
    * Profile
    * Quote
```javascript
// CREATE A LISTING 
const createListing = async (data) => {
    await connect() //CONNECT TO REDIS DB
    const repository = client.fetchRepository(Listing)
    const listing = await repository.createAndSave(data)
    return listing.entityId
}
```
* Schema Overview:    
    * Finance:{
        date:  date,
        data: string(JSON),
        deviceID: string
    }
    * Listing:{
        symbol: string,
        companyName: string
    }
    * Profile:{
        symbol: string,
        companyName: string,
        price: number
    }
    * Quote:{
        current: number,
        change: number,
        percentChange: number,
        high: number,
        low: number
    }

### How the data is accessed:

Express server connects to the redis server with the use of redis-om.
* Querying for the autocomplete feature:
    * The Listing repository is indexed to allow fast searching.
    * The input parameter from the user is used to select matching entities using redis search.
```javascript
// SEARCH LISTINGS THAT CLOSELY MATCH USER QUERY
const searchListing = async (query) => {
    await connect()
    const repository = client.fetchRepository(Listing)
    const listings = await repository.search()
        .where('symbol').match(query + '*')
        .or('companyName').match(q + '*')
        .returnPage(0, 4);
    return ((listings))
}
```
### Performance Benchmarks
Based of the test I did, querying data from my redis db is 3x faster than the Stocks API that I use. Stock data is maintained on the redis db with a time to live (TTL) of 5 min.

## How to run it locally?

Link to the appstore will be added once published.
* To run locally:
   * Requirements
      - Node
      - Expo cli
```javascript 
cd application
npm install
expo start
```

## More Information about Redis Stack

Here some resources to help you quickly get started using Redis Stack. If you still have questions, feel free to ask them in the [Redis Discord](https://discord.gg/redis) or on [Twitter](https://twitter.com/redisinc).

### Getting Started

1. Sign up for a [free Redis Cloud account using this link](https://redis.info/try-free-dev-to) and use the [Redis Stack database in the cloud](https://developer.redis.com/create/rediscloud).
1. Based on the language/framework you want to use, you will find the following client libraries:
    - [Redis OM .NET (C#)](https://github.com/redis/redis-om-dotnet)
        - Watch this [getting started video](https://www.youtube.com/watch?v=ZHPXKrJCYNA)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-dotnet/)
    - [Redis OM Node (JS)](https://github.com/redis/redis-om-node)
        - Watch this [getting started video](https://www.youtube.com/watch?v=KUfufrwpBkM)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-node/)
    - [Redis OM Python](https://github.com/redis/redis-om-python)
        - Watch this [getting started video](https://www.youtube.com/watch?v=PPT1FElAS84)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-python/)
    - [Redis OM Spring (Java)](https://github.com/redis/redis-om-spring)
        - Watch this [getting started video](https://www.youtube.com/watch?v=YhQX8pHy3hk)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-spring/)

The above videos and guides should be enough to get you started in your desired language/framework. From there you can expand and develop your app. Use the resources below to help guide you further:

1. [Developer Hub](https://redis.info/devhub) - The main developer page for Redis, where you can find information on building using Redis with sample projects, guides, and tutorials.
1. [Redis Stack getting started page](https://redis.io/docs/stack/) - Lists all the Redis Stack features. From there you can find relevant docs and tutorials for all the capabilities of Redis Stack.
1. [Redis Rediscover](https://redis.com/rediscover/) - Provides use-cases for Redis as well as real-world examples and educational material
1. [RedisInsight - Desktop GUI tool](https://redis.info/redisinsight) - Use this to connect to Redis to visually see the data. It also has a CLI inside it that lets you send Redis CLI commands. It also has a profiler so you can see commands that are run on your Redis instance in real-time
1. Youtube Videos
    - [Official Redis Youtube channel](https://redis.info/youtube)
    - [Redis Stack videos](https://www.youtube.com/watch?v=LaiQFZ5bXaM&list=PL83Wfqi-zYZFIQyTMUU6X7rPW2kVV-Ppb) - Help you get started modeling data, using Redis OM, and exploring Redis Stack
    - [Redis Stack Real-Time Stock App](https://www.youtube.com/watch?v=mUNFvyrsl8Q) from Ahmad Bazzi
    - [Build a Fullstack Next.js app](https://www.youtube.com/watch?v=DOIWQddRD5M) with Fireship.io


