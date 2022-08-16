const { createListing } = require("./redis/redis.js")
const { parse } = require('csv-parse')
const fs = require('fs')

// const data = {
//     symbol: 'APPL',
//     companyName: 'Apple Inc.',
//     securityName: 'Apple Security',
// }
const injectToRedis = (records) => {
    records.map((record) => {
        const [a, b, c] = record.slice(0, 3)
        const data = {
            symbol: a,
            companyName: b,
            securityName: c,
        }
        console.log(data)
        createListing(data)
    })
}
const addData = () => {
    let records = []
    const parser = parse({ columns: false, cast: true })

    parser.on('readable', () => {
        let record
        while ((record = parser.read()) !== null) {
            records.push(record)
        }
    })
    parser.on('end', () => {
        console.log(records.length)
        injectToRedis(records.slice(1, 10))
    })
    // parser.end()
    fs.createReadStream(__dirname + '/redis/nasdaq-listed.csv').pipe(parser)
}

addData()